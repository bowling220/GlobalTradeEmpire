import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';


const HomeScreen = ({ navigation }) => {
  const [resources, setResources] = useState(0);
  const [clickProduction, setClickProduction] = useState(1);
  const [tradeRoutes, setTradeRoutes] = useState([
    { id: 1, name: 'Route 1', production: 1, cost: 50, level: 1 },
    { id: 2, name: 'Route 2', production: 2, cost: 100, level: 1 },
  ]);
  const [tradePostLevel, setTradePostLevel] = useState(1);
  const [tradePostCost, setTradePostCost] = useState(500);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerXP, setPlayerXP] = useState(0);
  const [playerRank, setPlayerRank] = useState('Bronze');
  const [showQuests, setShowQuests] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [prestigeAvailable, setPrestigeAvailable] = useState(false);

  
  useEffect(() => {
    const currentTime = new Date().getTime();
    AsyncStorage.getItem('offlineTime').then((offlineTime) => {
      if (offlineTime) {
        const offlineDuration = currentTime - parseInt(offlineTime, 10);

        let totalProduction = 0;
        tradeRoutes.forEach(route => {
          totalProduction += route.production * route.level;
        });

        const productionPerSecond = totalProduction * (1 + 0.2 * tradePostLevel);
        const offlineProduction = offlineDuration / 1000 * productionPerSecond;

        setResources(offlineProduction); // Set resources based on offline production
      }

      // Update offline time in storage
      AsyncStorage.setItem('offlineTime', currentTime.toString());
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let totalProduction = 0;
      tradeRoutes.forEach(route => {
        totalProduction += route.production * route.level;
      });
      setResources(resources => resources + totalProduction);
    }, 1000);

    return () => clearInterval(interval);
  }, [tradeRoutes]);

  useEffect(() => {
    if (playerXP >= 50 * playerLevel && playerLevel < 200) {
      const remainingXP = playerXP - 50 * playerLevel;
      setPlayerLevel(playerLevel + 1);
      setPlayerXP(remainingXP < 0 ? 0 : remainingXP);

      // Calculate the rank and tier
      let rankNumber = Math.ceil(playerLevel / 10);
      let tierNumber = Math.ceil((playerLevel % 10) / 3);
      let rankName, tierName;

      // Set rank name based on rankNumber
      switch (rankNumber) {
        case 1:
          rankName = "Novice";
          break;
        case 2:
          rankName = "Apprentice";
          break;
        case 3:
          rankName = "Journeyman";
          break;
        case 4:
          rankName = "Expert";
          break;
        case 5:
          rankName = "Master";
          break;
        case 6:
          rankName = "Elite";
          break;
        case 7:
          rankName = "Champion";
          break;
        case 8:
          rankName = "Grandmaster";
          break;
        case 9:
          rankName = "Legend";
          break;
        case 10:
          rankName = "Mythic";
          break;
        case 11:
          rankName = "Celestial";
          break;
        case 12:
          rankName = "Divine";
          break;
        case 13:
          rankName = "Eternal";
          break;
        case 14:
          rankName = "Supreme";
          break;
        case 15:
          rankName = "Sovereign";
          break;
        case 16:
          rankName = "Ascendant";
          break;
        case 17:
          rankName = "Transcendent";
          break;
        case 18:
          rankName = "Immortal";
          break;
        case 19:
          rankName = "Godlike";
          break;
        case 20:
          rankName = "Omega";
          break;
        default:
          rankName = "";
      }

      // Set tier name based on tierNumber
      switch (tierNumber) {
        case 1:
          tierName = "I";
          break;
        case 2:
          tierName = "II";
          break;
        case 3:
          tierName = "III";
          break;
        default:
          tierName = "";
      }

      // Set the player rank
      setPlayerRank(`${rankName} ${tierName}`);
    }
  }, [playerXP, playerLevel]);

  useEffect(() => {
    if (playerLevel >= 200) {
      setPrestigeAvailable(true);
    }
  }, [playerLevel]);

  const handlePrestige = () => {
    setResources(resources * 2);
    setPlayerLevel(1);
    setPlayerXP(0);
    setPlayerRank('Bronze');
    setClickProduction(clickProduction * 2);
    const updatedTradeRoutes = tradeRoutes.map(route => ({
      ...route,
      production: route.production * 2,
      cost: route.cost * 2,
      level: 1
    }));
    setTradeRoutes(updatedTradeRoutes);
    setTradePostLevel(1);
    setTradePostCost(tradePostCost * 2);
    setPrestigeAvailable(false);
  };

  const globalEvents = [
    { name: "Economic Boom", effect: () => { /* Implement economic boom effect */ } },
    { name: "Natural Disaster", effect: () => { /* Implement natural disaster effect */ } },
    // Add more global events as needed
  ];

  const triggerGlobalEvent = () => {
    const randomEvent = globalEvents[Math.floor(Math.random() * globalEvents.length)];
    randomEvent.effect();
  };

  useEffect(() => {
    const eventInterval = setInterval(() => {
      triggerGlobalEvent();
    }, 500); // Trigger an event every 60 seconds (adjust interval as needed)

    return () => clearInterval(eventInterval);
  }, []);

  const saveGameState = async () => {
    try {
      const gameState = {
        resources,
        playerLevel,
        tradeRoutes,
        playerRank,
        playerXP,
        clickProduction
      };
      await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  };

  const loadGameState = async () => {
    try {
      const gameState = await AsyncStorage.getItem('gameState');
      if (gameState) {
        const parsedGameState = JSON.parse(gameState);
        setResources(parsedGameState.resources);
        setPlayerLevel(parsedGameState.playerLevel);
        setTradeRoutes(parsedGameState.tradeRoutes);
        setPlayerRank(parsedGameState.playerRank); // Set playerRank from parsedGameState
        setPlayerXP(parsedGameState.playerXP); // Set playerXP from parsedGameState
        setClickProduction(parsedGameState.clickProduction); // Set clickProduction from parsedGameState
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  };

  useEffect(() => {
    loadGameState();
  }, []);

  useEffect(() => {
    saveGameState();
  }, [resources, playerLevel, tradeRoutes, playerXP, playerRank]);

  useEffect(() => {
    const productionMultiplier = 1 + 0.2 * tradePostLevel;
    const interval = setInterval(() => {
      let totalProduction = 0;
      tradeRoutes.forEach(route => {
        totalProduction += route.production * route.level;
      });
      setResources(resources => resources + totalProduction * productionMultiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [tradeRoutes, tradePostLevel]);

  const handleBuyRoute = (id, cost) => {
    if (resources >= cost) {
      setResources(resources - cost);
      const updatedRoutes = tradeRoutes.map(route =>
        route.id === id ? { ...route, level: route.level + 1 } : route
      );
      setTradeRoutes(updatedRoutes);
      setPlayerXP(playerXP + 10000);
    }
  };

  const handleUpgradeTradePost = () => {
    if (resources >= tradePostCost) {
      setResources(resources - tradePostCost);
      setTradePostLevel(tradePostLevel + 1);
      setTradePostCost(tradePostCost * 2);
      setPlayerXP(playerXP + 5000);
    }
  };

  const handleTap = () => {
    setResources(resources + clickProduction);
  };

  const handleUpgradeTap = () => {
    if (resources >= 100) {
      setResources(resources - 100);
      setClickProduction(clickProduction + 1);
      setPlayerXP(playerXP + 10000);
    }
  };

  const Quests = () => {
    const handleCompleteQuest = (xpReward) => {
      setPlayerXP(playerXP + xpReward);
    };

    return (
      <View>
        <Text>Quests:</Text>
        {playerLevel >= 5 && (
          <>
            <TouchableOpacity onPress={() => handleCompleteQuest(200)}>
              <Text>Complete Quest 1 (Level 5 required)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCompleteQuest(300)}>
              <Text>Complete Quest 2 (Level 5 required)</Text>
            </TouchableOpacity>
          </>
        )}
        {playerLevel >= 10 && (
          <>
            <TouchableOpacity onPress={() => handleCompleteQuest(400)}>
              <Text>Complete Quest 3 (Level 10 required)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCompleteQuest(500)}>
              <Text>Complete Quest 4 (Level 10 required)</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const Achievements = () => {
    const achievements = [];
    for (let i = 1; i <= 20; i++) {
      achievements.push({ id: i, name: `Level ${i * 10} Acquired`, requiredLevel: i * 10, reward: 'XP' });
    }

    return (
      <View>
        <Text>Achievements:</Text>
        {achievements.map(achievement => (
          playerLevel >= achievement.requiredLevel && (
            <Text key={achievement.id}>{achievement.name}</Text>
          )
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Global Trade Empire</Text>
        <Text>Level: {playerLevel}</Text>
        <Text>Rank: {playerRank}</Text>
        <Text>XP: {playerXP} / {50 * playerLevel}</Text>
        <Text>Resources: {Math.round(resources * 10) / 10}</Text>
        <TouchableOpacity style={styles.clickArea} onPress={handleTap}>
          <Text>Tap to Collect Resources</Text>
          <Text>Click Production: {clickProduction}</Text>
        </TouchableOpacity>
        <Button
          title={`Upgrade Click Production - Cost: 100`}
          onPress={handleUpgradeTap}
          disabled={resources < 100}
        />
         <Button title="GamePass" onPress={() => navigation.navigate('Gamepass')} />
        <Button
          title={`Upgrade Trade Post (Level ${tradePostLevel}) - Cost: ${tradePostCost}`}
          onPress={handleUpgradeTradePost}

          disabled={resources < tradePostCost}
        />
        {tradeRoutes.map(route => (
          <View key={route.id} style={styles.routeContainer}>
            <Text>{route.name} - Level {route.level}</Text>
            <Text>Production: {route.production * route.level} per second</Text>
            <Button
              title={`Upgrade ${route.name} - Cost: ${route.cost}`}
              onPress={() => handleBuyRoute(route.id, route.cost)}
              disabled={resources < route.cost}
            />
          </View>
        ))}
        <Button title="Toggle Quests" onPress={() => setShowQuests(!showQuests)} />
        {showQuests && <Quests />}
        <Button title="Prestige (Level 200)" onPress={handlePrestige} />
        <Button title="Toggle Achievements" onPress={() => setShowAchievements(!showAchievements)} />
        {showAchievements && <Achievements />}
        <Button title="Share Achievement" onPress={() => shareAchievement(playerLevel)} />
        <Button title="Invite Friends" onPress={inviteFriends} />
        <Button title='Reset Progress(No Reward ClearWipe)' onPress={() => ClearWipe(setResources, setClickProduction, setTradeRoutes, setTradePostLevel, setTradePostCost, setPlayerLevel, setPlayerXP, setPlayerRank, setPrestigeAvailable, setShowQuests, setShowAchievements)} />
      </View>
    </ScrollView>
  );
};

const ClearWipe = async (setResources, setClickProduction, setTradeRoutes, setTradePostLevel, setTradePostCost, setPlayerLevel, setPlayerXP, setPlayerRank, setPrestigeAvailable, setShowQuests, setShowAchievements) => {
  try {
    await AsyncStorage.clear();
    setResources(0);
    setClickProduction(1);
    setTradeRoutes([
      { id: 1, name: 'Route 1', production: 1, cost: 50, level: 1 },
      { id: 2, name: 'Route 2', production: 2, cost: 100, level: 1 },
    ]);
    setTradePostLevel(1);
    setTradePostCost(500);
    setPlayerLevel(1);
    setPlayerXP(0);
    setPlayerRank('Bronze');
    setPrestigeAvailable(false);
    setShowQuests(false);
    setShowAchievements(false);
  } catch (error) {
    AsyncStorage.clear()
  }
};

const shareAchievement = async (currentLevel) => {
  try {
    await Share.share({
      message: `🏆 I just reached level ${currentLevel} in Global Trade Empire! 🚀`,
    });
  } catch (error) {
    console.error('Failed to share achievement:', error);
  }
};

const inviteFriends = async () => {
  try {
    await Share.share({
      message: '🤝 Join me in playing Global Trade Empire! Download the app from exp://_hfj64g-blaineoler-8081.exp.direct.',
    });
  } catch (error) {
    console.error('Failed to invite friends:', error);
  }
};



const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  clickArea: {
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  routeContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
});


export default HomeScreen;
