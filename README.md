# try-flatten

✈ 类型安全的扁平化的 try-catch，支持同步函数、回调函数和 PromiseLike

[![code-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml)
[![dependency-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/948a21cc839b431490dd8b8bf22628c3)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/948a21cc839b431490dd8b8bf22628c3)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
[![npm](https://img.shields.io/npm/v/try-flatten)](https://npmjs.com/package/try-flatten)
[![release](https://img.shields.io/github/v/release/FrontEndDev-org/try-flatten)](https://github.com/FrontEndDev-org/try-flatten/releases)

# 为什么需要这个

## try-catch 块级作用域带来的问题

先看一段代码：

```ts
const somePromise = Promise.resolve({ prop: 'value' });

try {
  // 块级作用域内赋值
  // res类型推断为 {prop: string}
  const res = await somePromise;
  // 类型安全地使用 res
  console.log(res.prop); // 'value'
} catch (err) {
  // 此处 err 类型为 unknown
  console.log(err);
}
```

但有些时候，我们需要将变量的声明提升到块级作用域外，比如：

```ts
const somePromise = Promise.resolve({ prop: 'value' });

// 需要先在 try-catch 块级作用域外定义变量，此处还需要先声明类型
// 由于只提升了声明，但没有提升赋值，需要捕捉期望的返回值类型，并联合 undefined
type Result = typeof somePromise extends Promise<infer T> ? T : never;
let res: Result | undefined;

try {
  // 块级作用域内赋值
  res = await somePromise;
  // 块级作用域内类型仍然安全
  console.log(res.prop); // 'value'
} catch (err) {
  // 此处 err 类型为 unknown
  console.log(err);
}

// 其他操作...

// try-catch 块级作用域外使用该变量
// 此处 res 类型包含 undefined，类型使用不安全
console.log(res.prop); // TS18048: 'res' is possibly 'undefined'.
// 所以还要加有值判断
if (res) {
  console.log(res.prop);
}
```

可以看到，由于块级作用域的特性，导致 res 的类型被”污染“了， 使用 try-flatten 后，你将可以用一种“扁平化”的方式调用 try-catch, 不用为了类型安全写一些冗余代码。

## 用上 `try-flatten` 后

```ts
const [err, res] = await tryFlatten(somePromise);

// 只需要判断 err 是否存在即可
if (err) {
  // 此处 err 类型为 Error，res 类型为 undefined
  console.log(err instanceof Error); // true
  console.log(res === undefined); // true
  return;
}

// 此处 err 类型为 null，res 类型为 Result
console.log(err === null); // true
console.log(res.prop); // 'value'
```

# 下载安装

```shell
npm install try-flatten
```

## 在线试用

[Playground Link](https://www.typescriptlang.org/zh/play?#code/JYWwDg9gTgLgBAbzjKBPAYgGwIYxgUwDs4BfOAMyghDgHIVUBacnPI2gbgCgv8APSLAoBXQgGMYwCMWwBnWflgA5YZkwAKAG7ZMw-AC44hVZgCUiLnDhR8MYVGLbd+OAF53Rk9xI9+g+OSiElIy8oowAKqEACb45MCE+NFaOnqGorHxidHmCJbWtvaOqS7urnAZcQlJ3r4C0AFBktJwcgqwAKJQVFApzoZdPbn5NnYOcE56cABk0xMlcAmyMNji+BDkcIPQtbz1QoHizaHtMCogAEaKfWmel4rDVqNFyKhg65uTpR60xvdQnC4Pj2-hERxCyHwy3UhGwIAMcGWUASAHMADSQ5YAYTkCPU5lcAD5WoRUI84GJpLIIJh8AA6TAQFHqehQySEFF0rm0DGw+GmbhWAjY3H43bCmAswAwKoBTa0Av4qAB1MeXB8W5iXkrJTCMs4ABtRRQDE2WQAXTcyDQWFwBEI6lVRLgAEYBTwrMBNuoDeSrG1wttel7BVZWmFYFFMtVksaXVYyPhMAoLMGQ6cVGpPd0Y8HfcphP91NGgz4SC6uBKWYA9tUAwDGK5VyVDiFUE9X5LU6sQ6TAXbBiADW6CaEPK6g7am7fcMGagA260DgAB9PGojVDDH8rlBmxMIMAcmqk8GFDAACqgdbCSX2lvJzWd8e9mEmDHOoOxrMkINt+D67or03m7AAHdsGAeAGCtNhbVHLse37QdpFLN0PS9A8fVDGB-SnLM0NOcMqmyAsoXfOB40TDVs3QtMNEDfIcPCc4N0I2R3yBUty1oAAFKgQGABQABlgF7fA61kBsxCbfdyK-PUDT-M1yiAkCwMtVgbXULjqF4+ljRpTR8HUZ1EMWZDM1QlM-VnANM1fcywxifCkiY4jSJcci6NzdMaOTHMzjzRjC3yYsXSAA)

# 对同步函数的 try-flatten

```ts
const [err, res] = tryFlatten(() => 1);

// 只需要判断 err 是否存在即可
if (err) {
  // 此处 err 类型为 Error，res 类型为 undefined
  console.log(err instanceof Error);
  console.log(res === undefined);
  return;
}

// 此处 err 类型为 null，res 类型为 number
console.log(err === null);
console.log(res === 1);
```

# 对回调函数的 try-flatten

```ts
const [err, res] = await tryFlatten((callback: (err: Error | null, res: number) => void) => {
  callback(null, 1);
});

// 只需要判断 err 是否存在即可
if (err) {
  // 此处 err 类型为 Error，res 类型为 undefined
  console.log(err instanceof Error);
  console.log(res === undefined);
  return;
}

// 此处 err 类型为 null，res 类型为 number
console.log(err === null);
console.log(res === 1);
```

# 对 PromiseLike 的 try-flatten

```ts
const [err, res] = await tryFlatten(Promise.resolve(1));

// 只需要判断 err 是否存在即可
if (err) {
  // 此处 err 类型为 Error，res 类型为 undefined
  console.log(err instanceof Error);
  console.log(res === undefined);
  return;
}

// 此处 err 类型为 null，res 类型为 number
console.log(err === null);
console.log(res === 1);
```

# 启发

- <https://www.npmjs.com/package/flatry>
