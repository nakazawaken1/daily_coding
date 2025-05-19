export default (items: string[], rarelities: number[]) => {
  const total = rarelities.reduce((a, i) => a + i, 0);
  const random = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < rarelities.length; i++) {
    sum += rarelities[i];
    if (random < sum) {
      return items[i];
    }
  }
  return items[0]
}