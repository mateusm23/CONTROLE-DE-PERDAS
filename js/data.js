// ── data.js — Fonte única de dados para todos os módulos ──
// Todos os arrays são globais (carregados no <head> do index.html antes dos módulos)

// BLOCO A — Orçamento Inicial
var orcData = [
  {grupo:'Concreto Usinado', un:'m³',    qtd:'2.400',    rUnit:'R$ 435,00',    rTotal:'R$ 1.044.000', pct:'29,9%', w:30},
  {grupo:'Aço / Armação',    un:'kg',    qtd:'200.000',  rUnit:'R$ 6,10',      rTotal:'R$ 1.220.000', pct:'35,0%', w:35},
  {grupo:'Forma',            un:'m²',    qtd:'9.100',    rUnit:'R$ 58,00',     rTotal:'R$ 527.800',   pct:'15,1%', w:15},
  {grupo:'Escoramento',      un:'un/mês',qtd:'17.280',   rUnit:'R$ 25,00',     rTotal:'R$ 432.000',   pct:'12,4%', w:12},
  {grupo:'MO + Encargos',    un:'vb',    qtd:'12',       rUnit:'R$ 17.750,00', rTotal:'R$ 213.000',   pct:'6,1%',  w:6},
  {grupo:'Diversos',         un:'vb',    qtd:'1',        rUnit:'R$ 50.000,00', rTotal:'R$ 50.000',    pct:'1,4%',  w:1},
];

// BLOCO B — Pavimentos (mapa visual)
var pavData = [
  {n:1,  s:'exec',   pct:100, paid:false, pend:'—'},
  {n:2,  s:'exec',   pct:100, paid:false, pend:'—'},
  {n:3,  s:'partial',pct:80,  paid:false, pend:'Laje cremalheira'},
  {n:4,  s:'future', pct:0,   paid:true,  pend:'—'},
  {n:5,  s:'future', pct:0,   paid:false, pend:'—'},
  {n:6,  s:'future', pct:0,   paid:false, pend:'—'},
  {n:7,  s:'future', pct:0,   paid:false, pend:'—'},
  {n:8,  s:'future', pct:0,   paid:false, pend:'—'},
  {n:9,  s:'future', pct:0,   paid:false, pend:'—'},
  {n:10, s:'future', pct:0,   paid:false, pend:'—'},
  {n:11, s:'future', pct:0,   paid:false, pend:'—'},
  {n:12, s:'future', pct:0,   paid:false, pend:'—'},
];

// BLOCO B — Tabela detalhamento por pavimento
var tblBData = [
  {n:'PAV 01',   s:'exec',   pct:'100%', pend:'—',                   prev:'R$ 290.567', pago:'R$ 310.000', apagar:'R$ 59.000',  total:'R$ 369.000', devR:'+R$ 78.433',  devP:'+27,0%', cls:'bad'},
  {n:'PAV 02',   s:'exec',   pct:'100%', pend:'—',                   prev:'R$ 290.567', pago:'R$ 356.000', apagar:'R$ 0',       total:'R$ 356.000', devR:'+R$ 65.433',  devP:'+22,5%', cls:'bad'},
  {n:'PAV 03',   s:'partial',pct:'80%',  pend:'Laje cremalheira',    prev:'R$ 232.454', pago:'R$ 290.000', apagar:'R$ 91.000',  total:'R$ 381.000', devR:'+R$ 148.546', devP:'+63,9%', cls:'bad'},
  {n:'PAV 04 ⚠',s:'future', pct:'—',    pend:'Sem exec. confirmada',prev:'—',          pago:'R$ 771.000', apagar:'—',          total:'R$ 771.000', devR:'Sem base',    devP:'Inválido',cls:'bad', alert:true},
];

// BLOCO D — Gráfico A (proporcional ao físico)
var chartAData = [
  {nome:'Concreto Usinado', prev:32, pago:49, ap:18, devPct:'+214%', cls:'red'},
  {nome:'Aço / Armação',    prev:28, pago:25, ap:3,  devPct:'+3,6%', cls:'amber'},
  {nome:'Forma',            prev:25, pago:15, ap:22, devPct:'+95%',  cls:'red'},
  {nome:'Escoramento',      prev:25, pago:45, ap:0,  devPct:'+80%',  cls:'red'},
  {nome:'MO + Encargos',    prev:23, pago:17, ap:5,  devPct:'+77%',  cls:'red'},
  {nome:'Diversos',         prev:25, pago:32, ap:0,  devPct:'+28%',  cls:'amber'},
];

