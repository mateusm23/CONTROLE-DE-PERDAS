const ExcelJS = require('exceljs');

const NAVY = 'FF1B2A4A';
const BLUE = 'FF277EBD';
const LIGHT = 'FFF1F5F9';
const WHITE = 'FFFFFFFF';
const GREENBG = 'FFDCFCE7';

const wb = new ExcelJS.Workbook();
wb.creator = 'Trinus Capital · Engenharia de Custos & BI';
wb.created = new Date();

function styleTitle(ws, range, text) {
  ws.mergeCells(range);
  const cell = ws.getCell(range.split(':')[0]);
  cell.value = text;
  cell.font = { name: 'Calibri', size: 13, bold: true, color: { argb: WHITE } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  ws.getRow(cell.row).height = 26;
}

function styleInstr(ws, range, text) {
  ws.mergeCells(range);
  const cell = ws.getCell(range.split(':')[0]);
  cell.value = text;
  cell.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF64748B' } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
  cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  ws.getRow(cell.row).height = 18;
}

function styleHeaderRow(ws, rowNum, cols) {
  const row = ws.getRow(rowNum);
  row.height = 20;
  cols.forEach((label, i) => {
    const cell = row.getCell(i + 1);
    cell.value = label;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: WHITE } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FF1D6CA6' } } };
  });
}

function styleTotalRow(ws, rowNum, lastCol) {
  const row = ws.getRow(rowNum);
  row.height = 18;
  for (let c = 1; c <= lastCol; c++) {
    const cell = row.getCell(c);
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: NAVY } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
    cell.border = { top: { style: 'medium', color: { argb: NAVY } } };
  }
}

function dataBorder(ws, rFrom, rTo, cFrom, cTo) {
  for (let r = rFrom; r <= rTo; r++) {
    for (let c = cFrom; c <= cTo; c++) {
      ws.getCell(r, c).border = { bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } } };
    }
  }
}

const BRL = '#,##0.00';
const NUM = '#,##0.00';
const PCT = '0.0%';
const SAMPLE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };

// Dados de exemplo (obra fictícia — mesma base usada nos testes anteriores)
const SAMPLE_ORC = [
  ['CONCRETO USINADO FCK 30MPA - SUBSOLO 02', 'm³', 180, 870],
  ['CONCRETO USINADO FCK 30MPA - SUBSOLO 01', 'm³', 172, 870],
  ['CONCRETO USINADO FCK 30MPA - TERREO', 'm³', 165, 870],
  ['CONCRETO USINADO FCK 30MPA - MEZANINO', 'm³', 125, 870],
  ['CONCRETO USINADO FCK 30MPA - PAV 02', 'm³', 158, 870],
  ['CONCRETO USINADO FCK 30MPA - PAV 03', 'm³', 158, 870],
  ['CONCRETO USINADO FCK 30MPA - PAV 04', 'm³', 158, 870],
  ['CONCRETO USINADO FCK 30MPA - PAV 05', 'm³', 158, 870],
  ['CONCRETO USINADO FCK 30MPA - PAV 06', 'm³', 158, 870],
  ['CONCRETO USINADO FCK 30MPA - COBERTURA', 'm³', 119, 870],
];
const SAMPLE_FIS = [
  ['Estrutura de Concreto', 'SUBSOLO 02', new Date(2026, 4, 20), 180, 180],
  ['Estrutura de Concreto', 'SUBSOLO 01', new Date(2026, 6, 10), 172, 130],
  ['Estrutura de Concreto', 'TERREO', null, 165, 0],
  ['Estrutura de Concreto', 'MEZANINO', null, 125, 0],
  ['Estrutura de Concreto', 'PAV 02', null, 158, 0],
  ['Estrutura de Concreto', 'PAV 03', null, 158, 0],
  ['Estrutura de Concreto', 'PAV 04', null, 158, 0],
  ['Estrutura de Concreto', 'PAV 05', null, 158, 0],
  ['Estrutura de Concreto', 'PAV 06', null, 158, 0],
  ['Estrutura de Concreto', 'COBERTURA', null, 119, 0],
];
const SAMPLE_APR = [
  [new Date(2026, 4, 15), '45231', 'Concrelix Concreto Usinado', 'Concreto Usinado FCK 30MPa bombeado - Subsolo 02', 150, 925],
  [new Date(2026, 5, 2), '45389', 'Concrelix Concreto Usinado', 'Concreto Usinado FCK 30MPa bombeado - Subsolo 01', 120, 930],
  [new Date(2026, 5, 20), '12087', 'Supermix Concreto', 'Concreto Usinado FCK 25MPa bombeado - Subsolo 01', 100, 935],
  [new Date(2026, 6, 10), '12144', 'Supermix Concreto', 'Concreto Usinado FCK 25MPa bombeado - Terreo', 65, 940],
];

