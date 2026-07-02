import { View } from 'react-native'
import React from 'react'
import ActionButton from './ActionButton'

const NavigateButtons = () => {
  return (
    <View className="gap-2 px-1 mb-4">
      <View className="flex-row gap-2">
        <View className="flex-1">
          <ActionButton
            label="New Delivery"
            bg="bg-blue-600"
            icon="add"
          />
        </View>
        <View className="flex-1">
          <ActionButton
            label="View Deliveries"
            bg="bg-green-600"
            icon="list"
          />
        </View>
      </View>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <ActionButton
            label="Retailers"
            bg="bg-violet-600"
            icon="store"
          />
        </View>
        <View className="flex-1">
          <ActionButton
            label="Trip Return"
            bg="bg-orange-500"
            icon="keyboard-return"
          />
        </View>
      </View>
    </View>
  )
}

export default NavigateButtons