import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f5f5f5',
                    paddingBottom: 20,

                    height: 70,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: 'green',
                },
                tabBarActiveTintColor: '#5f835e',
                tabBarInactiveTintColor: '#a1a1aa',
            }}
        >
            <Tabs.Screen name="register" options={{
                headerShown: false,
                headerTitle: 'Register'
            }} />
            <Tabs.Screen name="login" options={{
                headerShown: false
            }} />
        </Tabs>


    );
};

export default TabsLayout;
