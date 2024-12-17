// src/context/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import { languages } from '../data/LanguageData';


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  // LocalStorage থেকে ভাষা ডিফল্ট হিসেবে সেট করা
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // ভাষা পরিবর্তন হলে LocalStorage-এ সেট করা
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return <LanguageContext.Provider value={{ language, changeLanguage, translations: languages[language] }}>{children}</LanguageContext.Provider>;
};

export default LanguageContext;
