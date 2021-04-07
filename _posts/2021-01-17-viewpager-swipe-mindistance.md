---
title: "[AOS/Kotlin] Android Kotlin ViewPager Swipe MinDistance"
header:
  teaser: ""
categories:
  - AOS
tags:
  - AOS
  - Kotlin
  - ViewPager
  - Swipe
  - MinDistance
toc: true
---

## 이번 글은

상용앱은 보통의 경우 ViewPager의 Swipe 감도를 수정할 일이 없습니다.  
그러나 키오스크 등 큰 화면의 기기에 사용될 앱을 만들 경우 사용자가 Swipe 모션을 제대로 수행하기 힘들기 때문에, 약간의 커스텀이 필요합니다.


ViewPager는 drag의 velocity에 따라 fling의 여부를 판단합니다.  
fling일 경우 fling distance를 계산해 정해진 수치보다 높을 경우 page를 전환시킵니다.  
fling이 아닐 경우 화면의 이동 offset에 page position을 더한 값에 버림연산을 하여 페이지를 결정합니다.  

이때 fling의 경우 JAVA의 reflect로 fling distance와 minVelocity를 바꿀 수 있지만,  
drag의 경우 임계치를 상수로 사용하여 reflect로 커스텀할 수 없으며,  
private method 이기 때문에 override도 불가능합니다.


아래에 제가 시도해본 두가지 방법의 간단한 소스와 설명을 준비했습니다.

## 1. reflect

fling의 여부를 결정하는 **minVelocity**를 -1로 설정하여, 모든 drag를 fling과 같이 처리하도록 합니다.<br>

```kotlin

val mMinimumVelocity: Field = ViewPager::class.java.getDeclaredField("mMinimumVelocity")

mMinimumVelocity.isAccessible = true

mMinimumVelocity.set(vp_eye, -1)

​
// 아래 소스는 flingDistance를 변경하고 싶을때 사용. viewPager의 기본 mFlingDistance가 매우 작기 때문에 보통 늘리는 용도로 사용.

// val mFlingDistance: Field = ViewPager::class.java.getDeclaredField("mFlingDistance")

// mFlingDistance.isAccessible = true

// mFlingDistance[vp_eye] = (90 * resources.displayMetrics.density).toInt()

```

viewpager는 기본적으로 fling일 경우 distance가 굉장히 짧아도 페이지가 넘어가도록 돼있어서, 이 방법으로 해결은 됩니다.

그러나 위의 이유 때문에 화면의 10%가량만 움직여도 페이지 이동이 돼버리는 단점이 있습니다.

<br>

## 2. dispatchTouchEvent

drag 직후 현재 화면이 얼마나 넘어갔는지를 판단해 처리하는 방법입니다.

```kotlin

// 멤버변수 선언
private var mCurPagerState = 0
private var mCurPagerOffset = 0f
private var mCurPagerPosition = 0

...

// onPageChangeListener
vp_news.addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
    override fun onPageScrollStateChanged(state: Int) {
        mCurPagerState = state
    }

    override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
        mCurPagerOffset = positionOffset
        mCurPagerPosition = position
    }

...

override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
    when (ev?.action) {
        MotionEvent.ACTION_UP -> {
            if (mCurPagerState == ViewPager.SCROLL_STATE_DRAGGING) {
                if (vp_news.currentItem == mCurPagerPosition) {
                    if (mCurPagerOffset > 0.3f) { // 원하는 수치로 설정
                        vp_news.currentItem++
                        return true
                    }
                } else {
                    if (mCurPagerOffset < 0.7f) { // 원하는 수치로 설정
                        vp_news.currentItem--
                        return true
                   }
               }
            }
        }
    }

	return super.dispatchTouchEvent(ev)
}

```

단점은 baseactivity 등에서 이미 dispatchTouchEvent나 onTouchEvent를 사용중일 경우, return true 로 인해 이벤트 전달이 되지 않으니 생각할게 많아질 수 있습니다.

<br>

## 마치며

분명 더 좋은 방법도 있겠지만 자료는 안나오고, 당장 마감이 급하다 보니 나온 편법인것같습니다.  
더 좋은 방법 아시는 분은 꼭 연락주세요!<br>
<br>
<br>
[![Vue](/assets/images/seil/common/img_link.png)](https://blog.naver.com/llloveshin)