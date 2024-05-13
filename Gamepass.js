import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Gamepass = ({ onPurchase }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Passes</Text>
      <View style={styles.passContainer}>
        <Text style={styles.passTitle}>Free Pass</Text>
        <Text style={styles.passDescription}>Unlock additional features for free!</Text>
        <Button title="Get Free Pass" onPress={() => onPurchase('free')} />
      </View>
      <View style={styles.passContainer}>
        <Text style={styles.passTitle}>Premium Pass</Text>
        <Text style={styles.passDescription}>Unlock exclusive content for $4.99!</Text>
        <Button title="Purchase Premium Pass" onPress={() => onPurchase('premium')} />
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
});

export default Gamepass;
