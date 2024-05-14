import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          setUser(JSON.parse(userProfile));
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  const saveUserProfile = async (profile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setUser(profile);
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      setUser(null);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ user, saveUserProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
