import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DeliveryRecord } from '@/types/history'
import { formatCurrency, getSupplierColor, getTypeIcon } from './helpers'
import DetailRow from './DetailRow'

type DeliveryCardProps = {
  item: DeliveryRecord
}

export default function DeliveryCard({ item }: DeliveryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const gross = item.quantity * item.rate
  const payable = Math.max(0, gross - item.discount)
  const due = Math.max(0, payable - item.received)
  const supplierColor = getSupplierColor(item.supplier)

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      className="border border-gray-100 rounded-xl overflow-hidden mb-3 bg-white shadow-sm active:opacity-80"
    >
      {/* Supplier color accent bar */}
      <View style={{ height: 3, backgroundColor: supplierColor }} />

      {/* Main row */}
      <View className="flex-row items-center px-3 py-3 gap-3">
        {/* Icon */}
        <View style={{ backgroundColor: supplierColor + '18', borderRadius: 10, padding: 8 }}>
          <MaterialIcons name={getTypeIcon(item.type)} size={20} color={supplierColor} />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-foreground font-semibold text-base" numberOfLines={1}>
            {item.shop}
          </Text>
          <Text className="text-gray-500 text-xs mt-0.5">
            {item.supplier} · {item.type} · {item.size} · {item.time}
          </Text>
        </View>

        {/* Amount + chevron */}
        <View className="items-end">
          <Text className="font-bold text-foreground text-base">
            {item.quantity} × {item.rate}
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">= {formatCurrency(gross)} ৳</Text>
        </View>

        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color="#9ca3af"
        />
      </View>

      {/* Expanded detail */}
      {expanded && (
        <View className="px-3 pb-3 border-t border-gray-100">
          <View className="bg-gray-50 rounded-xl p-3 mt-2 gap-1">
            <DetailRow label="Gross Total" value={`${formatCurrency(gross)} ৳`} />
            <DetailRow label="Discount" value={`${formatCurrency(item.discount)} ৳`} />
            <DetailRow label="Payable" value={`${formatCurrency(payable)} ৳`} bold />
            <DetailRow label="Received" value={`${formatCurrency(item.received)} ৳`} />
            <View className="flex-row justify-between items-center pt-1 mt-1 border-t border-gray-200">
              <Text className={`text-sm font-bold ${due > 0 ? 'text-destructive' : 'text-success'}`}>
                {due > 0 ? 'Due Amount' : 'Fully Paid ✓'}
              </Text>
              <Text className={`text-base font-extrabold ${due > 0 ? 'text-destructive' : 'text-success'}`}>
                {due > 0 ? `${formatCurrency(due)} ৳` : ''}
              </Text>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  )
}
