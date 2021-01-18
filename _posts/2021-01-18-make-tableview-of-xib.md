---
title: "[iOS/Swift] xib로 TableView 만들기"
header:
  teaser: ""
categories:
  - iOS
tags:
  - iOS
  - Swift
  - UITableView
toc: true
---

## 이번 글은
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-sample.PNG){: .align-center}
xib로 간단한 TableView를 만드는 방법입니다.<br>
첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.


## 1. Storyboard에 Table View 추가/설정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-sb1.png){: .align-center}
프로젝트 생성 후 Main.storyboard > View Controller에 Table View 를 추가합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-sb2.png){: .align-center}
Table View의 AutoLayout을 설정합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-sb3.png){: .align-center}
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-sb4.png){: .align-center}
Table View >  ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/icon/icon-autolayout.PNG) > delegate, dataSource 를 설정합니다.


## 2. UITableViewCell 클래스 생성

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-cell1.png){: .align-center}

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-cell2.png){: .align-center}
New File > iOS > Cocoa Touch Class 를 클릭합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-cell3.png){: .align-center}
Subclass of > UITableViewCell 로 설정하고,
Class 명을 원하는 명으로 바꾼 뒤,
Also create XIB file을 체크하고 Next를 클릭합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-cell4.png){: .align-center}
이와 같이 cell.swift 파일과 cell.xib 파일이 생성되어야 합니다.


## 3. xib 에서 Cell 설정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-xib1.png){: .align-center}
FruitCell.xib > cell을 원하는 형태로 커스텀합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-xib2.png){: .align-center}
FruitCell 선택 > ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/icon/icon-attribute.PNG) 선택 > identifier에 cell의 클래스명을 입력합니다.


## 4. FruitCell.swift

```swift
@IBOutlet weak var thumbnail: UIImageView!
@IBOutlet weak var lblName: UILabel!
@IBOutlet weak var lblInfo: UILabel!
```
FruitCell.swift 에 IBOutlet을 선언합니다.

## 5. ViewController.swift

```swift
@IBOutlet weak var tableView: UITableView!
var arrImageName: [String] = ["image1","image2","image3","image4","image5","image6","image7","image8","image9","image10"]

var arrFruitName: [String] = ["Apples","Apricots","Aubergines","Avocados","Bananas","Butternut squash","Cherries","Clementines","Dates","Elderberries"]

var arrFruitInfo: [String] = ["Granny Smith, Royal Gala, Golden Delicious and Pink Lady are just a few of the thousands of kinds of apple that are grown around the world.","Apricots can be eaten fresh or dried – both are packed with vitamins. ","Most aubergines are teardrop-shaped and have glossy purple skin.","Sometimes called an avocado pear, this fruit is often mistakenly described as a vegetable because we eat it in salads.","A great snack in a handy yellow skin!","Butternut squash is a large and pear-shaped fruit with a golden-brown to yellow skin.","Cherries grow from stalks in pairs and a tree can produce fruit for as long as 100 years!","This citrus fruit is the smallest of the tangerines.","These fruits come from the date palm tree and grow abundantly in Egypt.","These little, almost black berries grow on bushes all over the UK countryside in summer."]

```
ViewController.swift > tableView와 tableView에 뿌려줄 데이터 배열을 선언합니다.
<br>

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    
    // TableView에 Cell 등록
    let nibName = UINib(nibName: "FruitCell", bundle: nil)
   tableView.register(nibName, forCellReuseIdentifier: "FruitCell")
}
```
ViewController.swift > viewDidLoad() 에 위와 같이 Table View에 Cell을 등록합니다.
<br>

```swift
extension ViewController: UITableViewDelegate, UITableViewDataSource {
    
    // TableView item 개수
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return arrImageName.count
    }
    
    // TableView Cell의 Object
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "FruitCell", for: indexPath) as! FruitCell
        
        cell.thumbnail.image = UIImage(named: arrImageName[indexPath.row])
        cell.lblName.text = arrFruitName[indexPath.row]
        cell.lblInfo.text = arrFruitInfo[indexPath.row]
        
        return cell
        
    }
}
```
ViewController extension 을 만들어, UITableViewDelegate, UITableViewDataSource 프로토콜을 선언해,
extension 안에 위와 같이 작성합니다.

이제 빌드를 하면 결과를 확인할 수 있습니다.


## TIP. TableViewCell Select Highlight

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-tip2.PNG){: .align-center}
Table View Cell의 Default설정은 위와 같이 Cell을 선택하면 하이라이트가 들어갑니다.
하이라이트를 없애는 방법입니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210118/make-tableview-of-xib-tip1.png){: .align-center}
cell.xib > Cell 선택 > ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/icon/icon-attribute.PNG) > Selection을 None으로 선택합니다.


## 프로젝트 소스 GitHub
[SNTableView 다운받으러 가기](https://github.com/SuniDev/SNTableView)

<br><br>
<figure style="width: 100px" class="align-center">
<a href="https://sunidev.github.io/">
  <img href="https://sunidev.github.io/" src="{{ site.url }}{{ site.baseurl }}/assets/images/suni/profile.png" alt="">
  <figcaption align="center">Suni</figcaption>
  </a>
</figure>
