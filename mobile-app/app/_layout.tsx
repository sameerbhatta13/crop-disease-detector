
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '@/src/app/store'

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{
            headerShown: false
          }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  )
}

export default RootLayout

// const styles = StyleSheet.create({})