# try-flatten

✈ 类型安全的扁平化的 try-catch，支持同步函数、回调函数和 PromiseLike

[![code-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml)
[![dependency-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/948a21cc839b431490dd8b8bf22628c3)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/948a21cc839b431490dd8b8bf22628c3)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
![npm](https://img.shields.io/npm/v/try-flatten)
![release](https://img.shields.io/github/v/release/FrontEndDev-org/try-flatten)
![license](https://img.shields.io/github/license/FrontEndDev-org/try-flatten)

# 为什么需要这个

## try-catch 块级作用域带来的问题

```ts
// 需要先在 try-catch 块级作用域外定义变量，此处还需要先声明类型
let res: Result | undefined;

try {
  // 块级作用域内赋值
  res = await somePromise;
} catch (err) {
  // 此处 err 类型为 unknown
  console.log(err);
  return;
}

// try-catch 块级作用域外使用该变量
// 因为 res 类型包含 undefined，所以还要加有值判断
if (res) {
  console.log(res.prop);
}
```

## 用上 `try-flatten` 后

```ts
const [err, res] = await somePromise;

// 只需要判断 err 是否存在即可
if (err) {
  // 此处 err 类型为 Error，res 类型为 undefined
  console.log(err instanceof Error);
  console.log(res === undefined);
  return;
}

// 此处 err 类型为 null，res 类型为 Result
console.log(err === null);
console.log(res.prop);
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
