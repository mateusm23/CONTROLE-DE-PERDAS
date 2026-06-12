# Relatório de Auditoria — Concreto Usinado · BE Bonifácio (OBRBO)
**Trinus Capital · Engenharia de Custos & BI · Rev. 00 · Base Jun/2026**

---

## 1. Visão Geral do Projeto

Relatório de auditoria em HTML puro (sem frameworks) focado na análise de concreto usinado da obra BE Bonifácio (OBRBO). O projeto é modular — cada bloco é um arquivo `.html` independente carregado dinamicamente no `index.html` via `fetch()`.

**Requer VS Code Live Server** para funcionar (fetch não opera em `file://`).

---

## 2. Estrutura de Arquivos

```
RELATORIO CONCRETO v1/
├── index.html              ← loader: injeta A + B + C em sequência
├── CONTEXTO.md             ← este arquivo
├── css/
│   └── main.css            ← design system global (variáveis, .blk, .card, .tbl)
├── js/
│   └── data.js             ← dados: orcData, cronogramaData, ganttMeses
├── Predio/
│   └── BE BONIFACIO.png    ← foto da obra (usada na capa)
└── modules/
    ├── bloco-a.html        ← Capa + Planejamento (Gantt + tabela orçamento)
    ├── bloco-b.html        ← Evolução física de concretagem por pavimento
    └── bloco-c.html        ← Análise financeira de concreto (módulo principal)
```

---

## 3. Paleta de Cores

Derivada da identidade Trinus Capital:

| Token CSS | Hex | Uso |
|---|---|---|
| `--navy` | `#1b2a4a` | textos, cabeçalhos, barras |
| `--green` | variável | badges positivos |
| `--amber` | variável | badges parciais |
| `--red` | variável | badges de desvio |
| Steel Blue | `#277EBD` | cor primária Trinus, bordas de destaque |
| Slate Grey | `#868F97` | cor secundária Trinus |

**Grupos de colunas da tabela (bloco-c):**

| Grupo | Título (grp) | Sub-header (sub) |
|---|---|---|
| Medição Física | `#0e3d5e` | `#124e78` |
| Apropriado | `#2a3138` | `#363e46` |
| Análise de Desvio | `#0a2a40` | `#0f3858` |
| Tendência | `#18242c` | `#223038` |

---

## 4. Módulo A — Capa + Planejamento

### Capa
- Layout split: painel esquerdo escuro (`#0d1f35`) + foto do prédio à direita
- Contém: branding Trinus, título "Concreto Usinado", metadados da obra, 3 badges de KPI
- Badges da capa: **Orçado R$2.088.000** (azul) · **Apropriado R$634.069** (âmbar) · **Tendência R$2.404.053** (vermelho)

### Tabela de Orçamento
- Fonte: `orcData` em `data.js`
- Mostra composição do BAC por insumo (concreto usinado, bombeamento, etc.)
- Total: **R$2.088.000**

### Gantt de Concretagem
- Período: Out/2025 – Fev/2027
- Fonte: `cronogramaData` + `ganttMeses` em `data.js`
- Colunas: Local · Peso · Ini.Plan · Fim.Plan · Ini.Atual · Fim.Atual · Δ Fim
- Barras: Planejado (navy) / Realizado (verde) / Tendência (âmbar) / Reprogramado (âmbar sólido)

---

## 5. Módulo B — Evolução Física

- Orçamento de referência: **R$2.088.000** (apenas concreto)
- 4 KPI cards gerados por JS: Meta Planejada / Avanço Concluído / Avanço Parcial / Desvio Físico
- Tabela por pavimento: status pill (Concluído / Avanço Parcial / Não Iniciado) + % exec + valores proporcionais
- Pavimentos com avanço parcial configurados em `pctExecMap`: Mezanino 55% · 02 PAV 40%
- Pendências por pavimento configuradas em `obsMap`

---

## 6. Módulo C — Análise Financeira (Principal)

### KPI Cards (5 cards com padrão kc-strip/kc-card)

| Card | Valor Principal | Sub-indicadores |
|---|---|---|
| Total Orçado | R$ 2.088.000 | Qtd 2.400m³ · Vlr.Unt. R$870/m³ |
| Total Medido Físico | 26,4% | Qtd 633m³ · Valor Agregado R$550.710 |
| Total Apropriado | R$ 634.069 (âmbar) | Qtd 684m³ · % do Orçado 30,4% |
| Índices de Desvio | +15,1% (vermelho) | Perda Qtd +8,1% · Desvio Vlr.Unt. +6,6% |
| Tendência de Custos | R$ 2.404.053 (vermelho) | Vlr.Unit.Atual R$927/m³ · Δ R$ do Orçado +R$316.053 |

