// 重複ありで複数から一つを取り出す
import sample from '../sample';
const janken = ['グー', 'チョキ', 'パー'];
const omikuji = ['大吉', '中吉', '小吉', '凶'];
const atarikuji = ['あたり', 'はずれ'];
const kuji = ['特等', '1等', '2等', '3等', '4等', '5等'];

const times = (n: number, items: any[]) => [...Array(n)].map(() => sample(items));

console.log(times(3, janken));
console.log(times(3, omikuji));
console.log(times(3, atarikuji));
console.log(times(3, kuji));