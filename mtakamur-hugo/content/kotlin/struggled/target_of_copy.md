---
title: "data class copy() の対象"
date: 2021-10-30T11:46:57+09:00
weight: 101
draft: false
---

更新日: 2021/9/13

### まとめ

- data class のプロパティは、特に理由がない限りはプライマリコンストラクタ中で宣言したほうが良い
- プライマリコンストラクタ意外で定義したプロパティは、equals(), hashCode(), copy()メソッドの生成時に考慮されない

---

### data class の copy()メソッドは primary constructor に基づく

data class を作ると、Kotlin 側で自動的に下記の 5 つのメソッドを実装してくれ、私たちは特に気にしなくても便利にデータクラスを使えるのでした。

- equals(): プロパティの同一性を true / false の 2 値で返してくれるメソッド
- hashCode(): プロパティを基に一意なハッシュ値を生成してくれるメソッド
- toString(): インスタンスを文字列出力したときのフォーマット
- componentN(): N 番目のプロパティへのアクセサ
- copy(): 元のプロパティと同じ値を持った別のインスタンスを生成してくれるメソッド
  今回は、copy() メソッドではいかなるプロパティも自動でコピーしてくれると思っていてハマったお話です。

結論として、copy() メソッドでコピーしてくれるのは data class の primary constructor で宣言されているプロパティのみです。データクラスの実装上、 コンストラクタ以外の部分でもプロパティを定義することができますが、それらは copy() メソッドの対象外になってしまうので注意が必要です。 このことは公式ドキュメントにも(分かりづらいですが)ちゃんと書いてありました。自動的に生成される 5 メソッドは、あくまでプライマリコンストラクタで宣言されたプロパティだけを対象として生成されるということですね。

例えば下記のような実装をすると、isAdult は data class Human のプロパティではありますが、 copy() メソッドで値がコピーされません。

```kotlin
          data class Human(
            val name: String,
            val age: Int,
        ){
            var isAdult: Boolean = false // コンストラクタ外での定義
        }

          fun notCopied() {
            val human = Human(name = "mtakamur", age = 27)
            if (human.age >= 20) human.isAdult = true // プロパティを更新

            val copiedHuman = human.copy()

            println("human = $human, isAdult = ${human.isAdult}")
            println("copiedHuman = $copiedHuman, isAdult = ${copiedHuman.isAdult}")
        }
```

```
          human = Human(name=mtakamur, age=27), isAdult = true
          copiedHuman = Human(name=mtakamur, age=27), isAdult = false // 変えたはずなのに…。
```

isAdult の定義をちゃんとプライマリコンストラクタに移動してあげると、isAdult も copy() によって複製されるようになります。

そもそもデータクラス(値の塊をパックする入れ物)という概念上、上記のような実装は避けるべきかもしれません。コンストラクタ以外の場所でプロパティを定義したい場合には下記のようにすると安全そうです。

```kotlin
          data class ModifiedHuman(
            val name: String,
            val age: Int
        ) {
            val isAdult = age >= 20
        }
```

ポイントはコンストラクタ外のプロパティの値は、**コンストラクタで宣言されている値のみに依存させる**ということです。
そうしておけば、copy() 時にもコンストラクタで宣言されている値を追いかけることができるようになります。
