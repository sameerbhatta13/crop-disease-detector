// app/(auth)/register.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Register = () => {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-1 justify-center">
                <Text className="text-2xl font-bold text-green-700 mb-8 text-center">Create Account</Text>

                <TextInput
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
                    placeholderTextColor="#888"
                />
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
                    <Text className="text-white text-center font-semibold">Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className="mt-6 mb-4" onPress={() => router.push('/(auth)/login')}>
                <Text className="text-center text-gray-600">
                    Already have an account? <Text className="text-green-700 font-medium">Login</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Register;
