---
title: "忙しい人のための Effective Kotlin"
date: 2021-10-31T22:23:02+09:00
menuTitle: "忙しい人のための Effective Kotlin"
chapter: false
weight: 500
draft: false
---

Effective なんちゃらシリーズの Kotlin 版。まだ日本語版が出版されていませんし、総ページ数 400 ページ余りとなかなかのボリュームなので、手を出しづらい方もいらっしゃるでしょう。
そんな忙しい方のために、要点だけをちょこちょこお届け。

なるべくセクションごとのまとめを心がけますが、執筆順不同です。誤訳も多分ありますので悪しからず。

## Part 1: Good code (良いコードとは)

### Chapter 1: Safety (安全性)

### Chapter 2: Readability (読みやすいコード)

## Part 2: Code design (コード設計)

### Chapter 3: Reusability (再利用性)

コードは再利用しやすいように書こうね、という話。

- Do not repeat knowledge (同じ情報は二度書かない)
- Do not repeat common algorithms (車輪の再開発はやめよう)
- Use property delegation to extract common property patterns (共通プロパティ構造を抽出するためのプロパティ委譲)
- Use generics when implementing common algorithms (ジェネリクスによるアルゴリズムの共通化)
- Avoid shadowing type parameters (型パラメータは明示的に)
- Consider variance for generic types (ジェネリック型への変性の導入)
- Reuse different platforms by extracting common modules (共通モジュールによるマルチプラットフォーム化)

### Chapter 4: Abstraction design (抽象的設計)

### Chapter 5: Object creation (インスタンス生成)

### Chapter 6: Class design (クラス設計)

## Part 3: Efficiency (効率の良いコード)

### Chapter 7: Make it cheap (無駄を省こう)

### Chapter 8: Efficient collection processing (上手なコレクションの扱い方)
