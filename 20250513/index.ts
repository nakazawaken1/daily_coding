import dice from "../dice";
const counts = new Map<number, number>();
for (let i = 0; i < 1000000; i++) {
  const result = dice();
  counts.set(result, (counts.get(result) ?? 0) + 1);
}
console.log("Counts:");
for (const [key, value] of [...counts.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`${key}: ${value}`);
}
console.log(`Max: ${Math.max(...counts.values())}`);
console.log(`Min: ${Math.min(...counts.values())}`);
const average = [...counts.values()].reduce((a, b) => a + b, 0) / counts.size;
const variance = [...counts.values()].reduce((a, b) => a + (b - average) ** 2, 0) / counts.size;
console.log(`Variance: ${variance}`);
console.log(`Standard Deviation: ${Math.sqrt(variance)}`);

import { jStat } from 'jstat';

const observed = [...counts.values()];
const n         = observed.reduce((a, b) => a + b, 0);
const expected  = Array(observed.length).fill(n / observed.length);

// χ² 統計量
const chi2 = observed.reduce(
  (sum, o, i) => sum + (o - expected[i]) ** 2 / expected[i],
  0
);

// 自由度
const df = observed.length - 1;

// p 値（右側確率）
const pValue = 1 - jStat.chisquare.cdf(chi2, df);

// 5 % 片側検定の臨界値
const alpha     = 0.01;
const critical  = jStat.chisquare.inv(1 - alpha, df);

console.log(`chi²=${chi2.toFixed(2)}  df=${df}`);
console.log(`p   =${pValue.toFixed(3)}`);
console.log(`critical value (α=${alpha}) = ${critical.toFixed(3)}`);
console.log(pValue < alpha ? "→ 有意に偏りあり" : "→ 偏りなし");