// ABA: ORÇAMENTO
const wsOrc = wb.addWorksheet('Orçamento', { views: [{ state: 'frozen', ySplit: 3 }] });
wsOrc.columns = [{ width: 46 }, { width: 12 }, { width: 16 }, { width: 18 }, { width: 18 }];
styleTitle(wsOrc, 'A1:E1', 'ORÇAMENTO — Composição de Custo Previsto');
styleInstr(wsOrc, 'A2:E2', 'Linhas em amarelo = exemplo (obra fictícia), apague e substitua pelos dados reais. Preencha uma linha por item/serviço orçado — "Valor Total" calcula sozinho.');
styleHeaderRow(wsOrc, 3, ['Descrição / Especificação', 'Unidade', 'Quantidade (m³)', 'Valor Unitário (R$)', 'Valor Total (R$)']);

const ORC_FIRST = 4, ORC_LAST = 53, ORC_TOTAL = 54;
for (let r = ORC_FIRST; r <= ORC_LAST; r++) {
  const sample = SAMPLE_ORC[r - ORC_FIRST];
  if (sample) {
    wsOrc.getCell(r, 1).value = sample[0];
    wsOrc.getCell(r, 2).value = sample[1];
    wsOrc.getCell(r, 3).value = sample[2];
    wsOrc.getCell(r, 4).value = sample[3];
    for (let c = 1; c <= 4; c++) wsOrc.getCell(r, c).fill = SAMPLE_FILL;
  }
  wsOrc.getCell(r, 3).numFmt = NUM;
  wsOrc.getCell(r, 4).numFmt = BRL;
  wsOrc.getCell(r, 5).value = { formula: 'IF(AND(C' + r + '="",D' + r + '=""),"",C' + r + '*D' + r + ')' };
  wsOrc.getCell(r, 5).numFmt = BRL;
}
dataBorder(wsOrc, ORC_FIRST, ORC_LAST, 1, 5);
wsOrc.getCell(ORC_TOTAL, 1).value = 'TOTAL';
wsOrc.getCell(ORC_TOTAL, 3).value = { formula: 'SUM(C' + ORC_FIRST + ':C' + ORC_LAST + ')' };
wsOrc.getCell(ORC_TOTAL, 3).numFmt = NUM;
wsOrc.getCell(ORC_TOTAL, 5).value = { formula: 'SUM(E' + ORC_FIRST + ':E' + ORC_LAST + ')' };
wsOrc.getCell(ORC_TOTAL, 5).numFmt = BRL;
styleTotalRow(wsOrc, ORC_TOTAL, 5);

// ABA: VISÃO FÍSICA
const wsFis = wb.addWorksheet('Visão Física', { views: [{ state: 'frozen', ySplit: 3 }] });
wsFis.columns = [{ width: 26 }, { width: 20 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 12 }];
styleTitle(wsFis, 'A1:F1', 'VISÃO FÍSICA — Evolução por Pavimento / Elemento');
styleInstr(wsFis, 'A2:F2', 'Linhas em amarelo = exemplo (obra fictícia), apague e substitua pelos dados reais. Preencha uma linha por elemento/pavimento — "% Execução" calcula sozinha.');
styleHeaderRow(wsFis, 3, ['Elemento', 'Pavimento / Fase', 'Data Concretagem', 'Vol. Previsto (m³)', 'Vol. Realizado (m³)', '% Execução']);

