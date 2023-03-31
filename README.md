# try-flatten

✈ 类型安全的扁平化的 try-catch，支持同步函数、回调函数和 PromiseLike

[![code-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/code-review.yml)
[![dependency-review](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/FrontEndDev-org/try-flatten/actions/workflows/dependency-review.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/94927619d58d418f958ed74e16eaf5c5)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/94927619d58d418f958ed74e16eaf5c5)](https://app.codacy.com/gh/FrontEndDev-org/try-flatten/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
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
  console.log(err);
  return;
}

// try-catch 块级作用域快使用该变量
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
  console.log(err);
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
