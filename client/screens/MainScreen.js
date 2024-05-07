import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';

const MainScreen = ({ navigation }) => {
  const [resources, setResources] = useState({
    gold: 100,
    wood: 50,
    iron: 30,
  });

  const [tradeRoutes, setTradeRoutes] = useState([
    { id: 1, name: 'Route 1', city: 'City A', profitability: 0, level: 1 },
    { id: 2, name: 'Route 2', city: 'City B', profitability: 0, level: 1 },
  ]);

  const [tradingPostLevel, setTradingPostLevel] = useState(1);

  const animatedColors = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const loadResources = async () => {
      try {
        const savedResources = await AsyncStorage.getItem('resources');
        if (savedResources) {
          setResources(JSON.parse(savedResources));
        }
      } catch (error) {
        console.error('Failed to load resources from AsyncStorage', error);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedColors, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const calculateOfflineGold = (lastOnline) => {
    const now = new Date();
    const diff = now.getTime() - new Date(lastOnline).getTime();
    const secondsPassed = Math.floor(diff / 1000);
    // Assume 1 gold per second offline
    return secondsPassed;
  };

  const handleOfflineGold = async () => {
    try {
      const lastOnline = await AsyncStorage.getItem('lastOnline');
      if (lastOnline) {
        const offlineGold = calculateOfflineGold(lastOnline);
        setResources(prevResources => ({
          ...prevResources,
          gold: prevResources.gold + offlineGold,
        }));
      }
    } catch (error) {
      console.error('Failed to handle offline gold', error);
    }
  };

  const calculateProfit = (route) => {
    const baseProfit = 10; // Base profit for the trade route
    const levelMultiplier = route.id === 1 ? 2 : 3; // Multiplier based on the trade route's level
    return baseProfit * levelMultiplier;
  };

  const interpolateColors = animatedColors.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F08080', '#20B2AA'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolateColors }]}>
      <Text style={styles.title}>Global Trade Empire</Text>
      <View style={styles.tradingPostInfo}>
        <Text style={styles.sectionTitle}>Trading Post Overview</Text>
        <Text>Blaine Oler</Text>
        <Text>Resources:</Text>
        <Text>- Gold: {resources.gold}</Text>
        <Text>- Wood: {resources.wood}</Text>
        <Text>- Iron: {resources.iron}</Text>
        {/* Add more resource information here */}
        <Text>Trading Post Level: {tradingPostLevel}</Text>
        <Text>Trade Routes:</Text>
        {tradeRoutes.map(route => (
          <Text key={route.id}>
            - {route.name}: Trade with {route.city}, Profit: {calculateProfit(route)} Gold, Level: {route.level}
          </Text>
        ))}
        {/* Add more trade route information here */}
      </View>
      <View style={styles.controls}>
        <Button title="Market" onPress={() => navigation.navigate('Market', { resources, setResources, tradeRoutes, setTradeRoutes })} />
        <TouchableOpacity style={styles.fab}>
          <MaterialIcons name="chat" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700', // Gold
  },
  tradingPostInfo: {
    marginBottom: 20,
    color: '#333', // Dark gray
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark gray
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFF8DC', // Light goldenrod yellow
  },
  fab: {
    backgroundColor: '#0000FF', // Blue
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default MainScreen;
