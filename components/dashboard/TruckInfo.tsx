import { View, Text, Image } from 'react-native'
import React from 'react'
import SectionContainer from '../common/SectionContainer'
import truck from '@/assets/images/truck.webp'

const TruckInfo = () => {
  return (
    <SectionContainer className="flex-row justify-between">
      <View className="flex-row gap-2">
        <Image className="w-18 h-16" source={truck} />
        <View className="justify-between">
          <Text className="font-bold text-xl">Dhaka-TA-1234</Text>

          <View>
            <Text className="text-gray-400 font-semibold">Driver</Text>
            <Text className="font-bold">Cristiano Ronaldo</Text>
          </View>
        </View>
      </View>

      <View className="justify-between">
        <View>
          <Text className="bg-green-100 text-green-600 font-semibold py-1 px-3 rounded-xl">
            In Transit
          </Text>
        </View>

        <View className="items-end mr-2">
          <Text className="text-gray-400 font-semibold">Helper</Text>
          <Text className="font-bold">Lionel Messi</Text>
        </View>
      </View>
    </SectionContainer>
  )
}

export default TruckInfo