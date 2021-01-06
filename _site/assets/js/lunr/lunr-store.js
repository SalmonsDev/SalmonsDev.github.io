var store = [{
        "title": "[iOS/Xcode] SceneDelegate 삭제하고 App Build",
        "excerpt":"Xcode11부터 iOS App 프로젝트에 자동으로 SceneDelegate가 적용된 템플릿이 추가됩니다. SceneDelegate에 대해서는 추후에 포스팅하겠습니다.   이번 글은  SceneDelegate를 사용하지 않고 iOS App을 빌드하는 방법입니다.  첨부 이미지는 Storyboard intreface기반 Swift 프로젝트입니다.   1. 프로젝트 생성      File &gt; New &gt; Project 에서 iOS &gt; App을 선택하고 Interface를 Storyboard로 지정하여 프로젝트를 생성합니다.   2. SceneDelegate.swift 파일 삭제      SceneDelegate.swift 파일을 삭제합니다.   3. info.plist &gt; Application Scene Manifest 삭제      info.plist 에서 Application Scene Manifest를 삭제합니다.   4. AppDelegate.swift 수정      AppDelegate.swift 에서 window 변수를 선언합니다.   var window: UIWindow?   그리고 SceneDelegate의 UISceneSession Lifecycle 관련 함수들을 지워줍니다.   그러면 App 빌드가 원활히 되는 것을 확인할 수 있습니다.      참고  Xcode 11에서 SceneDelegate 사용하지 않고 Interface Builder 앱 만들기              Suni     ","categories": ["iOS"],
        "tags": ["iOS","Xcode","SceneDelegate"],
        "url": "http://localhost:4000/ios/scenedelegate-remove/",
        "teaser": "http://localhost:4000/"
      }]