// BLOCO D — Gráfico B (consumo global do orçamento)
var chartBData = [
  {nome:'Concreto Usinado', orc:100, prop:23, pago:54, ap:24, cls:'red'},
  {nome:'Aço / Armação',    orc:100, prop:23, pago:28, ap:0,  cls:'green'},
  {nome:'Forma',            orc:100, prop:23, pago:24, ap:25, cls:'amber'},
  {nome:'Escoramento',      orc:100, prop:23, pago:45, ap:0,  cls:'amber'},
  {nome:'MO + Encargos',    orc:100, prop:23, pago:32, ap:2,  cls:'amber'},
  {nome:'Diversos',         orc:100, prop:23, pago:32, ap:0,  cls:'green'},
];

// BLOCO E — Alertas automáticos
var alertasData = [
  {level:'red',   title:'🔴 PAV 04 — Pago/Provisionado sem Confirmação Física',        desc:'R$ 771.000 apropriados no UAU sem medição física validada. 1 pavimento de diferença entre físico (3) e financeiro (4). Exige confirmação junto ao engenheiro de campo.'},
  {level:'red',   title:'🔴 Concreto — R$/m³ real acima do contrato (+7,1% · NF-001247)', desc:'R$932/m³ real vs. R$870 contratado. Desvio unitário > 5% = Crítico. Verificar adicionais, rejeite e fck entregue.'},
  {level:'red',   title:'🔴 Concreto — R$/m³ acima do contrato (+8,3% · NF-001512)',   desc:'R$942/m³ real vs. R$870 contratado. Tendência crescente de alta entre pavimentos. Acionar concreteira para renegociação.'},
  {level:'red',   title:'🔴 Escoramento — R$/un acima do contrato (+8,7% · LOC-2024-11)',desc:'R$27,17/un vs. R$25,00 contratado. Desvio > 5% = Crítico. Verificar cláusula de reajuste e aplicação de multa contratual.'},
  {level:'red',   title:'🔴 Escoramento — R$/un acima do contrato (+8,0% · LOC-2025-02)',desc:'R$27,00/un vs. R$25,00 contratado. Desvio > 5% = Crítico. Reincidência no segundo contrato — avaliar troca de fornecedor.'},
  {level:'amber', title:'🟡 Concreto — R$/m³ em zona de atenção (+4,5% · NF-001391)',  desc:'R$909/m³ real vs. R$870 contratado. Desvio entre 0% e 5% = Atenção. Monitorar próximas entregas.'},
  {level:'amber', title:'🟡 Forma — R$/m² acima do previsto (+3,4% acumulado)',         desc:'Madefort (+3,4%) e G3 Madeiras (+3,4%) ambos acima do contrato. Desvio entre 0% e 5% = Atenção. Avaliar reaproveitamento de painéis.'},
  {level:'green', title:'🟢 Aço / Armação — Economia sobre o contrato (–2,5%)',         desc:'R$5,95/kg real vs. R$6,10 contratado. Todos os fornecedores dentro do contrato. Manter monitoramento para fixar preço nos pavimentos restantes.'},
];

// BLOCO F — Custo consolidado por pavimento
var tblFData = [
  {n:'PAV 01',   s:'exec',   pct:'100%', prev:'R$ 290.567', pago:'R$ 310.000', ap:'R$ 59.000',  tot:'R$ 369.000', dR:'+R$ 78.433',  dP:'+27,0%', cls:'bad'},
  {n:'PAV 02',   s:'exec',   pct:'100%', prev:'R$ 290.567', pago:'R$ 356.000', ap:'R$ 0',       tot:'R$ 356.000', dR:'+R$ 65.433',  dP:'+22,5%', cls:'bad'},
  {n:'PAV 03',   s:'partial',pct:'80%',  prev:'R$ 232.454', pago:'R$ 290.000', ap:'R$ 91.000',  tot:'R$ 381.000', dR:'+R$ 148.546', dP:'+63,9%', cls:'bad'},
  {n:'PAV 04 ⚠',s:'future', pct:'—',    prev:'—',          pago:'R$ 771.000', ap:'—',          tot:'R$ 771.000', dR:'Sem base',    dP:'Inválido',cls:'bad', alert:true},
];

