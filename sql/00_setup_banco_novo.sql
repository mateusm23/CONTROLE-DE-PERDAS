-- =============================================================================
-- SETUP DO ZERO — Portal de Auditoria de Concreto
--
-- Recria toda a estrutura do banco (tabelas, permissões, login seguro e o
-- espaço de fotos) num projeto Supabase NOVO.
--
-- COMO USAR:
--   1. Vá em Dashboard do Supabase → seu projeto novo → SQL Editor → New query
--   2. Cole este arquivo INTEIRO
--   3. Antes de rodar, troque 'SEU_NOME' e 'SUA_SENHA' lá no final do arquivo
--      pelo usuário/senha que você quer usar pra entrar no sistema
--   4. Clique em Run
-- =============================================================================

create extension if not exists pgcrypto;

-- ── usuarios (quem pode entrar no sistema) ─────────────────────────────────
create table public.usuarios (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null unique,
  senha      text not null,
  perfil     text,
  created_at timestamptz not null default now()
);

-- ── obras (cada canteiro de obra cadastrado) ───────────────────────────────
create table public.obras (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  codigo      text,
  status      text default 'ativo',
  localizacao text,
  responsavel text,
  construtora text,
  data_inicio text,
  foto_url    text,
  created_at  timestamptz not null default now()
);

-- ── acessos (qual usuário pode ver qual obra) ──────────────────────────────
create table public.acessos (
  id         uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  obra_id    uuid not null references public.obras(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (usuario_id, obra_id)
);

-- ── orcamento (BAC / orçamento previsto por obra) ──────────────────────────
create table public.orcamento (
  id          uuid primary key default gen_random_uuid(),
  obra_id     uuid not null references public.obras(id) on delete cascade,
  descricao   text default '',
  unidade     text default 'm³',
  qtd_orc     numeric default 0,
  rs_unitario numeric default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

-- ── visao_fisica (avanço físico por elemento/pavimento) ────────────────────
create table public.visao_fisica (
  id               uuid primary key default gen_random_uuid(),
  obra_id          uuid not null references public.obras(id) on delete cascade,
  elemento         text default '',
  fase             text default '',
  data_concretagem date,
  vol_previsto     numeric default 0,
  vol_realizado    numeric default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz
);

-- ── apropriacao (notas fiscais / custo real lançado) ───────────────────────
create table public.apropriacao (
  id          uuid primary key default gen_random_uuid(),
  obra_id     uuid not null references public.obras(id) on delete cascade,
  data_nf     text default '',
  numero_nf   text default '',
  fornecedor  text default '',
  descricao   text default '',
  volume      numeric default 0,
  rs_unitario numeric default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

-- Libera o app pra ler/gravar essas tabelas pela chave pública, igual antes
grant all on public.obras, public.acessos, public.orcamento, public.visao_fisica, public.apropriacao
  to anon, authenticated;

-- ── usuarios: tranca o acesso direto (senha não fica mais exposta) ────────
alter table public.usuarios enable row level security;

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

-- ── espaço de fotos das obras (capa da obra) ───────────────────────────────
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

create policy "fotos: leitura publica" on storage.objects
  for select using (bucket_id = 'fotos');
create policy "fotos: upload publico" on storage.objects
  for insert with check (bucket_id = 'fotos');
create policy "fotos: update publico" on storage.objects
  for update using (bucket_id = 'fotos');

-- =============================================================================
-- ÚLTIMO PASSO: cria seu usuário master (o que pode cadastrar obras e liberar
-- acesso pra outras pessoas). TROQUE 'SEU_NOME' e 'SUA_SENHA' abaixo antes
-- de rodar o script.
-- =============================================================================
select fn_signup('SEU_NOME', 'SUA_SENHA');
update public.usuarios set perfil = 'master' where nome = 'SEU_NOME';