### Memorial de Cálculo (botão toggle)
- EAC = Valor Apropriado ÷ % Físico Medido = R$634.069 ÷ 26,4% = **R$2.404.053**
- Perda Qtd = (684 − 633) ÷ 633 = **+8,1%**
- Desvio Vlr.Unt. = (R$927 − R$870) ÷ R$870 = **+6,6%**
- Desvio Total = (Apropriado − Medido Físico) ÷ Medido Físico = **+15,1%**

### Tabela por Pavimento (15 colunas)

Estrutura de cabeçalho em 2 linhas com grupos coloridos:

```
Pavimento | ── Medição Física (4) ── | ── Apropriado (3) ── | ── Análise de Desvio (4) ── | ── Tendência (3) ──
           % Exec. | Qtd Prev. | Vlr.Unt. | Valor | Qtd | Vlr.Unt. | Valor | ΔQtd% | ΔVlr.Unt.% | ΔR$ | Δ% | Vlr.Unt. | Qtd Tend. | Valor
```

**Lógica de Tendência por pavimento:**
- Vlr. Unt. = último custo unitário real apurado para aquele pavimento
- Qtd Tend. = Qtd Prevista × (1 + 8,1%) — aplica o índice global de perda ao quantitativo restante
- Valor Tend. = Vlr. Unt. × Qtd Tend.

**Regras visuais:**
- `% Exec.`: badge verde para 100%, badge âmbar para parcial, vazio para não iniciado
- Colunas Δ: badges vermelhos para desvios positivos (piora)
- Linhas `.row-ni` (não iniciados): células de Apropriado e Análise vazias, cor de texto normal
- Separadores de grupo: `td.grp-end` (borda direita) · `td.grp-tend-start` (borda esquerda da Tendência)

**22 pavimentos:**

| Grupo | Pavimentos | Qtd Prev. (m³) | Qtd Tend. (m³) | Vlr. Tend. |
|---|---|---|---|---|
| Embasamento | SUB02 | 180 | 198 | R$184.536 |
| Embasamento | SUB01 | 172 | 183 | R$166.347 |
| Embasamento | 01 PAV | 158 | 175 | R$164.850 |
| Embasamento | Mezanino (55%) | 125 | 135 | R$125.280 |
| Embasamento | 02 PAV (40%) | 135 | 146 | R$134.320 |
| Torre | 03–12 PAV | 104 cada | 112 cada | R$103.824 cada |
| Torre | 13–16 PAV | 97 cada | 105 cada | R$97.335 cada |
| Coroamento | 17–19 PAV | 119 cada | 129 cada | R$119.583 cada |

**Totais no tfoot:**
- Qtd Prevista: 2.400 m³ · Valor Previsto: R$2.088.000
- Qtd Tendência: 2.764 m³ · Valor Tendência: **R$2.561.662**

---

## 7. Padrões de Componentes CSS

### Badge
```html
<span class="bdg bdg-g">100%</span>   <!-- verde -->
<span class="bdg bdg-a">55%</span>    <!-- âmbar -->
<span class="bdg bdg-r">+8,1%</span>  <!-- vermelho -->
```

### KPI Card
```html
<div class="kc-card">
  <div class="kc-lbl">Rótulo</div>
  <div class="kc-main [red|amber|green]">Valor Principal</div>
  <div class="kc-row">
    <div class="kc-item">
      <div class="kc-item-lbl">Sub-rótulo</div>
      <div class="kc-item-val [red|amber|green]">Sub-valor</div>
    </div>
  </div>
</div>
```

### Bloco padrão
```html
<div class="blk">
  <div class="blk-head">
    <span class="blk-num">C</span>
    <span class="blk-title">Título</span>
    <span class="blk-sub">Subtítulo</span>
  </div>
  <div class="card">
    <div class="card-head">...</div>
    <table class="tbl">...</table>
  </div>
</div>
```

---

## 8. Variáveis de Dados (data.js)

- `orcData[]` — itens de orçamento: `{ grupo, un, qtd, rUnit, rTotal, pct, w }`
- `cronogramaData[]` — pavimentos: `{ n, grupo, peso, plan_s, plan_e, real_s, real_e, reprog_s, reprog_e }`
- `ganttMeses[]` — meses do Gantt: `{ label, ano, date }`

---

## 9. Próximos Passos / Backlog

- [ ] **FCK múltiplos**: se FCK varia por pavimento → adicionar coluna FCK na tabela C e ajustar Vlr.Unt. Orçado por linha; se múltiplos FCK no mesmo pavimento → sub-linhas por FCK dentro de cada pavimento
- [ ] **Dados reais**: substituir os valores fictícios de `data.js` pelos dados reais da obra
- [ ] **Projeto completo (AUDITORIA - ESTRUTURA CONCRETO)**: escalonar para Aço, Forma, Escoramento, MO e Diversos com módulos D–H, cada um mapeando suas peculiaridades antes de codificar
- [ ] **Aço**: mapear fluxo estoque comprado vs. aplicado vs. previsto antes de construir o módulo
- [ ] **MO**: mapear rescisões, tipos de contrato e índice de produtividade antes de construir