// BLOCO A — Cronograma Físico (Gantt)
// Escala: Out/2025 → Fev/2027 (17 meses)
var ganttMeses = (function() {
  var nomes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var seq = [
    {m:9,a:2025},{m:10,a:2025},{m:11,a:2025},
    {m:0,a:2026},{m:1,a:2026},{m:2,a:2026},{m:3,a:2026},
    {m:4,a:2026},{m:5,a:2026},{m:6,a:2026},{m:7,a:2026},
    {m:8,a:2026},{m:9,a:2026},{m:10,a:2026},{m:11,a:2026},
    {m:0,a:2027},{m:1,a:2027}
  ];
  return seq.map(function(s, i) {
    return { label: nomes[s.m], ano: s.a, idx: i + 1, date: new Date(s.a, s.m, 1) };
  });
})();

// Campos: plan_s/plan_e = planejado · real_s/real_e = realizado · reprog_s/reprog_e = reprogramado
// Pesos placeholder (Embasamento 30% · Torre 55% · Coroamento 15%) — corrigir com valores reais
var cronogramaData = [
  // ── EMBASAMENTO (30%) ──
  {n:'EMBASAMENTO - SUB02',    grupo:'Embasamento', peso: 7.0,
   plan_s:'03/10/2025', plan_e:'21/11/2025',
   real_s:'03/10/2025', real_e:'21/11/2025', reprog_s:null, reprog_e:null},
  {n:'EMBASAMENTO - SUB01',    grupo:'Embasamento', peso: 7.0,
   plan_s:'28/11/2025', plan_e:'09/02/2026',
   real_s:'28/11/2025', real_e:'20/02/2026', reprog_s:null, reprog_e:null},
  {n:'EMBASAMENTO - 01 PAV',   grupo:'Embasamento', peso: 6.0,
   plan_s:'09/01/2026', plan_e:'24/02/2026',
   real_s:'09/01/2026', real_e:'29/05/2026', reprog_s:null, reprog_e:null},
  {n:'EMBASAMENTO - MEZANINO', grupo:'Embasamento', peso: 5.0,
   plan_s:'09/01/2026', plan_e:'04/03/2026',
   real_s:'04/05/2026', real_e:null,          reprog_s:null, reprog_e:'30/06/2026'},
  {n:'EMBASAMENTO - 02 PAV',   grupo:'Embasamento', peso: 5.0,
   plan_s:'19/01/2026', plan_e:'16/03/2026',
   real_s:'11/05/2026', real_e:null,          reprog_s:null, reprog_e:'14/07/2026'},
  // ── TORRE (55%: 03→12 = 4% · 13→16 = 3,75%) ──
  {n:'TORRE - 03 PAV', grupo:'Torre', peso:4.0,
   plan_s:'26/01/2026', plan_e:'05/02/2026',
   real_s:null, real_e:null, reprog_s:'15/07/2026', reprog_e:'27/07/2026'},
  {n:'TORRE - 04 PAV', grupo:'Torre', peso:4.0,
   plan_s:'05/02/2026', plan_e:'18/02/2026',
   real_s:null, real_e:null, reprog_s:'28/07/2026', reprog_e:'07/08/2026'},
  {n:'TORRE - 05 PAV', grupo:'Torre', peso:4.0,
   plan_s:'18/02/2026', plan_e:'02/03/2026',
   real_s:null, real_e:null, reprog_s:'10/08/2026', reprog_e:'19/08/2026'},
  {n:'TORRE - 06 PAV', grupo:'Torre', peso:4.0,
   plan_s:'02/03/2026', plan_e:'12/03/2026',
   real_s:null, real_e:null, reprog_s:'20/08/2026', reprog_e:'31/08/2026'},
  {n:'TORRE - 07 PAV', grupo:'Torre', peso:4.0,
   plan_s:'12/03/2026', plan_e:'24/03/2026',
   real_s:null, real_e:null, reprog_s:'31/08/2026', reprog_e:'14/09/2026'},
  {n:'TORRE - 08 PAV', grupo:'Torre', peso:4.0,
   plan_s:'25/03/2026', plan_e:'07/04/2026',
   real_s:null, real_e:null, reprog_s:'14/09/2026', reprog_e:'25/09/2026'},
  {n:'TORRE - 09 PAV', grupo:'Torre', peso:4.0,
   plan_s:'08/04/2026', plan_e:'20/04/2026',
   real_s:null, real_e:null, reprog_s:'25/09/2026', reprog_e:'08/10/2026'},
  {n:'TORRE - 10 PAV', grupo:'Torre', peso:4.0,
   plan_s:'22/04/2026', plan_e:'04/05/2026',
   real_s:null, real_e:null, reprog_s:'09/10/2026', reprog_e:'21/10/2026'},
  {n:'TORRE - 11 PAV', grupo:'Torre', peso:4.0,
   plan_s:'05/05/2026', plan_e:'14/05/2026',
   real_s:null, real_e:null, reprog_s:'22/10/2026', reprog_e:'03/11/2026'},
  {n:'TORRE - 12 PAV', grupo:'Torre', peso:4.0,
   plan_s:'15/05/2026', plan_e:'26/05/2026',
   real_s:null, real_e:null, reprog_s:'04/11/2026', reprog_e:'13/11/2026'},
  {n:'TORRE - 13 PAV', grupo:'Torre', peso:3.75,
   plan_s:'27/05/2026', plan_e:'08/06/2026',
   real_s:null, real_e:null, reprog_s:'16/11/2026', reprog_e:'26/11/2026'},
  {n:'TORRE - 14 PAV', grupo:'Torre', peso:3.75,
   plan_s:'09/06/2026', plan_e:'18/06/2026',
   real_s:null, real_e:null, reprog_s:'27/11/2026', reprog_e:'08/12/2026'},
  {n:'TORRE - 15 PAV', grupo:'Torre', peso:3.75,
   plan_s:'19/06/2026', plan_e:'30/06/2026',
   real_s:null, real_e:null, reprog_s:'09/12/2026', reprog_e:'18/12/2026'},
  {n:'TORRE - 16 PAV', grupo:'Torre', peso:3.75,
   plan_s:'01/07/2026', plan_e:'10/07/2026',
   real_s:null, real_e:null, reprog_s:'21/12/2026', reprog_e:'08/01/2027'},
  // ── COROAMENTO (15%: 5% cada) ──
  {n:'COROAMENTO - 17 PAV', grupo:'Coroamento', peso:5.0,
   plan_s:'13/07/2026', plan_e:'22/07/2026',
   real_s:null, real_e:null, reprog_s:'11/01/2027', reprog_e:'20/01/2027'},
  {n:'COROAMENTO - 18 PAV', grupo:'Coroamento', peso:5.0,
   plan_s:'23/07/2026', plan_e:'03/08/2026',
   real_s:null, real_e:null, reprog_s:'21/01/2027', reprog_e:'01/02/2027'},
  {n:'COROAMENTO - 19 PAV', grupo:'Coroamento', peso:5.0,
   plan_s:'04/08/2026', plan_e:'13/08/2026',
   real_s:null, real_e:null, reprog_s:'02/02/2027', reprog_e:'11/02/2027'},
];

