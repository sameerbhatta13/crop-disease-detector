import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-6" edges={['top']}>
      <StatusBar style="dark" />
      <View className="flex-1 justify-center">
        <Text className="text-2xl font-bold text-green-700 mb-8 text-center">Login Your Account</Text>
        <TextInput
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholderTextColor="#888"
        />

        <TouchableOpacity className="bg-green-600 py-3 rounded-lg">
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
