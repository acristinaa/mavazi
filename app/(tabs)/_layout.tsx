import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from '@/constants/Colors';

import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/build/Entypo';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.darkGreen,
          tabBarInactiveTintColor: Colors.light.lightGreen,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.mainGreen,
          },  
          headerTintColor: 'white',
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: Colors.light.mainGreen,
            },
            default: {
              backgroundColor: Colors.light.mainGreen,
            },
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Profile',
            headerTitle: 'mavazi',
            tabBarIcon: ({ focused }) => <FontAwesome name="user-circle-o" size={24} color={focused ? Colors.light.darkGreen : Colors.light.lightGreen} />,
          }}
        />
        <Tabs.Screen 
        name="swipe-page"
        options={{
          title: 'Swipe',
          headerTitle: 'swipe',
          tabBarIcon: ({ focused }) => <Entypo name="cycle" size={24} color={focused ? Colors.light.darkGreen : Colors.light.lightGreen} />,
        }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Chats',
            headerTitle: 'chats',
            tabBarIcon: ({ focused }) => <Entypo name="chat" size={24} color={focused ? Colors.light.darkGreen : Colors.light.lightGreen} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light.darkPurple,
  },
});

