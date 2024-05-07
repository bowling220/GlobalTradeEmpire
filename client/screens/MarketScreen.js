import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const MarketScreen = ({ navigation, route }) => {
  const { resources, setResources, tradeRoutes, setTradeRoutes } = route.params;

  const buyResource = (resource, cost) => {
    // Check if the player has enough gold to buy the resource
    if (resources.gold >= cost) {
      // Deduct the cost from the player's gold
      setResources(prevResources => ({
        ...prevResources,
        [resource]: prevResources[resource] + 1,
        gold: prevResources.gold - cost,
      }));
    } else {
      alert('Not enough gold to buy ' + resource);
    }
  };

  const sellResource = (resource, price) => {
    // Check if the player has the resource to sell
    if (resources[resource] > 0) {
      // Increase the player's gold by the selling price
      setResources(prevResources => ({
        ...prevResources,
        [resource]: prevResources[resource] - 1,
        gold: prevResources.gold + price,
      }));
    } else {
      alert('No ' + resource + ' to sell');
    }
  };

  const upgradeTradeRoute = (routeId, cost, increase) => {
    // Check if the player has enough gold to upgrade the trade route
    if (resources.gold >= cost) {
      // Deduct the cost from the player's gold
      setResources(prevResources => ({
        ...prevResources,
        gold: prevResources.gold - cost,
      }));
      // Update the trade route's profitability and level
      setTradeRoutes(prevRoutes =>
        prevRoutes.map(route =>
          route.id === routeId
            ? { ...route, profitability: route.profitability + increase, level: route.level + 1 }
            : route
        )
      );
      alert('Trade route upgraded with increased profitability.');
    } else {
      alert('Not enough gold to upgrade the trade route.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Market</Text>
      <Text style={styles.info}>Gold: {resources.gold}</Text>
      <Text style={styles.info}>Wood: {resources.wood}</Text>
      <Text style={styles.info}>Iron: {resources.iron}</Text>
      <Text style={styles.info}>Trade Routes:</Text>
      {tradeRoutes.map(route => (
        <Text key={route.id} style={styles.info}>
          Route {route.id}: Level {route.level}, Profitability {route.profitability}
        </Text>
      ))}
      {/* Add market controls here */}
      <Button title="Buy Wood" onPress={() => buyResource('wood', 10)} />
      <Button title="Sell Wood" onPress={() => sellResource('wood', 5)} />
      <Button title="Buy Iron" onPress={() => buyResource('iron', 20)} />
      <Button title="Sell Iron" onPress={() => sellResource('iron', 10)} />
      <Button
        title="Upgrade Trade Route 1"
        onPress={() => upgradeTradeRoute(1, 50, 10)}
      />
      {/* Add more control buttons here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40, // Add vertical padding to ensure content fits
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MarketScreen;
