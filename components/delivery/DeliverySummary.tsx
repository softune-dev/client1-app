import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type DeliverySummaryProps = {
  totalCylinders: number
  totalAmount: number
  paymentMode: string
  onTogglePaymentMode: () => void
  onConfirm: () => void
}

export default function DeliverySummary({
  totalCylinders,
  totalAmount,
  paymentMode,
  onTogglePaymentMode,
  onConfirm,
}: DeliverySummaryProps) {
  return (
    <View className="mt-2">
      {/* Blue Summary Card */}
      <View className="bg-primary rounded-3xl p-5 mb-5 shadow-lg">
        {/* Upper Row */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Total Items
            </Text>
            <Text className="text-white text-2xl font-bold mt-1">
              {totalCylinders} Cylinders
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Payment Mode
            </Text>
            <Pressable
              onPress={onTogglePaymentMode}
              className="flex-row items-center gap-1.5 mt-1 bg-white/10 px-3 py-1 rounded-full active:bg-white/20"
            >
              <Text className="text-white text-lg font-bold">
                {paymentMode}
              </Text>
              <MaterialIcons name="swap-horiz" size={16} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Divider Line */}
        <View className="h-[1px] bg-white/20 my-4" />

        {/* Lower Row */}
        <View className="flex-row justify-between items-end">
          <Text className="text-white text-2xl font-bold mb-1">
            Total Amount
          </Text>
          <View className="items-end">
            <Text className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Payable BDT
            </Text>
            <Text className="text-white text-3xl font-extrabold mt-1">
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Confirm Delivery Button */}
      <Pressable
        onPress={onConfirm}
        className="bg-success active:bg-success/90 py-4 rounded-2xl shadow-md flex-row items-center justify-center gap-2 mb-8"
      >
        <MaterialIcons name="check-circle" size={24} color="white" />
        <Text className="text-white font-semibold text-xl">
          Confirm Delivery
        </Text>
      </Pressable>
    </View>
  )
}
