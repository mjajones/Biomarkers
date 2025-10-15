# Biomarker Tracker (Expo React Native)

Cross-platform iOS/Android app to record and visualize health biomarkers.

## Features
- Bottom tabs: Home, Metrics
- Add entries with biomarker search (common set now; extensible), units, date/time, location, notes
- Filter entries by date presets: Today, Week, Last 3 Months, Last 6 Months, Last Year
- SQLite local storage via expo-sqlite
- Charts per biomarker (Victory)

## Getting Started

Prerequisites: Node 18+, npm, Android Studio or Xcode (or use Expo Go app).

Install dependencies:
```bash
npm install
```

Run the app:
```bash
npm run android   # Android emulator/device
npm run ios       # iOS simulator (macOS) or use Expo Go
npm run web       # Web (limited features)
```

## Project Structure
- `App.tsx`: root, navigation setup
- `src/navigation/`: root and metrics stacks
- `src/screens/`: UI screens
- `src/db.ts`: SQLite schema and queries
- `src/biomarkers/`: dataset and search
- `src/types.ts`: shared types
- `src/utils/`: date range helpers

## Notes
- Expand `src/biomarkers/dataset.ts` to include more biomarkers and reference ranges.
- Add validation and unit conversions as needed.
- Data is stored locally on-device.
