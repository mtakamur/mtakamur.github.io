---
title: "コレクションの deep copy が欲しい"
date: 2021-10-30T11:46:28+09:00
weight: 100
draft: false
---

更新日: 2021/9/12

### まとめ

- toList, toSet, toMap などの、コレクションの変換メソッドで得られるのは"浅いコピー" (Shallow copy)
- コレクションそのものは変換元とは別インスタンスなるが、プリミティブ型以外の要素は参照のコピーなので、目的に合ったコピーになっているか注意が必要
- data class の copy()メソッドによるコピーも、実際は shallow copy。プリミティブ型以外のプロパティについては元のインスタンスと同じ参照を持つ
- Kotlin 組み込みの実装だけによって deep copy を作ることは現状できない。クラスごとに deep copy 用のメソッドを自力で実装するのが単純。

---

#### インスタンスのコピー

toList, toSet など、コレクションを変換、コピーすることができるメソッドが Kotlin には用意されています。この時、コレクションの要素も deep copy されると思い込んではまったお話。

値やインスタンスの集合であるコレクション(List, Set, Map など)を丸ごとコピーしたい場合は、下記のように toList, toSet, toMap など、目的の型への変換メソッドを使うことでコピーが行えます。 to~はコレクションの変換メソッドとして紹介されることが多いですが、変換元の型と同じ型への変換メソッドを使うと、中身が同じだけれども別インスタンスとしてのコレクション(コピー)を得ることができます。 ただし、プリミティブ型以外の要素は、 shallow copy が作られるだけで、参照先は変わりません。

下記を例にとってみます。 Person クラスを要素に持つ List を、 toList() メソッドによってコピーしています。生成されたコピーに対して、一つ目の要素の値を書き換えてみます。

```kotlin
data class Person(
  var name: String
)

fun shallowCopy() {
  val family = listOf(
      Person("a"),
      Person("b")
  )
  val shallowCopiedFamily = family.toList()

  // 一人目の名前を変えちゃう
  shallowCopiedFamily.first().name = "c"

  println("family = $family")
  println("copiedFamily = $shallowCopiedFamily")
 }
```

要素を書き換えた後のそれぞれの List を出力してみると下記のようになります。
これは、`toList()`によるコピーが shallow copy だからです。
生成されたリスト自体は元のインスタンスと別物ですが、中に含まれるインスタンスは下図のように同じ場所を参照しています。

<!--
図を貼る
![]()
-->

```
family = [Person(name=c), Person(name=b)]
copiedFamily = [Person(name=c), Person(name=b)]
```

プリミティブ型以外の要素を持つコレクションをディープコピーしたい場合は、下記のように一工夫必要となります。

```kotlin
fun deepCopy() {
  val family = listOf(
      Person("a"),
      Person("b")
  )
  val deepCopiedFamily = family.map { member -> member.copy() }

  // 一人目の名前を変えちゃう
  deepCopiedFamily.first().name = "c"

  println("family = $family")
  println("copiedFamily = $deepCopiedFamily")
  }
```

```
family = [Person(name=a), Person(name=b)]
copiedFamily = [Person(name=c), Person(name=b)]
```

一例でしかありませんが、この例では map()メソッドによって要素を逐一コピーしたものを新しく生成されるコレクションの要素に与えています。
インスタンスに対して copy()メソッドを実行すると、そのインスタンスの deep copy が返されます。
これを新しいコレクションの要素とすれば、各要素の deep copy で構成されたコレクションが得られます。

### プリミティブ型は例外

プリミティブ型については、to~によるコピーで別の値としてのコピーが作成されます(そもそもプリミティブ型に対して copy()メソッドは定義されていない)。

```kotlin
fun primitiveCopy() {
  val list = listOf(0, 1)
  val copiedList = list.toMutableList()

  // コピーしたリストの要素をいじってみる
  copiedList[0] = 2

  println("list = $list")
  println("copiedList = $copiedList")
  }
```

```
list = [0, 1]
copiedList = [2, 1]
```

試しにやってみると、単に toList()によって(要素をいじりたいので実際は toMutableList()によって)作られたコピーの要素をいじってみても、元の要素に変更はないことがわかります。

### copy メソッドでも shallow copy が作られる (2021/9/21 追記)

data class の　 copy() メソッドに関して訂正です。 deep copy が欲しければ data class の copy() メソッドを使えばよいと上で述べましたが、実際に生成されるのは shallow copy のため、状況によっては不適切です。

"状況によっては"というのも、コピーしたい data class のプロパティがプリミティブ型のみであれば、実際は deep copy の生成とみなせますので問題は起こらないはずです。問題が起こりうるのは、下記のようにインスタンスをプロパティとして保持している場合です。

```kotlin
data class Container(val content: Content)
data class Content(var id: Int)

  fun instanceProperty() {
    val content = Content(0)
    val container = Container(content)
    val copiedContainer = container.copy()

    copiedContainer.content.id = 1

    println("content in container = $container")
    println("content in copiedContainer = $copiedContainer")
}
```

実行結果は下記のようになり、 Container クラスのプロパティである content インスタンスは元の参照と同じものを持っているため、コピー先への変更がコピー元が保持している content にまで及んでいることがわかります。

```
content in container = Container(content=Content(id=1))
content in copiedContainer = Container(content=Content(id=1))
```

こういったケースで deep copy が必要になる場合は Container クラスに自力で copy メソッドを実装して、プロパティのインスタンスも copy によってコピーするのが単純でしょうか…。

```kotlin
data class Container(val content: Content) {
    fun copy() = Container(content.copy()) // 手動コピー
}

data class Content(var id: Int)
```

上記のコードで一応の目的は果たせることになりますが、拡張性もメンテナンス性も最悪です。 Container クラスを拡張した場合は忘れずに独自実装の copy() メソッドも修正する必要があります(が、質の悪いことに修正を忘れてもコンパイルは通ってしまいます)。

調べてみると、 deep copy を生成するためのライブラリも公開されているようです。

コピーなんて単純だと思っていましたが、目的にあったコピーは意外と難しいものでした…。スマートなアイディアをお持ちの方、ぜひ筆者に教えてください。
