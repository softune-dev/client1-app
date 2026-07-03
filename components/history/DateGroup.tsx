import React from 'react'
import { View, Text } from 'react-native'
import { ShopDelivery } from '@/types/history'
import { formatCurrency, formatDisplayDate } from './helpers'
import ShopDeliveryCard from './ShopDeliveryCard'

type DateGroupProps = {
  date: string
  records: ShopDelivery[]
}

export default function DateGroup({ date, records }: DateGroupProps) {
  const dayTotal = records.reduce((sum, r) => {
    const gross = r.cylinders.reduce((s, c) => s + c.quantity * c.rate, 0)
    const payable = Math.max(0, gross - r.discount)
    return sum + payable
  }, 0)

  return (
    <View className="mb-4">
      {/* Date header */}
      <View className="flex-row justify-between items-center mb-2 px-1">
        <View className="flex-row items-center gap-2">
          <View className="bg-primary/10 rounded-lg px-2 py-1">
            <Text className="text-primary text-xs font-bold">
              {records.length} {records.length === 1 ? 'shop' : 'shops'}
            </Text>
          </View>
          <Text className="text-foreground font-semibold text-sm">
            {formatDisplayDate(date)}
          </Text>
        </View>
        <Text className="text-primary font-bold text-sm">
          {formatCurrency(dayTotal)} ৳
        </Text>
      </View>

      {records.map(item => (
        <ShopDeliveryCard key={item.id} item={item} />
      ))}
    </View>
  )
}
