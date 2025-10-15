# Health Biomarker Tracker

A comprehensive mobile application for iOS and Android that allows you to track any health biomarker available. Built with React Native and Expo.

## Features

### 🏠 Home Screen
- Overview dashboard with key statistics
- Total records count
- Today's and this week's records
- Unique biomarkers tracked
- Helpful introduction to app features

### 📊 Metrics Screen
- **Add Biomarkers**: Plus button to add any biomarker measurement
- **Autocomplete Search**: Search from 100+ predefined biomarkers (from Absolute Neutrophil Count to Zr/Creat, urine)
- **Comprehensive Data Entry**:
  - Value input with unit selection
  - Date selection
  - Location field (where measurement was taken)
  - Notes field for additional information
- **Date Range Filters**: View data by Today, Week, 3 Months, 6 Months, Year, or All time
- **Visual Graphs**: Interactive line charts showing trends over time
- **Normal Range Indicators**: Automatic detection if values are within normal ranges
- **Record Management**: View, filter, and delete biomarker records

### 🩺 Supported Biomarkers

The app includes 100+ biomarkers across categories:
- **Vital Signs**: Weight, Blood Pressure, Heart Rate, Temperature, Blood Oxygen, etc.
- **Metabolic**: Blood Glucose, HbA1c, Uric Acid, etc.
- **Hematology**: Complete Blood Count (CBC) components
- **Electrolytes**: Sodium, Potassium, Calcium, etc.
- **Kidney Function**: BUN, Creatinine, eGFR, etc.
- **Liver Function**: ALT, AST, Bilirubin, etc.
- **Lipids**: Cholesterol, LDL, HDL, Triglycerides
- **Thyroid**: TSH, T3, T4
- **Vitamins & Minerals**: Vitamin D, B12, Iron, Ferritin, etc.
- **Hormones**: Testosterone, Estradiol, Cortisol, Insulin, etc.
- **Cardiac Markers**: Troponin, BNP, etc.
- **Inflammation**: CRP, ESR
- **Coagulation**: PT, INR, PTT, etc.
- **Urinalysis**: pH, Protein, Glucose, various ratios
- **Tumor Markers**: PSA, CEA, CA 125, etc.
- And many more!

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- For iOS: macOS with Xcode
- For Android: Android Studio

### Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd /workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal (for testing purposes)

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Project Structure

```
/workspace
├── App.js                          # Main app entry point with navigation
├── package.json                    # Dependencies and scripts
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Home dashboard
│   │   └── MetricsScreen.js       # Metrics tracking screen
│   ├── components/
│   │   ├── AddBiomarkerModal.js   # Modal for adding biomarkers
│   │   ├── BiomarkerChart.js      # Chart component for trends
│   │   └── BiomarkerList.js       # List component for records
│   ├── context/
│   │   └── BiomarkerContext.js    # Global state management
│   └── data/
│       └── biomarkers.js          # Comprehensive biomarker database
└── README.md
```

## Usage Guide

### Adding a Biomarker
1. Navigate to the **Metrics** tab
2. Tap the **+** (plus) button
3. Search for your biomarker or start typing to see suggestions
4. Enter the value
5. Select the appropriate unit
6. Choose the date
7. Optionally add location and notes
8. Tap **Save Biomarker**

### Viewing Trends
1. Go to the **Metrics** tab
2. Select a date range filter (Today, Week, 3 Months, etc.)
3. In the "Biomarker Trends" section, tap on a biomarker name
4. View the interactive chart showing values over time
5. See statistics including latest value, average, and trend direction

### Understanding Normal Ranges
- When adding a biomarker, if the value falls outside the normal range, you'll see a warning indicator
- In the records list, each entry shows whether it's in the normal range
- Charts display the normal range for reference

## Data Storage

All biomarker data is stored locally on your device using AsyncStorage. Your health data never leaves your device.

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **React Navigation**: Navigation framework
- **React Native Paper**: Material Design components
- **React Native Chart Kit**: Chart visualization
- **AsyncStorage**: Local data persistence

## Privacy

This app stores all data locally on your device. No data is transmitted to any server or third party.

## Future Enhancements

Potential features for future versions:
- Export data to CSV/PDF
- Data backup and restore
- Medication tracking
- Reminders for measurements
- Integration with health devices (Apple Health, Google Fit)
- Multiple user profiles
- Dark mode

## Support

For issues or questions, please open an issue on the project repository.

## License

MIT License - feel free to use and modify as needed.

---

**Note**: This app is for personal health tracking purposes. Always consult with healthcare professionals for medical advice and interpretation of biomarker values.
