---
title: "[AOS/Kotlin] Android Kotlin RecycerView GridLayoutManager"
header:
  teaser: ""
categories:
  - AOS
tags:
  - AOS
  - Kotlin
  - GridLayoutManager
toc: true
---

Android RecyclerView GridLayoutManager

## 이번 글은
RecyclerView에 GridLayoutManager를 활용하는 방법 입니다.<br>
긴 말에 앞서 결과부터 이미지부터 확인하겠습니다.

![image-center](/assets/images/chan9u/210110/android_gridlayout.jpeg){: .align-center}




## 1. 프로젝트 준비

저는 RecyclerView와 Glide를 활용하여 작업했습니다.<br>
Glide는 안드로이드 이미지 로딩 라이브러리 입니다.<br>

```Kotlin
// glide
    kapt 'com.github.bumptech.glide:compiler:4.11.0'
    implementation 'jp.wasabeef:glide-transformations:4.1.0'
// recyclerview
    implementation 'com.jakewharton.rxbinding3:rxbinding-recyclerview:3.1.0'

```

<br>

## 2. RecyclerView 생성

우선 RecyclerView에 관한 기본 내용은 Click [here](https://developer.android.com/guide/topics/ui/layout/recyclerview?hl=ko){: target="_blank"}
<br>
먼저 RecyclerViewAdapter 와 RecyclerView의 아이템 레이아웃을 생성합니다.<br>

```xml
item_my_list.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:app="http://schemas.android.com/apk/res-auto">
    <androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp">

        <ImageView
            android:id="@+id/iv_item"
            android:layout_width="100dp"
            android:layout_height="160dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            android:scaleType="centerCrop"/>

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```
<br>
<layout 태그가 들어간 이유는 dataBinding을 사용했기 때문입니다.<br>
Android dataBinding에 관한 내용은 추후 포스팅 하겠습니다.   Click [here](https://developer.android.com/topic/libraries/data-binding?hl=ko){: target="_blank"}
<br>

```Kotlin
MyAdapter.kt
class MyAdapter: RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

    private var adapterItemList: MutableList<MyListData> = mutableListOf()

    inner class MyViewHolder (
            val binding: ItemMyListBinding
    ): RecyclerView.ViewHolder(
        binding.root
    ){
        fun bindViewHolder(pos: Int) {
            with(adapterItemList[pos]) {
                binding.ivItem.loadRound(this.imgStr.toString(), 10)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder
            = MyViewHolder(parent.bind(R.layout.item_my_list))

    override fun getItemCount(): Int = adapterItemList.size

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.bindViewHolder(position)
    }

    fun addItemList(list: MutableList<MyListData>) {
        adapterItemList.clear()
        adapterItemList.addAll(list)
        notifyDataSetChanged()
    }
}
```
<br>
RecyclerView는 같은 아이템을 반복하여 재사용하기 때문에 위의 RecyclerViewAdapter에서 사용할 아이템 class를 정의해야 합니다.
<br>
```Kotlin
MyListData.kt
data class MyListData (
    val imgStr: String?
)
```
간단하게 이미지만 출력하기 때문에 이미지url을 저장할수 있는 String 변수 하나만 선언했습니다.<br>


## 3. Activity에 RecyclerView 적용

저는 MainaActivity에 간단하게 RecyclerView 를 적용시켰습니다. <br>
RecyclerView LayoutManager의 종류는 크게 LinearLayout, GirdLayout, StaggeredGridLayout 이 있습니다. <br>
LinearLayout 은 가로 또는 세로 방향으로 길게 나열되는 방식이고, <br>
GridLayout 은 바둑판 격자 형식으로 간단하게 표 방식이라고 생각하시면 됩니다. <br>
StaggeredGridLayout 은 Gridlayout에서 가로 또는 세로의 길이가 불규칙적인 방식입니다. <br>

![image-center](/assets/images/chan9u/210110/android_layoutmanager.png){: .align-center}
참고 [here](https://androidride.com/recyclerview-android-simple-tutorial-listview-checkbox-example/){: target="_blank"}
<br>

```xml
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout>
    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#999999"
        tools:context=".activity.MainActivity">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:layout_marginVertical="50dp">

            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/rv_test"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_gravity="center_horizontal"/>

        </LinearLayout>

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```
<br>
```Kotlin
MainaActivity.kt
class MainActivity : BaseActivity<ActivityMainBinding>() {

    override val layoutId: Int = R.layout.activity_main

    private var adapterMy: MyAdapter = MyAdapter()
    private var myItemList: MutableList<MyListData> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        initViews()
    }

    override fun initViews() {
        super.initViews()

        myItemList.apply {
            add(StaggeredListData("원하는 이미지 url"))
            add(StaggeredListData("원하는 이미지 url"))
            ...
        }

        adapterMy.apply {
            addItemList(myItemList)
        }
        binding.rvTest.apply {
            adapter = adapterMy
            layoutManager = GridLayoutManager(this@MainActivity, 3)
        }

    }

}
```
<br>


## 4. 끝으로...

결과 이미지의 둥근모서리 작업은 Glide 라이브러리를 활용했습니다. <br>
위 내용과 관련된 dataBiding, Glide 내용은 추후 정리하여 포스팅 하겠습니다. <br>
<br>
<br>
['kyuchanE' Android 개발자](https://github.com/kyuchanE)
