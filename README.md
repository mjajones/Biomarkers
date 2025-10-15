import React, { useState, useEffect, useRef } from 'react';

// --- Mock Data for Initial State ---
const MOCK_BIOMETRICS = [
  { id: '1', type: 'Weight', value: '185', unit: 'lbs', date: new Date().toISOString() },
  { id: '2', type: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', type: 'Total Cholesterol', value: '190', unit: 'mg/dL', date: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', type: 'Resting Heart Rate', value: '65', unit: 'bpm', date: new Date(Date.now() - 259200000).toISOString() },
];

// --- Predefined list for autocomplete ---
const BIOMETRIC_SUGGESTIONS = [
    { name: 'Weight', unit: 'lbs' },
    { name: 'Height', unit: 'in' },
    { name: 'BMI', unit: '' },
    { name: 'Body Fat Percentage', unit: '%' },
    { name: 'Systolic Blood Pressure', unit: 'mmHg' },
    { name: 'Diastolic Blood Pressure', unit: 'mmHg' },
    { name: 'Resting Heart Rate', unit: 'bpm' },
    { name: 'Blood Glucose (Fasting)', unit: 'mg/dL' },
    { name: 'Blood Glucose (Post-Meal)', unit: 'mg/dL' },
    { name: 'Total Cholesterol', unit: 'mg/dL' },
    { name: 'LDL Cholesterol', unit: 'mg/dL' },
    { name: 'HDL Cholesterol', unit: 'mg/dL' },
    { name: 'Triglycerides', unit: 'mg/dL' },
    { name: 'A1c', unit: '%' },
    { name: 'Temperature', unit: '°F' },
    { name: 'Oxygen Saturation (SpO2)', unit: '%' },
    { name: 'White Blood Cell Count', unit: 'K/uL' },
    { name: 'Red Blood Cell Count', unit: 'M/uL' },
    { name: 'Hemoglobin', unit: 'g/dL' },
    { name: 'Hematocrit', unit: '%' },
];


// --- Helper Functions & Icons for Web ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString);
  // Add timezone offset to display local time correctly from ISO string
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString(undefined, options);
};

const CameraIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 10a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M2.25 4.5A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 19.5v-15zm3.25-1a.75.75 0 00-.75.75v.5a.75.75 0 00.75.75h.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75h-.5zM6 9a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V9z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
  </svg>
);


// --- Main App Component ---
export default function App() {
  const [biometrics, setBiometrics] = useState(MOCK_BIOMETRICS);
  const [modalVisible, setModalVisible] = useState(false);
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const [newItem, setNewItem] = useState({ type: '', value: '', unit: '', date: getTodayString() });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleAddNewItem = () => {
    if (newItem.type && newItem.value && newItem.date) {
      const newEntry = {
        id: Math.random().toString(),
        type: newItem.type,
        value: newItem.value,
        unit: newItem.unit,
        date: new Date(newItem.date).toISOString(),
      };
      setBiometrics(prev => [newEntry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
      setNewItem({ type: '', value: '', unit: '', date: getTodayString() });
      setModalVisible(false);
      setErrorMessage('');
    } else {
        setErrorMessage('Type, Value, and Date are required.');
        setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleImageScan = async () => {
    setIsLoading(true);
    setErrorMessage('');
    console.log("Simulating API call to process image...");
    
    setTimeout(() => {
        try {
            const mockApiResponseText = `[
              {"type": "Systolic Blood Pressure", "value": "122", "unit": "mmHg"},
              {"type": "Diastolic Blood Pressure", "value": "78", "unit": "mmHg"},
              {"type": "Resting Heart Rate", "value": "68", "unit": "bpm"}
            ]`;

            const scannedData = JSON.parse(mockApiResponseText);
            const newEntries = scannedData.map(item => ({
                ...item,
                id: Math.random().toString(),
                date: new Date().toISOString(),
            }));

            setBiometrics(prev => [...newEntries, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (error) {
            console.error("Error parsing scanned data:", error);
            setErrorMessage('Could not parse the scanned data.');
            setTimeout(() => setErrorMessage(''), 3000);
        }
        setIsLoading(false);
    }, 2000);
  };

  const handleTypeChange = (text) => {
    setNewItem({...newItem, type: text});
    if(text) {
        const filteredSuggestions = BIOMETRIC_SUGGESTIONS.filter(suggestion => 
            suggestion.name.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    } else {
        setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewItem({...newItem, type: suggestion.name, unit: suggestion.unit });
    setSuggestions([]);
  };

  const BiometricItem = ({ item }) => (
    <div className="bg-gray-800 rounded-xl p-4 mb-3 shadow-lg transition-transform hover:scale-105">
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold text-gray-50">{item.type}</p>
        <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
      </div>
      <div className="flex items-baseline">
        <p className="text-4xl font-bold text-emerald-400 mr-2">{item.value}</p>
        <p className="text-base text-gray-300">{item.unit}</p>
      </div>
    </div>
  );

  return (
    <main className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl p-4">
        <header className="py-5 border-b border-gray-700 mb-6">
          <h1 className="text-3xl font-bold text-white text-center">BioMetrics Tracker</h1>
        </header>
        
        {errorMessage && (
            <div className="bg-red-800/50 text-red-300 p-3 rounded-lg text-center mb-4">
                {errorMessage}
            </div>
        )}

        <div className="pb-24">
          {biometrics.length > 0 ? (
            biometrics.map(item => <BiometricItem key={item.id} item={item} />)
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-gray-400">No data yet.</p>
              <p className="text-gray-500 mt-2">Tap '+' or the camera to add your first entry.</p>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
             <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
             <p className="text-white mt-4 text-lg">Scanning Document...</p>
          </div>
        )}

        <div className="fixed bottom-6 right-6 flex items-center">
          <button onClick={handleImageScan} disabled={isLoading} className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg mx-2 transition-transform active:scale-90 disabled:opacity-50">
            <CameraIcon className="w-8 h-8 text-white" />
          </button>
          <button onClick={() => setModalVisible(true)} disabled={isLoading} className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg mx-2 transition-transform active:scale-90 disabled:opacity-50">
            <PlusIcon className="w-8 h-8 text-white" />
          </button>
        </div>

        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-2xl m-4">
              <h2 className="text-2xl font-bold text-white mb-5 text-center">Add New Biometric</h2>
              <div className="relative w-full mb-3">
                <input
                  className="bg-gray-700 text-white rounded-lg p-3 w-full text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Type (e.g., Weight)"
                  value={newItem.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  onFocus={(e) => handleTypeChange(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-gray-700 border border-gray-600 rounded-lg z-50 max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => handleSuggestionClick(suggestion)} className="p-3 text-white hover:bg-gray-600 cursor-pointer">
                                {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
              </div>
              <input
                className="bg-gray-700 text-white rounded-lg p-3 w-full mb-3 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Value (e.g., 185)"
                type="text" 
                inputMode="decimal"
                value={newItem.value}
                onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
              />
              <input
                className="bg-gray-700 text-white rounded-lg p-3 w-full mb-4 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Unit (e.g., lbs)"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              />
               <input
                className="bg-gray-700 text-white rounded-lg p-3 w-full mb-4 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              />
              <div className="flex justify-between w-full mt-2 space-x-3">
                <button onClick={() => { setModalVisible(false); setSuggestions([]); }} className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-bold transition-colors">
                  Cancel
                </button>
                <button onClick={handleAddNewItem} className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
