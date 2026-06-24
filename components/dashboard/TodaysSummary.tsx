import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import SectionContainer from '../common/SectionContainer'

const TodaysSummary = () => {
  return (
    <SectionContainer>
        <Text className="text-xl font-extrabold">
          Today&apos;s Summary
        </Text>

        <View className="flex-row justify-between mt-3">
          <View className="flex-row gap-2">
            <MaterialCommunityIcons
              name="truck-delivery"
              size={24}
              color="orange"
            />
            <View>
              <Text className="font-semibold">Deliveries</Text>
              <Text className="text-2xl font-bold">8</Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <AntDesign
              name="delivered-procedure"
              size={21}
              color="green"
            />

            <View>
              <Text className="font-semibold">Delivered</Text>
              <Text className="text-2xl font-bold">50</Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <MaterialIcons name="inventory" size={22} color="red" />

            <View>
              <Text className="font-semibold">Remaining</Text>
              <Text className="text-2xl font-bold">125</Text>
            </View>
          </View>
        </View>
      </SectionContainer>
  )
}

export default TodaysSummary