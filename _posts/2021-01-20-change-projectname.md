---
title: "[iOS/Xcode] Project Name 변경하기"
header:
  teaser: ""
categories:
  - iOS
tags:
  - iOS
  - Xcode
toc: true
---

전에 포스팅한 GridCollectionView 프로젝트를 아예 CollectionView 마스터하기 프로젝트로 변경하기 위해 프로젝트 이름을 바꾸면서 프로젝트 이름 변경법도 포스팅하러 왔습니다 =)

## 이번 글은
Xcode 프로젝트 이름을 변경하는 방법입니다.


## 1. Project Navigator 수정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname1.png){: .align-center}
이름을 바꾸고자하는 프로젝트를 열어 왼쪽 Project Navigator에서 맨 위 파일을 클릭해줍니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname2.png){: .align-center}
엔터를 치고, 원하는 이름으로 바꿔줍니다.
저는 Grid를 빼고 "SNCollectionView"로 변경하였습니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname3.png){: .align-center}
해당 화면이 뜨면 Rename을 클릭해줍니다.

[ProjectName]Tests 와 [ProjectName]UITests 는 프로젝트에 Target으로 포함되어 있지 않으면 뜨지 않습니다 !
{: .notice--primary}


## 2. Manage Schemes 수정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname5.png){: .align-center}
Product -> Scheme -> Manage Scheme 을 클릭합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname6.png){: .align-center}
프로젝트 이름을 선택하고 엔터를 쳐줍니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname7.png){: .align-center}
수정한 프로젝트 이름을 입력하고 엔터칩니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname8.png){: .align-center}
이름이 바뀐것을 확인하면 Close 버튼을 클릭합니다.

이제 프로젝트를 종료하고 프로젝트가 있는 Finder를 열어줍니다.

## 3. Finder 수정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname9.png){: .align-center}
프로젝트가 있는 Finder에서 이름이 바뀌지 않은 폴더 이름들을 바꿔줍니다.

다시 프로젝트를 열어줍니다.


## 4. Project 수정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname10.png){: .align-center}
프로젝트로 돌아오면 이러한 빨간 글씨를 볼 수 있습니다.
저 폴더를 눌러줍니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname11.png){: .align-center}
오른쪽 File inspector에서 폴더 이름을 수정하고, ![image]({{ site.url }}{{ site.baseurl }}/assets/images/suni/icon/icon-folder.png) 를 클릭합니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname12.png){: .align-center}
해당 안쪽 폴더를 선택해줍니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname13.png){: .align-center}
Targets > 프로젝트 선택 > Build Settings > 'info.plist' 검색 > info.plist File 을 선택하고 엔터를 쳐줍니다.

<br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname15.png){: .align-center}
(변경된 프로젝트 이름)/info.plist 로 수정합니다.

<br>
이제 변경된 프로젝트 이름으로 빌드를 진행할 수 있습니다. 

## 5. Bundle Identifier 수정

빌드 오류가 발생하지 않지만, 저는 Bundle ID를 맞추어 주었습니다.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210120/change-projectname-tip.png){: .align-center}
Targets > 프로젝트 선택 > General > Bundle Identifier 수정

<br><br>

[ProjectName]Tests 와 [ProjectName]UITests 수정도 프로젝트 이름 수정과 같은 방법으로 해주시면 됩니다!
{: .notice--primary}

<br><br>
**참고**<br>
[iOS ) Xcode 프로젝트 이름 바꾸는 방법](https://zeddios.tistory.com/286)

<br><br>
<figure style="width: 100px" class="align-center">
<a href="https://sunidev.github.io/">
  <img href="https://sunidev.github.io/" src="{{ site.url }}{{ site.baseurl }}/assets/images/suni/profile.png" alt="">
  <figcaption align="center">Suni</figcaption>
  </a>
</figure>
