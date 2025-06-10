import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import '../global.css'
import { useRouter } from 'expo-router'

const index = () => {
    const router = useRouter()
    return (
        <>

            <View className='mx-10 my-10 w-fit '>
                <Text className=' bg-green-100 my-4'>hello from react native</Text>
                <TouchableOpacity className='bg-red-500 text-white w-auto rounded-lg'
                    onPress={() => router.push('/home')}>
                    <Text>click me</Text>
                </TouchableOpacity>
            </View>


        </>
    )
}

export default index

