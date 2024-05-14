import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gamepass = ({ onPurchase }) => {
  const [purchasedPass, setPurchasedPass] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('freePassPurchased').then((value) => {
      if (value === 'true') {
        setPurchasedPass('free');
      }
    });

    AsyncStorage.getItem('premiumPassPurchased').then((value) => {
      if (value === 'true') {
        setPurchasedPass('premium');
      }
    });
  }, []);

  const handlePurchase = async (passType) => {
    if (passType === 'free') {
      await AsyncStorage.setItem('freePassPurchased', 'true');
      setPurchasedPass('free');
    } else if (passType === 'premium') {
      await AsyncStorage.setItem('premiumPassPurchased', 'true');
      setPurchasedPass('premium');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Passes</Text>
      <View style={styles.passContainer}>
        <Text style={styles.passTitle}>Free Pass</Text>
        <Text style={styles.passDescription}>Unlock additional features for free!</Text>
        {purchasedPass === 'free' ? (
          <Text style={styles.purchasedText}>Purchased</Text>
        ) : (
          <Button title="Get Free Pass" onPress={() => handlePurchase('free')} />
        )}
      </View>
      <View style={styles.passContainer}>
        <Text style={styles.passTitle}>Premium Pass</Text>
        <Text style={styles.passDescription}>Unlock exclusive content for $4.99!</Text>
        {purchasedPass === 'premium' ? (
          <Text style={styles.purchasedText}>Purchased</Text>
        ) : (
          <Button title="Purchase Premium Pass" onPress={() => handlePurchase('premium')} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  passContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  passTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passDescription: {
    marginBottom: 10,
  },
  purchasedText: {
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default Gamepass;
