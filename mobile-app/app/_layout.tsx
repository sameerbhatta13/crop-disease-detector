
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '@/src/store/store'
import { Platform, StatusBar as RNStatusBar, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

// const STATUSBAR_HEIGHT = Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 10 : 10

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>

          {/* Background behind status bar */}
          {/* <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: 'red' }} /> */}


          {/* Transparent status bar with dark style */}
          <StatusBar translucent style="dark" />
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(auth)' options={{
              headerShown: false
            }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  )
}

export default RootLayout

// const styles = StyleSheet.create({})