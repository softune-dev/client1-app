import { View, Text } from 'react-native'
import React from 'react'
import SectionContainer from '../common/SectionContainer'
import Chip from './Chip'

const RemainingInventory = () => {
  return (
    <SectionContainer>
        <View className="flex-row justify-between">
          <Text className="font-extrabold text-xl">
            Remaining Inventory
          </Text>

          <Text className="font-semibold">Total: 125 Cyllinders</Text>
        </View>
        <View className="flex-row justify-between mt-1">
          <Chip
            weight="12 KG"
            count={70}
            bgClass="bg-sky-50 border-sky-200"
            textClass="text-sky-700"
          />
          <Chip
            weight="15 KG"
            count={30}
            bgClass="bg-emerald-50 border-green-200"
            textClass="text-emerald-700"
          />
          <Chip
            weight="18 KG"
            count={20}
            bgClass="bg-amber-50  border-yellow-200"
            textClass="text-amber-700"
          />
          <Chip
            weight="22 KG"
            count={0}
            bgClass="bg-rose-50 border-rose-200"
            textClass="text-rose-700"
          />
          <Chip
            weight="35 KG"
            count={0}
            bgClass="bg-purple-50 border-purple-200"
            textClass="text-purple-700"
          />
        </View>
      </SectionContainer>
  )
}

export default RemainingInventory