# DiFingerCapture Android SDK

Android 지문 캡처 SDK API 문서.

## API Documentation

👉 **[API 문서 보기](https://hoseon.github.io/DiFingerCaptureFramework_android-docs/)**

---

## 주요 API

### FingerActivity
지문 촬영 화면 진입점.

```kotlin
// 촬영 시작
val launcher = registerForActivityResult(StartActivityForResult()) { result ->
    if (result.resultCode == RESULT_OK) {
        val pref = UseSharedPreference(context)
        val rounds = pref.getLocalFingerprintARounds()  // 등록 (3라운드)
        val bResult = pref.getLocalFingerprintB()        // 인증 (1라운드)
    }
}
launcher.launch(FingerActivity.createIntent(context, isOriginFingerprint = true))
```

### IzzixServiceProxy
특징점 추출 및 매칭.

```kotlin
// 매칭
val result: MatchResult = IzzixServiceProxy.instance.matchMinutiae(
    reqFeatures = bFeatures,
    resFeatures = aFeatures
)
// result.isMatch, result.matchScore, result.hitCount
```

---

> 소스 코드는 공개되지 않습니다. 도입 문의: [digentid.com](https://digentid.com)
