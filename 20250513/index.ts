import dice from "./dice";
const counts = new Map<number, number>();
for (let i = 0; i < 1000000; i++) {
  const result = dice();
  counts.set(result, (counts.get(result) ?? 0) + 1);
}
console.log("Counts:");
for (const [key, value] of [...counts.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`${key}: ${value}`);
}

