-- =============================================================================
-- Migração: senha com hash (bcrypt) + login/cadastro via RPC segura
--
-- Problema corrigido: login.html e cadastro.html liam/gravavam a coluna
-- usuarios.senha em texto puro, direto do browser, via SELECT/INSERT na
-- tabela. Qualquer pessoa com a chave publishable (visível no HTML) podia
-- em tese ler a tabela usuarios inteira (usuário + senha de todo mundo)
-- via API REST do Supabase.
--
-- Solução: as senhas passam a ser guardadas com hash bcrypt (pgcrypto).
-- O login e o cadastro deixam de acessar a tabela usuarios diretamente e
-- passam a chamar funções RPC (SECURITY DEFINER), que fazem a comparação
-- de hash no próprio Postgres e devolvem só os campos seguros (id, nome,
-- perfil) — nunca a senha ou o hash.
--
-- Rode este script inteiro uma única vez no SQL Editor do seu projeto
-- Supabase (Dashboard → SQL Editor → New query → colar → Run).
-- =============================================================================

-- 1) Extensão necessária para hash bcrypt
create extension if not exists pgcrypto;

-- 2) Hash das senhas já existentes (idempotente: não re-hasheia quem já é bcrypt)
update public.usuarios
set senha = crypt(senha, gen_salt('bf'))
where senha !~ '^\$2[aby]\$';

-- 3) Bloqueia acesso direto à tabela usuarios pela chave pública (anon/authenticated).
--    IMPORTANTE: se já existirem policies antigas nesta tabela permitindo
--    SELECT/INSERT direto (ex.: "Enable read access for all users"), vá em
--    Dashboard → Authentication → Policies → tabela "usuarios" e REMOVA
--    essas policies manualmente — não sei os nomes exatos daqui.
alter table public.usuarios enable row level security;

-- 4) Função de login: compara o hash no servidor e devolve só id/nome/perfil
create or replace function public.fn_login(p_nome text, p_senha text)
returns table (
  id     usuarios.id%type,
  nome   usuarios.nome%type,
  perfil usuarios.perfil%type
)
language sql
security definer
set search_path = public
as $$
  select id, nome, perfil
  from usuarios
  where nome = p_nome
    and senha = crypt(p_senha, senha)
  limit 1;
$$;

revoke all on function public.fn_login(text, text) from public;
grant execute on function public.fn_login(text, text) to anon, authenticated;

-- 5) Função de cadastro: hasheia a senha no servidor e força perfil = 'usuario'
--    (impede que alguém chame a API mandando perfil="master" no payload)
create or replace function public.fn_signup(p_nome text, p_senha text)
returns table (
  id   usuarios.id%type,
  nome usuarios.nome%type
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    insert into usuarios (nome, senha, perfil)
    values (p_nome, crypt(p_senha, gen_salt('bf')), 'usuario')
    returning usuarios.id, usuarios.nome;
end;
$$;

revoke all on function public.fn_signup(text, text) from public;
grant execute on function public.fn_signup(text, text) to anon, authenticated;

-- =============================================================================
-- Depois de rodar este script, teste no app: criar um usuário novo em
-- cadastro.html e fazer login em login.html. Se dois usuários tentarem
-- cadastrar o mesmo "nome", o Postgres continua barrando pela mesma
-- constraint unique de sempre (erro 23505), então a mensagem de "nome já
-- em uso" no cadastro.html continua funcionando sem mudança.
-- =============================================================================