// BLOCO G — EAC por grupo
var eacData = [
  {grupo:'Concreto Usinado', bac:'R$ 1.044.000', aprop:'R$ 560.000', pct:'23,3%', eac:'R$ 2.403.433', varR:'+R$ 1.359.433', varP:'+130,2%', cls:'bad',  tend:'Estouro'},
  {grupo:'Aço / Armação',    bac:'R$ 1.220.000', aprop:'R$ 338.400', pct:'23,3%', eac:'R$ 1.453.219', varR:'+R$ 233.219',   varP:'+19,1%',  cls:'bad',  tend:'Estouro'},
  {grupo:'Forma',            bac:'R$ 527.800',   aprop:'R$ 258.000', pct:'23,3%', eac:'R$ 1.108.155', varR:'+R$ 580.355',   varP:'+109,9%', cls:'bad',  tend:'Estouro'},
  {grupo:'Escoramento',      bac:'R$ 432.000',   aprop:'R$ 195.000', pct:'23,3%', eac:'R$ 837.768',   varR:'+R$ 405.768',   varP:'+93,9%',  cls:'bad',  tend:'Estouro'},
  {grupo:'MO + Encargos',    bac:'R$ 213.000',   aprop:'R$ 86.800',  pct:'23,3%', eac:'R$ 373.047',   varR:'+R$ 160.047',   varP:'+75,1%',  cls:'bad',  tend:'Atenção'},
  {grupo:'Diversos',         bac:'R$ 50.000',    aprop:'R$ 16.000',  pct:'23,3%', eac:'R$ 68.755',    varR:'+R$ 18.755',    varP:'+37,5%',  cls:'warn', tend:'Atenção'},
];
