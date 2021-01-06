---
title: "[iOS/Xcode] SceneDelegate 삭제하고 App Build"
header:
  teaser: ""
categories:
  - iOS
tags:
  - iOS
  - Xcode
  - SceneDelegate
toc: true
---

Xcode11부터 iOS App 프로젝트에 자동으로 SceneDelegate가 적용된 템플릿이 추가됩니다.
SceneDelegate에 대해서는 추후에 포스팅하겠습니다.

## 이번 글은
SceneDelegate를 사용하지 않고 iOS App을 빌드하는 방법입니다.<br>
첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.



## 1. 프로젝트 생성

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210106/remove-scenedelegate1.png){: .align-center}

File > New > Project 에서 iOS > App을 선택하고
Interface를 Storyboard로 지정하여 프로젝트를 생성합니다.



## 2. SceneDelegate.swift 파일 삭제

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210106/remove-scenedelegate2.png){: .align-center}

SceneDelegate.swift 파일을 삭제합니다.



## 3. info.plist > Application Scene Manifest 삭제

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210106/remove-scenedelegate3.png){: .align-center}

info.plist 에서 Application Scene Manifest를 삭제합니다.



## 4. AppDelegate.swift 수정

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/suni/210106/remove-scenedelegate4.png){: .align-center}

AppDelegate.swift 에서 window 변수를 선언합니다.

```swift
var window: UIWindow?
```

그리고 SceneDelegate의 UISceneSession Lifecycle 관련 함수들을 지워줍니다.

그러면 App 빌드가 원활히 되는 것을 확인할 수 있습니다.


<br><br>
**<font size="4">참고</font><br>**
[<font size="4">Xcode 11에서 SceneDelegate 사용하지 않고 Interface Builder 앱 만들기</font>](https://medium.com/@taegeon/xcode-11%EC%97%90%EC%84%9C-interface-builder%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-ios-12%EC%9A%A9-%EC%95%B1-%EB%B9%8C%EB%93%9C%ED%95%98%EA%B8%B0-81e3fd62efe3)

<br><br>
<figure style="width: 100px" class="align-center">
<a href="https://sunidev.github.io/">
  <img href="https://sunidev.github.io/" src="{{ site.url }}{{ site.baseurl }}/assets/images/suni/profile.png" alt="">
  <figcaption align="center">Suni</figcaption>
  </a>
</figure>
