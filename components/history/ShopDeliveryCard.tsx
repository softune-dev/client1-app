import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ShopDelivery } from '@/types/history'
import { formatCurrency, getSupplierColor, getTypeIcon } from './helpers'
import DetailRow from './DetailRow'

type Props = {
  item: ShopDelivery
}

const TYPE_COLORS: Record<string, string> = {
  Package: '#1D4ED8',
  Refill: '#059669',
  'Empty Cylinder': '#9333EA',
}

export default function ShopDeliveryCard({ item }: Props) {
  const [expanded, setExpanded] = useState(false)
  const supplierColor = getSupplierColor(item.supplier)

  // Gross total across all cylinder lines
  const gross = item.cylinders.reduce((sum, c) => sum + c.quantity * c.rate, 0)
  const payable = Math.max(0, gross - item.discount)
  const due = Math.max(0, payable - item.received)

  // Total cylinder count
  const totalCylinders = item.cylinders.reduce((sum, c) => sum + c.quantity, 0)

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      className="border border-gray-100 rounded-xl overflow-hidden mb-3 bg-white shadow-sm active:opacity-80"
    >
      {/* Supplier colour accent bar */}
      <View style={{ height: 3, backgroundColor: supplierColor }} />

      {/* Main row */}
      <View className="flex-row items-center px-3 py-3 gap-3">
        {/* Icon */}
        <View style={{ backgroundColor: supplierColor + '18', borderRadius: 10, padding: 8 }}>
          <MaterialIcons name="store" size={20} color={supplierColor} />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-foreground font-semibold text-base" numberOfLines={1}>
            {item.shop}
          </Text>
          <Text className="text-gray-500 text-xs mt-0.5">
            {item.supplier} · {item.time}
          </Text>
          {/* Cylinder type badges */}
          <View className="flex-row flex-wrap gap-1 mt-1.5">
            {item.cylinders.map((c, idx) => (
              <View
                key={idx}
                style={{ backgroundColor: (TYPE_COLORS[c.type] ?? '#6b7280') + '18' }}
                className="flex-row items-center gap-1 rounded-full px-2 py-0.5"
              >
                <MaterialIcons
                  name={getTypeIcon(c.type)}
                  size={10}
                  color={TYPE_COLORS[c.type] ?? '#6b7280'}
                />
                <Text
                  style={{ color: TYPE_COLORS[c.type] ?? '#6b7280' }}
                  className="text-[10px] font-semibold"
                >
                  {c.quantity} {c.type}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amount + chevron */}
        <View className="items-end">
          <Text className="font-bold text-foreground text-base">
            {totalCylinders} cyl.
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">{formatCurrency(gross)} ৳</Text>
        </View>

        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color="#9ca3af"
        />
      </View>

      {/* Expanded details */}
      {expanded && (
        <View className="px-3 pb-3 border-t border-gray-100">
          {/* Cylinder breakdown table */}
          <View className="mt-3 mb-2">
            <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Cylinder Breakdown
            </Text>
            {/* Header */}
            <View className="flex-row bg-gray-50 rounded-t-lg px-2 py-1.5">
              <Text className="flex-1 text-[11px] font-semibold text-gray-500">Type</Text>
              <Text className="w-14 text-center text-[11px] font-semibold text-gray-500">Size</Text>
              <Text className="w-10 text-center text-[11px] font-semibold text-gray-500">Qty</Text>
              <Text className="w-16 text-right text-[11px] font-semibold text-gray-500">Rate</Text>
              <Text className="w-20 text-right text-[11px] font-semibold text-gray-500">Amount</Text>
            </View>
            {item.cylinders.map((c, idx) => {
              const lineAmount = c.quantity * c.rate
              const color = TYPE_COLORS[c.type] ?? '#6b7280'
              return (
                <View
                  key={idx}
                  className={`flex-row items-center px-2 py-2 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${idx === item.cylinders.length - 1 ? 'rounded-b-lg' : ''}`}
                >
                  <View className="flex-1 flex-row items-center gap-1.5">
                    <View style={{ backgroundColor: color + '20', borderRadius: 4, padding: 2 }}>
                      <MaterialIcons name={getTypeIcon(c.type)} size={11} color={color} />
                    </View>
                    <Text style={{ color }} className="text-xs font-medium">{c.type}</Text>
                  </View>
                  <Text className="w-14 text-center text-xs text-gray-600">{c.size}</Text>
                  <Text className="w-10 text-center text-xs font-semibold text-foreground">{c.quantity}</Text>
                  <Text className="w-16 text-right text-xs text-gray-600">{formatCurrency(c.rate)}</Text>
                  <Text className="w-20 text-right text-xs font-semibold text-foreground">{formatCurrency(lineAmount)}</Text>
                </View>
              )
            })}
          </View>

          {/* Payment summary */}
          <View className="bg-gray-50 rounded-xl p-3 gap-1">
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