const FIS_FIRST = 4, FIS_LAST = 53, FIS_TOTAL = 54;
for (let r = FIS_FIRST; r <= FIS_LAST; r++) {
  const sample = SAMPLE_FIS[r - FIS_FIRST];
  if (sample) {
    wsFis.getCell(r, 1).value = sample[0];
    wsFis.getCell(r, 2).value = sample[1];
    if (sample[2]) wsFis.getCell(r, 3).value = sample[2];
    wsFis.getCell(r, 4).value = sample[3];
    wsFis.getCell(r, 5).value = sample[4];
    for (let c = 1; c <= 5; c++) wsFis.getCell(r, c).fill = SAMPLE_FILL;
  }
  wsFis.getCell(r, 3).numFmt = 'dd/mm/yyyy';
  wsFis.getCell(r, 4).numFmt = NUM;
  wsFis.getCell(r, 5).numFmt = NUM;
  wsFis.getCell(r, 6).value = { formula: 'IF(D' + r + '="","",IFERROR(E' + r + '/D' + r + ',""))' };
  wsFis.getCell(r, 6).numFmt = PCT;
}
dataBorder(wsFis, FIS_FIRST, FIS_LAST, 1, 6);
wsFis.getCell(FIS_TOTAL, 1).value = 'TOTAL';
wsFis.getCell(FIS_TOTAL, 4).value = { formula: 'SUM(D' + FIS_FIRST + ':D' + FIS_LAST + ')' };
wsFis.getCell(FIS_TOTAL, 4).numFmt = NUM;
wsFis.getCell(FIS_TOTAL, 5).value = { formula: 'SUM(E' + FIS_FIRST + ':E' + FIS_LAST + ')' };
wsFis.getCell(FIS_TOTAL, 5).numFmt = NUM;
wsFis.getCell(FIS_TOTAL, 6).value = { formula: 'IFERROR(E' + FIS_TOTAL + '/D' + FIS_TOTAL + ',"")' };
wsFis.getCell(FIS_TOTAL, 6).numFmt = PCT;
styleTotalRow(wsFis, FIS_TOTAL, 6);

// ABA: APROPRIAÇÃO
const wsApr = wb.addWorksheet('Apropriação', { views: [{ state: 'frozen', ySplit: 3 }] });
wsApr.columns = [{ width: 13 }, { width: 12 }, { width: 24 }, { width: 30 }, { width: 14 }, { width: 12 }, { width: 16 }];
styleTitle(wsApr, 'A1:G1', 'APROPRIAÇÃO — Notas Fiscais Lançadas');
styleInstr(wsApr, 'A2:G2', 'Linhas em amarelo = exemplo (obra fictícia), apague e substitua pelos dados reais. Preencha uma linha por nota fiscal — "Valor Total" calcula sozinho.');
styleHeaderRow(wsApr, 3, ['Data NF', 'Nº NF', 'Fornecedor', 'Descrição / FCK', 'Volume (m³)', 'R$ / m³', 'Valor Total (R$)']);

const APR_FIRST = 4, APR_LAST = 63, APR_TOTAL = 64;
for (let r = APR_FIRST; r <= APR_LAST; r++) {
  const sample = SAMPLE_APR[r - APR_FIRST];
  if (sample) {
    wsApr.getCell(r, 1).value = sample[0];
    wsApr.getCell(r, 2).value = sample[1];
    wsApr.getCell(r, 3).value = sample[2];
    wsApr.getCell(r, 4).value = sample[3];
    wsApr.getCell(r, 5).value = sample[4];
    wsApr.getCell(r, 6).value = sample[5];
    for (let c = 1; c <= 6; c++) wsApr.getCell(r, c).fill = SAMPLE_FILL;
  }
  wsApr.getCell(r, 1).numFmt = 'dd/mm/yyyy';
  wsApr.getCell(r, 5).numFmt = NUM;
  wsApr.getCell(r, 6).numFmt = BRL;
  wsApr.getCell(r, 7).value = { formula: 'IF(AND(E' + r + '="",F' + r + '=""),"",E' + r + '*F' + r + ')' };
  wsApr.getCell(r, 7).numFmt = BRL;
}
dataBorder(wsApr, APR_FIRST, APR_LAST, 1, 7);
wsApr.getCell(APR_TOTAL, 1).value = 'TOTAL';
wsApr.getCell(APR_TOTAL, 5).value = { formula: 'SUM(E' + APR_FIRST + ':E' + APR_LAST + ')' };
wsApr.getCell(APR_TOTAL, 5).numFmt = NUM;
wsApr.getCell(APR_TOTAL, 7).value = { formula: 'SUM(G' + APR_FIRST + ':G' + APR_LAST + ')' };
wsApr.getCell(APR_TOTAL, 7).numFmt = BRL;
styleTotalRow(wsApr, APR_TOTAL, 7);

// ABA: RESULTADOS
const wsRes = wb.addWorksheet('Resultados', { views: [{ state: 'frozen', ySplit: 1 }] });
wsRes.columns = [{ width: 44 }, { width: 20 }, { width: 55 }];
styleTitle(wsRes, 'A1:C1', 'RESULTADOS — Perda de Concreto & Projeção de Custo');
wsRes.getRow(1).height = 30;

