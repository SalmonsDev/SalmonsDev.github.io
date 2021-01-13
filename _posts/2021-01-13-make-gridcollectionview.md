---
title: "[iOS/Swift] Grid형태 Image CollectionView만들기"
header:
  teaser: ""
categories:
  - iOS
tags:
  - iOS
  - Swift
  - UICollectionView
toc: true
---

## 이번 글은
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sample.PNG){: .align-center}
Grid 형태의 image CollectionView를 만드는 방법입니다. <br>
첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.


## 1. Storyboard에 Collection View 추가/설정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sb1.png){: .align-center}
프로젝트 생성 후 Main.storyboard > View Controller에 Collection View 를 추가합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sb2.png){: .align-center}
CollectionView의 AutoLayout 을 설정합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sb3.png){: .align-center}
Collection View >  ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/icon2.png) > delegate, dataSource 를 설정합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sb5.png){: .align-center}
Collection View > ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/icon1.png) > Estimate Size를 None 으로 설정합니다.
<br>

저는 Cell 사이에 구분을 명확히하기 위해 Collection View > ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/icon3.png) > Background 색상을 변경하였습니다.
{: .notice--primary}

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-sb4.png){: .align-center}
Collection View Cell > Content View에 Image View 를 추가하고,
AutoLayout 을 설정합니다.


## 2. UICollectionViewCell 클래스 생성

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell1.png){: .align-center}

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell2.png){: .align-center}
New File > iOS > Cocoa Touch Class 를 클릭합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell3.png){: .align-center}
Subclass of > UICollectionViewCell 로 설정하고,
Class 명을 원하는 명으로 바꾼 뒤 Next 를 클릭합니다.


## 3. Storyboard 에서 Cell 설정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell4.png){: .align-center}
Storyboard > Collection View Cell >  ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/icon4.png) > Custom Class > Class 에 Cell 의 클래스명을 입력합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell5.png){: .align-center}
![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/icon3.png) > Collection Reusable View > Identifier 에 Cell 의 클래스명을 입력합니다.

## 4. GridCollectionViewCell.swift

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210113/make-gridcollectionview-cell6.png){: .align-center}
(Cell클래스명).swift 에 ImageView 를 추가 합니다.


## 5. ViewController.swift

```swift
@IBOutlet weak var collectionView: UICollectionView!

var arrImageName: [String] = ["image1","image2","image3","image4","image5","image6","image7","image8","image9","image10","image11","image12","image13","image14","image15","image16","image17","image18","image19","image20"]
```
ViewController.swift > collectionView 와 이미지 이름 배열을 선언합니다.
<br>

```swift
extension ViewController: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {

}
```
ViewController 클래스 밖에 extension을 생성해 위와 같은 delegate, datasource를 선언합니다.
<br>

```swift
extension ViewController: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    // CollectionView item 개수
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return arrImageName.count
    }
    
    // CollectionView Cell의 Object
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "GridCollectionViewCell", for: indexPath) as! GridCollectionViewCell
        
        cell.image.image = UIImage(named: arrImageName[indexPath.row]) ?? UIImage()
        
        return cell
    }
    
    // CollectionView Cell의 Size
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        let width: CGFloat = collectionView.frame.width / 3 - 1.0
        
        return CGSize(width: width, height: width)
    }
    
    // CollectionView Cell의 위아래 간격
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 1.0
    }
    
    // CollectionView Cell의 옆 간격
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 1.0
    }
}
```
extension 안에 위와 같이 작성합니다.


## 프로젝트 소스 GitHub
[SNGridCollectionView 다운받으러 가기](https://github.com/SuniDev/SNGridCollectionView)

<br><br>
<figure style="width: 100px" class="align-center">
<a href="https://sunidev.github.io/">
  <img href="https://sunidev.github.io/" src="{{ site.url }}{{ site.baseurl }}/assets/images/suni/profile.png" alt="">
  <figcaption align="center">Suni</figcaption>
  </a>
</figure>

