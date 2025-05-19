//重みつきくじ

import gacha from "../gacha";

const items = ['UR', 'SR', 'R', 'N']
const rarelities = [0.01, 0.05, 0.1, 0.84]
const times = (n: number) => console.log([...Array(n)].map(_ => gacha(items, rarelities)).reduce<Record<string, number>>((a, i) => ((a[i] = (a[i] ?? 0) + 1), a), {}))
console.log(times(10));
console.log(times(100));
console.log(times(1000));
console.log(times(10000));
