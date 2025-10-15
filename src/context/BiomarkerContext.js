import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BiomarkerContext = createContext();

export const BiomarkerProvider = ({ children }) => {
  const [biomarkerRecords, setBiomarkerRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBiomarkerRecords();
  }, []);

  const loadBiomarkerRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('biomarkerRecords');
      if (storedRecords) {
        setBiomarkerRecords(JSON.parse(storedRecords));
      }
    } catch (error) {
      console.error('Error loading biomarker records:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBiomarkerRecords = async (records) => {
    try {
      await AsyncStorage.setItem('biomarkerRecords', JSON.stringify(records));
    } catch (error) {
      console.error('Error saving biomarker records:', error);
    }
  };

  const addBiomarkerRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedRecords = [...biomarkerRecords, newRecord];
    setBiomarkerRecords(updatedRecords);
    saveBiomarkerRecords(updatedRecords);
  };

  const deleteBiomarkerRecord = (id) => {
    const updatedRecords = biomarkerRecords.filter(record => record.id !== id);
    setBiomarkerRecords(updatedRecords);
    saveBiomarkerRecords(updatedRecords);
  };

  const updateBiomarkerRecord = (id, updatedData) => {
    const updatedRecords = biomarkerRecords.map(record =>
      record.id === id ? { ...record, ...updatedData } : record
    );
    setBiomarkerRecords(updatedRecords);
    saveBiomarkerRecords(updatedRecords);
  };

  return (
    <BiomarkerContext.Provider
      value={{
        biomarkerRecords,
        loading,
        addBiomarkerRecord,
        deleteBiomarkerRecord,
        updateBiomarkerRecord,
      }}
    >
      {children}
    </BiomarkerContext.Provider>
  );
};