let r = 3;
function secTitle(text) {
  wsRes.mergeCells('A' + r + ':C' + r);
  const c = wsRes.getCell('A' + r);
  c.value = text;
  c.font = { bold: true, size: 10, color: { argb: NAVY } };
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
  c.alignment = { indent: 1 };
  r++;
}
function inputLine(label, formula, fmt) {
  wsRes.getCell(r, 1).value = label;
  wsRes.getCell(r, 1).font = { size: 10 };
  const c = wsRes.getCell(r, 2);
  c.value = { formula: formula };
  c.numFmt = fmt;
  c.font = { size: 10 };
  c.alignment = { horizontal: 'right' };
  r++;
}
function resultLine(label, formula, fmt, note) {
  wsRes.getCell(r, 1).value = label;
  wsRes.getCell(r, 1).font = { bold: true, size: 11, color: { argb: NAVY } };
  const c = wsRes.getCell(r, 2);
  c.value = { formula: formula };
  c.numFmt = fmt;
  c.font = { bold: true, size: 12, color: { argb: BLUE } };
  c.alignment = { horizontal: 'right' };
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREENBG } };
  if (note) {
    wsRes.getCell(r, 3).value = note;
    wsRes.getCell(r, 3).font = { size: 9, italic: true, color: { argb: 'FF64748B' } };
    wsRes.getCell(r, 3).alignment = { wrapText: true };
  }
  wsRes.getRow(r).height = 18;
  r++;
}

secTitle('1. TOTAIS (puxados automaticamente das abas Orçamento, Visão Física e Apropriação)');
const rowQO = r; inputLine('Qtd Orçada (m³)', "'Orçamento'!C" + ORC_TOTAL, NUM);
const rowVO = r; inputLine('Valor Orçado (R$)', "'Orçamento'!E" + ORC_TOTAL, BRL);
const rowQM = r; inputLine('Qtd Medida em obra (m³)', "'Visão Física'!E" + FIS_TOTAL, NUM);
const rowQA = r; inputLine('Qtd Apropriada — notas fiscais (m³)', "'Apropriação'!E" + APR_TOTAL, NUM);
const rowVA = r; inputLine('Valor Apropriado — notas fiscais (R$)', "'Apropriação'!G" + APR_TOTAL, BRL);
r++;

secTitle('2. CÁLCULOS INTERMEDIÁRIOS');
const QO = 'B' + rowQO, VO = 'B' + rowVO, QM = 'B' + rowQM, QA = 'B' + rowQA, VA = 'B' + rowVA;
const rowVUO = r; inputLine('Vlr. Unitário Orçado (R$/m³)', 'IFERROR(' + VO + '/' + QO + ',"")', BRL);
const rowVUA = r; inputLine('Vlr. Unitário Apropriado (R$/m³)', 'IFERROR(' + VA + '/' + QA + ',"")', BRL);
const rowPFIS = r; inputLine('% Físico Medido (Qtd Medida ÷ Qtd Orçada)', 'IFERROR(' + QM + '/' + QO + ',"")', PCT);
r++;

const VUO = 'B' + rowVUO, VUA = 'B' + rowVUA, PFIS = 'B' + rowPFIS;

secTitle('3. RESULTADO');
resultLine('Perda de Quantidade (%)', 'IFERROR((' + QA + '-' + QM + ')/' + QM + ',"")', PCT,
  'Quanto a mais (ou a menos) de concreto foi apropriado em relação ao que foi efetivamente medido em obra.');
resultLine('Desvio de Preço (%)', 'IFERROR((' + VUA + '-' + VUO + ')/' + VUO + ',"")', PCT,
  'Quanto o preço médio pago (R$/m³) ficou acima ou abaixo do orçado.');
resultLine('Desvio de Custo Total (%)', 'IFERROR((' + VA + '-(' + QM + '*' + VUO + '))/(' + QM + '*' + VUO + '),"")', PCT,
  'Combina os dois efeitos acima: quanto a mais foi gasto do que deveria custar o que já está pronto.');
const rowEAC = r;
resultLine('Projeção de Custo Final — EAC (R$)', 'IFERROR(' + VA + '/' + PFIS + ',"")', BRL,
  'Se o ritmo de gasto atual continuar, é essa a estimativa de custo final da obra inteira.');
const EAC = 'B' + rowEAC;
resultLine('Δ R$ vs Orçado', 'IFERROR(' + EAC + '-' + VO + ',"")', BRL,
  'Diferença entre a projeção de custo final e o valor orçado.');

wb.xlsx.writeFile('perda-de-concreto-modelo.xlsx').then(function () {
  console.log('gerado com sucesso');
});
