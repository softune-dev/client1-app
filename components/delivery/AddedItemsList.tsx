import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DeliveryItem } from '@/types/delivery'
import SectionContainer from '../common/SectionContainer'

type AddedItemsListProps = {
  items: DeliveryItem[]
  onRemoveItem: (id: string) => void
}

export default function AddedItemsList({ items, onRemoveItem }: AddedItemsListProps) {
  if (items.length === 0) return null

  return (
    <SectionContainer className="mb-4">
      <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
        Added Items List
      </Text>
      {items.map((item, idx) => (
        <View
          key={item.id}
          className={`flex-row items-center justify-between py-3 ${
            idx !== items.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <View className="flex-1">
            <Text className="font-semibold text-foreground text-base">
              {item.company} • {item.size}
            </Text>
            <Text className="text-gray-500 text-xs mt-0.5 font-medium">
              Type: {item.type} • {item.quantity} Cylinders @ {item.rate} TK
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="font-bold text-foreground text-base">
              {(item.quantity * item.rate).toLocaleString()} TK
            </Text>
            <Pressable
              onPress={() => onRemoveItem(item.id)}
              className="p-1 rounded-full bg-red-50 active:bg-red-100"
            >
              <MaterialIcons name="highlight-remove" size={20} color="#dc2626" />
            </Pressable>
          </View>
        </View>
      ))}
    </SectionContainer>
  )
}
