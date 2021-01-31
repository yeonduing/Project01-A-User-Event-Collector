# **_Team DIVE introduction_**

![](https://i.imgur.com/zG4Nagk.png)
| J124 | J153 | J190 | S002 | S015 |
| ----- | ----- | ----- | ----- |----- |
| 유선규[(sunkest)](https://github.com/sunkest) | 이유택[(lcpnine)](https://github.com/lcpnine) | 조병건[(marulloc)](https://github.com/marulloc) | 강병민[(mike123789-dev)](https://github.com/mike123789-dev) | 류연수[(yeonduing)](https://github.com/yeonduing) |

[Link to iOS Dev Logs](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector#ios-dev-logs)

# **_Project introduction_**

다양한 프로젝트에서 독립적으로 적용 가능한 ***User Event Collecto*r** 제작

> **User Event ?** UI/UX 개선 등을 위해 수집하는 Event

<br>

### 우리의 이벤트 수집기 "**_DIVE_**"

프로젝트 마다 **_의미 있는 이벤트_**는 다를 것 입니다.
**_DIVE_**는 자유도 높게 설계되어, **_의미 있는 이벤트_**의 범주를 개발자가 정할 수 있습니다.

즉, 개발자가 원한다면, 기본적으로 제공되는 이벤트 뿐만 아니라
웹의 경우, 단일 이벤트 여러개로 이루어진 *복합 이벤트*를 수집하거나,
앱의 경우, 앱을 종료하거나 노래를 재생하는 이벤트들을 수집할 수 있습니다.

**_DIVE_**를 이용하여, 원하는 이벤트를 수집할 수 있으며,
수집한 데이터는 UI/UX 개선에 중요한 데이터가 될 것입니다.

 <br>
 
 ***DIVE***의 동작을 보이기 위하여, Naver 스트리밍 서비스 ***VIBE***를 ***Clone***하여 이벤트를 수집했습니다.
 Clone scope에서 VIBE의 추천 기능과 음원 재생 기능은 제외

[Link to Web DIVE ReadMe](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector#web-event-collector)

[Link to iOS DIVE ReadMe](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector#ios-event-collector)

<br>
<br>

# **_Technology Stack_**

![스크린샷(163)](https://user-images.githubusercontent.com/48251136/101978886-d8cf6500-3c9b-11eb-9be1-d74fd7761dcc.png)

<br>
<br>

# Vibe Clone

## Today / Playlist / Magazine

<img width="280" alt="Today" src="https://user-images.githubusercontent.com/60538517/102685524-adf98980-4224-11eb-8ca3-d13d6acf93b3.gif"> &emsp; &emsp; <img width="280" alt="Favorite" src="https://user-images.githubusercontent.com/60538517/102685499-7e4a8180-4224-11eb-92df-fe459704a1ce.gif"> &emsp; &emsp; <img width="280" alt="Magazine" src="https://user-images.githubusercontent.com/60538517/102685555-eef19e00-4224-11eb-93ec-06f1fc2ec66e.gif">

## Chart / Search / Library

<img width="280" alt="Chart" src="https://user-images.githubusercontent.com/60538517/102685567-19dbf200-4225-11eb-8ecf-24aec93ea0d6.gif"> &emsp; &emsp; <img width="280" alt="Search" src="https://user-images.githubusercontent.com/60538517/102685617-61fb1480-4225-11eb-97d1-8bd7c412286c.gif"> &emsp; &emsp; <img width="280" alt="Library" src="https://user-images.githubusercontent.com/60538517/102685644-8e169580-4225-11eb-9720-fa9eda2fcc73.gif">

## NowPlaying

<img width="280" alt="NowPlaying" src="https://user-images.githubusercontent.com/60538517/102685667-b1d9db80-4225-11eb-9b30-243a2b4abad6.gif">

# **_iOS Event Collector_**

<br>

# 구성요소

1. Event
   - Event Collector에서 제공하는 모든 **이벤트**.
   - `Event` 프로토콜 채택
2. EventManager
   - 이벤트를 로깅하기 위한 최상단 API, 실제로 로깅을하지는 않고,
   - `EventEngine`을 이용하여 보냄.
3. EventEngine
   - 직접적으로 로깅 전송/저장을 담당.
   - `EventSendable`, `EventFetchable` 프로토콜 채택

<br>

## Event

```swift
public protocol Event: Codable {
    var name: String { get }
    var createdAt: String? { get }
    var metadata: [String: String]? { get }
}

```

기본적으로 제공되는 이벤트

```swift
class BaseEvent: Event {
    var name: String
    var createdAt: String?
    var metadata: [String: String]?

    public init(name: String, createdAt: String?, metadata: [String: String]?) {
        self.name = name
        self.createdAt = createdAt
        self.metadata = metadata
    }
}
```

Event 프로토콜을 채택하는 Custom Event의 예시

```swift
struct ScreenEvent: Event {
    var name: String
    var metadata: [String: String]?

    private init(name: String, metadata: [String: String]? = nil) {
        self.name = name
        self.metadata = metadata
    }

    static let playerPushed = ScreenEvent(name: "playerPushed")

    static let playerPopped = ScreenEvent(name: "playerPopped")

}
```

## Event Engine

```swift
public protocol EventSendable: class {
    func send<T: Event>(_ event: T)
}

public protocol EventFetchable: class {
    func fetch() -> [BaseEvent]
}
public protocol EventSendableAndFetchable: EventSendable, EventFetchable {
}

```

기본적으로 제공되는 Engine

```swift
public final class MockServerEngine: EventSendable {
    public init() {

    }
    public func send<T: Event>(_ event: T) {
        print("MockServer - \(event.name)")
        event.metadata?.forEach { key, value in
            print("ㄴ \(key) : \(value)")
        }
    }
}
```

<br>

## 이벤트의 흐름

![](https://i.imgur.com/gHEZrYz.gif)

### 이벤트의 간편한 확장성

`Event` protocol로 구현함으로써, 새로운 이벤트를 추가하는것은 매우 간편해집니다.

<img width="500" alt="New Model Version" src="https://i.imgur.com/fCncpdR.gif">

### 이벤트 type checking

`Event` protocol을 채택하는 custom type의 이벤트를 구현함으로써, 원하는 이벤트에 대한 자동완성 결과를 볼수 있습니다.

### 엔진의 다양한 구현

`EventSendable`, `EventFetchable`protocol을 채택하는 엔진을 다양하게 구현할수 있습니다.
그리고 상황에 맞게 필요한 엔진을 갈아 끼우는것도 매우 쉽습니다.

<img width="550" alt="New Model Version" src="https://i.imgur.com/s13yZNi.gif">

또한, EventManager는 다수의 엔진을 가질 수도 있습니다.
실제로 [저희 앱](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector)에서는 back end server를 위한 `engine`과 core data를 위한 `engine` 두개를 구현하고 주입했습니다.

# 설치

어느 프로젝트에서도 사용 가능하도록 Swift package manager를 이용한 설치가 가능합니다.

1. Xcode 메뉴에서 File > Swift Packages > Add Package Dependency를 선택후
2. `https://github.com/mike123789-dev/DiveEventCollector` 를 입력합니다

# **_iOS Dev Logs_**

| iOS Dev Logs                                                                                                                                                                                                                                                                                                                                                       | Author |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| [노래 track list를 만들어보자! (part1: SwiftUI를 이용하여 Cell 디자인하기)](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/%EB%85%B8%EB%9E%98-track-list%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90!-(part1:-SwiftUI%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Cell-%EB%94%94%EC%9E%90%EC%9D%B8%ED%95%98%EA%B8%B0)>)     | 강병민 |
| [노래 track list를 만들어보자! (part2: List로 보여주기 및 ViewModel적용하기)](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/%EB%85%B8%EB%9E%98-track-list%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90!-(part2:-List%EB%A1%9C-%EB%B3%B4%EC%97%AC%EC%A3%BC%EA%B8%B0-%EB%B0%8F-ViewModel%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)>) | 강병민 |
| [SwiftUI에서 View와 Model Binding (part1: @State와 @Binding)](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/SwiftUI%EC%97%90%EC%84%9C-View%EC%99%80-Model-Binding-(part1:-@State%EC%99%80-@Binding)>)                                                                                                                                   | 강병민 |
| [SwiftUI에서 View와 Model Binding (part2: @StateObject, @ObservedObject, @Published)](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/SwiftUI%EC%97%90%EC%84%9C-View%EC%99%80-Model-Binding-(part2:-@StateObject,-@ObservedObject,-@Published)>)                                                                                          | 강병민 |
| [SwiftUI에서 View와 Model Binding (part3: @EnvironmentObject)](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/SwiftUI%EC%97%90%EC%84%9C-View%EC%99%80-Model-Binding-(part3:-@EnvironmentObject)>)                                                                                                                                        | 강병민 |
| [Combine을 이용힌 chaining](<https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/Combine%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%9E%8C-chaining-(feat.-SearchView)>)                                                                                                                                                                                    | 강병민 |
| [Protocol 기반의 Analytics System을 만들어보자](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/Protocol-%EA%B8%B0%EB%B0%98%EC%9D%98-Analytics-System%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)                                                                                                                              | 강병민 |
| [SwiftUI) 사용자 이벤트 수집 및 Alert로 확인](https://yeonduing.tistory.com/50)                                                                                                                                                                                                                                                                                    | 류연수 |
| [서버로 post할 때 json 형식으로 보내기](https://yeonduing.tistory.com/49)                                                                                                                                                                                                                                                                                          | 류연수 |
| [코어데이터 마이그레이션](https://yeonduing.tistory.com/48)                                                                                                                                                                                                                                                                                                        | 류연수 |
| [CoreData로 오프라인에서도 이용 가능한 앱 만들기](https://github.com/boostcamp-2020/Project01-A-User-Event-Collector/wiki/CoreData%EB%A1%9C-%EC%98%A4%ED%94%84%EB%9D%BC%EC%9D%B8%EC%97%90%EC%84%9C%EB%8F%84-%EC%9D%B4%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0)                                                                  | 류연수 |
| [SwiftUI) NavigationLink와 Memory Leak](https://yeonduing.tistory.com/47)                                                                                                                                                                                                                                                                                          | 류연수 |
| [URL로 비동기 이미지 생성하기 - Combine과 Network](https://yeonduing.tistory.com/46)                                                                                                                                                                                                                                                                               | 류연수 |
| [SwiftUI) ViewBuilder 와 guard let](https://yeonduing.tistory.com/45)                                                                                                                                                                                                                                                                                              | 류연수 |
| [SwiftUI) ObservableObject와 상속](https://yeonduing.tistory.com/44)                                                                                                                                                                                                                                                                                               | 류연수 |
| [SwiftUI) MVVM과 Combine](https://yeonduing.tistory.com/41)                                                                                                                                                                                                                                                                                                        | 류연수 |
| [SwiftUI) 다이나믹 리스트](https://yeonduing.tistory.com/40)                                                                                                                                                                                                                                                                                                       | 류연수 |

<br>
<br>
