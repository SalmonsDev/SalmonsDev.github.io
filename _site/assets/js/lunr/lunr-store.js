var store = [{
        "title": "[iOS/Xcode] SceneDelegate 삭제하고 App Build",
        "excerpt":"Xcode11부터 iOS App 프로젝트에 자동으로 SceneDelegate가 적용된 템플릿이 추가됩니다. SceneDelegate에 대해서는 추후에 포스팅하겠습니다.   이번 글은  SceneDelegate를 사용하지 않고 iOS App을 빌드하는 방법입니다.  첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.   1. 프로젝트 생성      File &gt; New &gt; Project 에서 iOS &gt; App을 선택하고 Interface를 Storyboard로 지정하여 프로젝트를 생성합니다.   2. SceneDelegate.swift 파일 삭제      SceneDelegate.swift 파일을 삭제합니다.   3. info.plist &gt; Application Scene Manifest 삭제      info.plist 에서 Application Scene Manifest를 삭제합니다.   4. AppDelegate.swift 수정      AppDelegate.swift 에서 window 변수를 선언합니다.   var window: UIWindow?   그리고 SceneDelegate의 UISceneSession Lifecycle 관련 함수들을 지워줍니다.   그러면 App 빌드가 원활히 되는 것을 확인할 수 있습니다.      참고  Xcode 11에서 SceneDelegate 사용하지 않고 Interface Builder 앱 만들기              Suni     ","categories": ["iOS"],
        "tags": ["iOS","Xcode","SceneDelegate"],
        "url": "http://localhost:4000/ios/scenedelegate-remove/",
        "teaser": "http://localhost:4000/"
      },{
        "title": "[AOS/Kotlin] Android Kotlin RecycerView GridLayoutManager",
        "excerpt":"Android RecyclerView GridLayoutManager   이번 글은  RecyclerView에 GridLayoutManager를 활용하는 방법 입니다.  긴 말에 앞서 결과부터 이미지부터 확인하겠습니다.      1. 프로젝트 준비   저는 RecyclerView와 Glide를 활용하여 작업했습니다.  Glide는 안드로이드 이미지 로딩 라이브러리 입니다.    // glide     kapt 'com.github.bumptech.glide:compiler:4.11.0'     implementation 'jp.wasabeef:glide-transformations:4.1.0' // recyclerview     implementation 'com.jakewharton.rxbinding3:rxbinding-recyclerview:3.1.0'        2. RecyclerView 생성   우선 RecyclerView에 관한 기본 내용은 Click here   먼저 RecyclerViewAdapter 와 RecyclerView의 아이템 레이아웃을 생성합니다.    item_my_list.xml &lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt; &lt;layout xmlns:app=\"http://schemas.android.com/apk/res-auto\"&gt;     &lt;androidx.constraintlayout.widget.ConstraintLayout         xmlns:android=\"http://schemas.android.com/apk/res/android\"         android:layout_width=\"match_parent\"         android:layout_height=\"wrap_content\"         android:layout_margin=\"10dp\"&gt;          &lt;ImageView             android:id=\"@+id/iv_item\"             android:layout_width=\"100dp\"             android:layout_height=\"160dp\"             app:layout_constraintTop_toTopOf=\"parent\"             app:layout_constraintBottom_toBottomOf=\"parent\"             app:layout_constraintEnd_toEndOf=\"parent\"             app:layout_constraintStart_toStartOf=\"parent\"             android:scaleType=\"centerCrop\"/&gt;      &lt;/androidx.constraintlayout.widget.ConstraintLayout&gt; &lt;/layout&gt;    &lt;layout 태그가 들어간 이유는 dataBinding을 사용했기 때문입니다.  Android dataBinding에 관한 내용은 추후 포스팅 하겠습니다.   Click here     MyAdapter.kt class MyAdapter: RecyclerView.Adapter&lt;MyAdapter.MyViewHolder&gt;() {      private var adapterItemList: MutableList&lt;MyListData&gt; = mutableListOf()      inner class MyViewHolder (             val binding: ItemMyListBinding     ): RecyclerView.ViewHolder(         binding.root     ){         fun bindViewHolder(pos: Int) {             with(adapterItemList[pos]) {                 binding.ivItem.loadRound(this.imgStr.toString(), 10)             }         }     }      override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder             = MyViewHolder(parent.bind(R.layout.item_my_list))      override fun getItemCount(): Int = adapterItemList.size      override fun onBindViewHolder(holder: MyViewHolder, position: Int) {         holder.bindViewHolder(position)     }      fun addItemList(list: MutableList&lt;MyListData&gt;) {         adapterItemList.clear()         adapterItemList.addAll(list)         notifyDataSetChanged()     } }    RecyclerView는 같은 아이템을 반복하여 재사용하기 때문에 위의 RecyclerViewAdapter에서 사용할 아이템 class를 정의해야 합니다.    MyListData.kt data class MyListData (     val imgStr: String? )  간단하게 이미지만 출력하기 때문에 이미지url을 저장할수 있는 String 변수 하나만 선언했습니다.    3. Activity에 RecyclerView 적용   저는 MainaActivity에 간단하게 RecyclerView 를 적용시켰습니다.   RecyclerView LayoutManager의 종류는 크게 LinearLayout, GirdLayout, StaggeredGridLayout 이 있습니다.   LinearLayout 은 가로 또는 세로 방향으로 길게 나열되는 방식이고,   GridLayout 은 바둑판 격자 형식으로 간단하게 표 방식이라고 생각하시면 됩니다.   StaggeredGridLayout 은 Gridlayout에서 가로 또는 세로의 길이가 불규칙적인 방식입니다.      참고 here     activity_main.xml &lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt; &lt;layout&gt;     &lt;androidx.constraintlayout.widget.ConstraintLayout xmlns:android=\"http://schemas.android.com/apk/res/android\"         xmlns:app=\"http://schemas.android.com/apk/res-auto\"         xmlns:tools=\"http://schemas.android.com/tools\"         android:layout_width=\"match_parent\"         android:layout_height=\"match_parent\"         android:background=\"#999999\"         tools:context=\".activity.MainActivity\"&gt;          &lt;LinearLayout             android:layout_width=\"match_parent\"             android:layout_height=\"match_parent\"             android:orientation=\"vertical\"             android:layout_marginVertical=\"50dp\"&gt;              &lt;androidx.recyclerview.widget.RecyclerView                 android:id=\"@+id/rv_test\"                 android:layout_width=\"match_parent\"                 android:layout_height=\"match_parent\"                 android:layout_gravity=\"center_horizontal\"/&gt;          &lt;/LinearLayout&gt;      &lt;/androidx.constraintlayout.widget.ConstraintLayout&gt; &lt;/layout&gt;     MainaActivity.kt class MainActivity : BaseActivity&lt;ActivityMainBinding&gt;() {      override val layoutId: Int = R.layout.activity_main      private var adapterMy: MyAdapter = MyAdapter()     private var myItemList: MutableList&lt;MyListData&gt; = mutableListOf()      override fun onCreate(savedInstanceState: Bundle?) {         super.onCreate(savedInstanceState)          initViews()     }      override fun initViews() {         super.initViews()          myItemList.apply {             add(StaggeredListData(\"원하는 이미지 url\"))             add(StaggeredListData(\"원하는 이미지 url\"))             ...         }          adapterMy.apply {             addItemList(myItemList)         }         binding.rvTest.apply {             adapter = adapterMy             layoutManager = GridLayoutManager(this@MainActivity, 3)         }      }  }      4. 끝으로…   결과 이미지의 둥근모서리 작업은 Glide 라이브러리를 활용했습니다.   위 내용과 관련된 dataBiding, Glide 내용은 추후 정리하여 포스팅 하겠습니다.       ‘kyuchanE’ Android 개발자  ","categories": ["AOS"],
        "tags": ["AOS","Kotlin","GridLayoutManager"],
        "url": "http://localhost:4000/aos/recycler-grid-aos/",
        "teaser": "http://localhost:4000/"
      },{
        "title": "[iOS/Swift] Grid형태 Image CollectionView만들기",
        "excerpt":"이번 글은   Grid 형태의 image CollectionView를 만드는 방법입니다.   첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.   1. Storyboard에 Collection View 추가/설정    프로젝트 생성 후 Main.storyboard &gt; View Controller에 Collection View 를 추가합니다.      CollectionView의 AutoLayout 을 설정합니다.      Collection View &gt;   &gt; delegate, dataSource 를 설정합니다.      Collection View &gt;  &gt; Estimate Size를 None 으로 설정합니다.     저는 Cell 사이에 구분을 명확히하기 위해 Collection View &gt;  &gt; Background 색상을 변경하였습니다.      Collection View Cell &gt; Content View에 Image View 를 추가하고, AutoLayout 을 설정합니다.   2. UICollectionViewCell 클래스 생성       New File \u0010&gt; iOS &gt; Cocoa Touch Class 를 클릭합니다.      Subclass of &gt; UICollectionViewCell 로 설정하고, Class 명을 원하는 명으로 바꾼 뒤 Next 를 클릭합니다.   3. Storyboard 에서 Cell 설정    Storyboard &gt; Collection View Cell &gt;   &gt; Custom Class &gt; Class 에 Cell 의 클래스명을 입력합니다.       &gt; Collection Reusable View &gt; Identifier 에 Cell 의 클래스명을 입력합니다.   4. GridCollectionViewCell.swift    (Cell클래스명).swift 에 ImageView 를 추가 합니다.   5. ViewController.swift   @IBOutlet weak var collectionView: UICollectionView!  var arrImageName: [String] = [\"image1\",\"image2\",\"image3\",\"image4\",\"image5\",\"image6\",\"image7\",\"image8\",\"image9\",\"image10\",\"image11\",\"image12\",\"image13\",\"image14\",\"image15\",\"image16\",\"image17\",\"image18\",\"image19\",\"image20\"]  ViewController.swift &gt; collectionView 와 이미지 이름 배열을 선언합니다.     extension ViewController: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {  }  ViewController 클래스 밖에 extension을 생성해 위와 같은 delegate, datasource를 선언합니다.     extension ViewController: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {          // CollectionView item 개수     func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -&gt; Int {         return arrImageName.count     }          // CollectionView Cell의 Object     func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -&gt; UICollectionViewCell {         let cell = collectionView.dequeueReusableCell(withReuseIdentifier: \"GridCollectionViewCell\", for: indexPath) as! GridCollectionViewCell                  cell.image.image = UIImage(named: arrImageName[indexPath.row]) ?? UIImage()                  return cell     }          // CollectionView Cell의 Size     func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -&gt; CGSize {                  let width: CGFloat = collectionView.frame.width / 3 - 1.0                  return CGSize(width: width, height: width)     }          // CollectionView Cell의 위아래 간격     func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -&gt; CGFloat {         return 1.0     }          // CollectionView Cell의 옆 간격     func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -&gt; CGFloat {         return 1.0     } }  extension 안에 위와 같이 작성합니다.   프로젝트 소스 GitHub  SNGridCollectionView 다운받으러 가기              Suni      ","categories": ["iOS"],
        "tags": ["iOS","Swift","UICollectionView"],
        "url": "http://localhost:4000/ios/make-gridcollectionview/",
        "teaser": "http://localhost:4000/"
      }]
