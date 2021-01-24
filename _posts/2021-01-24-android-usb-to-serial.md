title: "[AOS/Kotlin] Android USB to Serial (QR코드 스캐너 시리얼 통신으로 연결)"
header:
  teaser: ""
categories:
  - AOS
tags:
  - AOS
  - Kotlin
  - USB to Serial
toc: true
---

Android USB to Serial
안드로이드 QR코드 스캐너 시리얼 통신으로 연결!

## 이번 글은
QR코드 스캔 하드웨어 기기와 안드로이드를 시리얼 통신으로 연결을 시도해봤습니다.<br>
준비한 하드웨어는 Newland FM430 모델 입니다.

![image-center](/assets/images/chan9u/210124/newland_fm430_1.jpeg){: .align-center}  <br>
![image-center](/assets/images/chan9u/210124/newland_fm430_2.jpeg){: .align-center}



## 1. 프로젝트 준비

저는 mik3y/usb-serial-for-android 이분의 자료를 이용하여 작업했습니다. <br>
Click [here](https://github.com/mik3y/usb-serial-for-android?utm_source=android-arsenal.com&utm_medium=referral&utm_campaign=512){: target="_blank"}
<br>
```kotlin
// mik3y usb serial
    implementation 'com.github.mik3y:usb-serial-for-android:3.3.0'

```

<br>

## 2. 하드웨어 디바이스 세팅

시리얼 통신을 하기위해 필요한 하드웨어 기기의 필수 정보가 있습니다. vendor-id, product-id, baudRate 입니다.<br>
이제 이 정보들을 mik3y/usb-serial-for-android 에 맞게 세팅 하겠습니다. <br>

CustomProber 생성
```kotlin
object CustomProber {

    fun getCustomProber(): UsbSerialProber {
        var customTable: ProbeTable = ProbeTable()
        customTable.addProduct(7851, 7430, CdcAcmSerialDriver::class.java)
        return UsbSerialProber(customTable)
    }
}
```
.addProduct(vendorid, productid, CdcAcmSerialDriver::class.java) <br>
먼저 vendor-id, product-id 값을 등록하여 연결할 기기를 ProbeTable 형식으로 추가 하여 getCustomProber() 호출시 해당 기기를 불러옵니다.<br>


MainActivity 세팅
```kotlin
    fun openDevice(device: UsbDevice) {
        Log.d("chan9u", "openDevice >> $device")
        mDevice = device

        var usbDriver = UsbSerialProber.getDefaultProber().probeDevice(mDevice)
        if (usbDriver == null) {
            usbDriver = CustomProber.getCustomProber().probeDevice(mDevice)
        }

        usbSerialPort = usbDriver.ports.get(0)
        usbDeviceConnection = usbManager.openDevice(usbDriver.device)

        usbSerialPort?.open(usbDeviceConnection)
        usbSerialPort?.setParameters(9600, 8, UsbSerialPort.STOPBITS_1, UsbSerialPort.PARITY_NONE)
        serialInputOutputManager = SerialInputOutputManager(usbSerialPort, this)
        Executors.newSingleThreadExecutor().submit(serialInputOutputManager)
    }
```
위에서 usbSerialPort?.setParameters(9600, 8, UsbSerialPort.STOPBITS_1, UsbSerialPort.PARITY_NONE) 이부분이 중요합니다. <br>
순서대로 하드웨어 기기의 baudRate, dataBits, stopBits, parity 정보입니다.<br>
이 부분은 하드웨어 기기의 메뉴얼 또는 해당 제품 홈페이지를 찾아보시면 얻을 수 있습니다.<br>

MainActivity 추가
```kotlin
class MainActivity : BaseActivity<ActivityMainBinding>(), SerialInputOutputManager.Listener {

    override fun onRunError(e: Exception?) {
        Log.d("chan9u", "onRunError >> ${e?.message}")
    }

    override fun onNewData(data: ByteArray?) {
        data?.let {
            handler.post {
                runOnUiThread {
                    receiver(data)
                }
            }
        }
    }
}

```
SerialInputOutputManager.Listener 인터페이스를 상속 받아 onRunError, onNewData 두 메소드를 오버라이드 받습니다.<br>
onRunError 부분은 시리얼 통신 도중 에러가 발생했을시 호출되고,<br>
onNewData 이 부분은 시리얼 통신결과 값을 ByteArray 형식으로 받아옵니다.<br>
결과적으로 시리얼 통신이 잘 연결되었다면 onNewData() 메소드를 통하여 QR코드 스캔 값을 받을 수 있었습니다.

```kotlin
    /**
     * QR 데이터 처리
     */
    fun receiver(array: ByteArray) {
        if (array.size > 0 && !isSendQR) {
            val qrStr = String(array, StandardCharsets.UTF_8)
            isSendQR = true
            sendQR(qrStr)
        }
    }
```


## 4. 끝으로...

QR 스캔 하드웨어 기기와 안드로이드 연결에 엄청 고생을 했었는데요... <br>
좋은 정보를 제공해 주셔서 감사합니다. Thank You mik3y =) <br>
Click [here](https://github.com/mik3y/usb-serial-for-android?utm_source=android-arsenal.com&utm_medium=referral&utm_campaign=512){: target="_blank"} <br>
<br>
<br>
['kyuchanE' Android 개발자](https://github.com/kyuchanE)
