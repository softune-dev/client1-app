import React from 'react'
import { View, Text } from 'react-native'

type DetailRowProps = {
  label: string
  value: string
  bold?: boolean
}

export default function DetailRow({ label, value, bold }: DetailRowProps) {
  return (
    <View className="flex-row justify-between items-center py-0.5">
      <Text className="text-gray-500 text-xs">{label}</Text>
      <Text className={`text-xs ${bold ? 'font-bold text-foreground' : 'text-gray-700'}`}>
        {value}
      </Text>
    </View>
  )
}
