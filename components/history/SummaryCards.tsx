import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { formatCurrency } from './helpers'

type SummaryCardsProps = {
  totalSales: number
  totalDeliveries: number
  totalDue: number
}

export default function SummaryCards({
  totalSales,
  totalDeliveries,
  totalDue,
}: SummaryCardsProps) {
  return (
    <View className="flex-row gap-3 mb-4">
      {/* Total Sales */}
      <View className="flex-1 bg-success rounded-2xl p-4 shadow-md">
        <View className="flex-row items-center gap-1.5 mb-2">
          <MaterialIcons name="trending-up" size={16} color="rgba(255,255,255,0.8)" />
          <Text className="text-white/80 text-xs font-medium">Total Sales</Text>
        </View>
        <Text
          className="text-white text-lg font-extrabold"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(totalSales)} ৳
        </Text>
        <Text className="text-white/60 text-xs mt-1">{totalDeliveries} deliveries</Text>
      </View>

      {/* Total Due */}
      <View
        className={`flex-1 ${totalDue > 0 ? 'bg-orange-500' : 'bg-success'} rounded-2xl p-4 shadow-md`}
      >
        <View className="flex-row items-center gap-1.5 mb-2">
          <MaterialIcons
            name={totalDue > 0 ? 'warning' : 'check-circle'}
            size={16}
            color="rgba(255,255,255,0.8)"
          />
          <Text className="text-white/80 text-xs font-medium">Total Due</Text>
        </View>
        <Text
          className="text-white text-lg font-extrabold"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(totalDue)} ৳
        </Text>
        <Text className="text-white/60 text-xs mt-1">
          {totalDue > 0 ? 'Pending collection' : 'All cleared ✓'}
        </Text>
      </View>
    </View>
  )
}
