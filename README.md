markdown# SimpleClockApp ⏰

A sleek, responsive, and cross-platform multi-feature clock application built with **React Native** and **Expo**. Runs seamlessly on Android, iOS, and Web with local persistence and dark mode support.

---

## ✨ Features

- 🕒 **Dual Clock Modes**: Toggle between an interactive **Digital Clock** and an animated **Analog Clock**.
- ⏱️ **Stopwatch**: High-precision stopwatch supporting millisecond tracking and split lap recording.
- ⏳ **Timer**: Countdown timer with quick-add interval presets (+1m, +5m, +10m, +15m) and completion alerts.
- 🔔 **Alarm**: Configurable multi-alarm manager with toggle controls and real-time triggers.
- ⚙️ **Settings & Customization**:
  - 12-hour / 24-hour time format toggle
  - Show / hide seconds display
  - Dark mode and light mode themes
  - Persistent state storage using `@react-native-async-storage/async-storage`
- 📱 **Cross-Platform Distribution**:
  - Native **Android APK** generation via Expo Application Services (EAS)
  - Installable **Progressive Web App (PWA)** for iOS and desktop (Safari / Chrome "Add to Home Screen")

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) / [Expo SDK](https://expo.dev/)
- **Web Support**: `react-native-web`
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Persistence**: `@react-native-async-storage/async-storage`
- **Hosting / CI/CD**: DigitalOcean App Platform & EAS Build

---

## 📂 Project Structure

```text
SimpleClockApp/
├── assets/                 # App icons, splash screens, and favicons
├── components/
│   ├── AlarmScreen.js      # Alarm management and alert triggers
│   ├── AnalogClock.js     # Analog clock face with rotating hands
│   ├── DigitalClock.js    # Digital time and date display
│   ├── SettingsScreen.js  # Theme, layout, and time format controls
│   ├── Stopwatch.js       # Stopwatch logic and lap tracker
│   └── TimerScreen.js     # Countdown timer with quick presets
├── App.js                 # Main navigation and state management
├── app.json               # Expo and web manifest configuration
├── eas.json               # EAS build profile configurations
└── package.json

```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn
* Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/vanshikasraw511/SimpleClockApp.git](https://github.com/vanshikasraw511/SimpleClockApp.git)
cd SimpleClockApp

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the local server:**
```bash
npx expo start

```



### Running the App

* **Web Browser**: Press `w` in your terminal to open `http://localhost:8081`.
* **Mobile Device**: Scan the QR code in the terminal using the **Expo Go** app on Android or the Camera app on iOS.

---

## 📦 Deployment & Builds

### Android Standalone APK (via EAS)

```bash
npx eas-cli build --platform android --profile preview

```

### Static Web Export (for DigitalOcean App Platform)

```bash
npx expo export --platform web

```

The production-ready static assets will be generated in the `dist/` directory.

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
