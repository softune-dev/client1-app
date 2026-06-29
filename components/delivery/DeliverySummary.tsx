import React, { useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'

type DeliverySummaryProps = {
  totalAmount: number
  discount: string
  setDiscount: (discount: string) => void
  received: string
  setReceived: (received: string) => void
}

export default function DeliverySummary({
  totalAmount,
  discount,
  setDiscount,
  received,
  setReceived,
}: DeliverySummaryProps) {
  const discountVal = Number(discount) || 0
  const receivedVal = Number(received) || 0
  const payable = Math.max(0, totalAmount - discountVal)
  const due = Math.max(0, payable - receivedVal)

  // Reset inputs when totalAmount changes
  useEffect(() => {
    setDiscount('')
    setReceived('')
  }, [totalAmount, setDiscount, setReceived])

  return (
    <View>
      {/* Total Amount Card */}
      <View className="bg-primary rounded-xl p-4 mb-4 shadow-lg flex-row justify-between items-end">
        <Text className="text-white text-xl font-bold mb-1">
          Total Amount
        </Text>
        <Text className="text-white text-3xl font-extrabold mt-1">
          {totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      {/* Payment Fields */}
      <View className="bg-white rounded-xl border border-gray-200 mb-5 overflow-hidden shadow-sm">
        {/* Discount Row */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-500 mb-0.5">Discount (BDT)</Text>
          </View>
          <View className="h-10 w-36 flex-row items-center rounded-lg border border-gray-200 px-3 bg-gray-50">
            <TextInput
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base font-semibold text-foreground h-full py-0"
              style={{ textAlign: 'right' }}
            />
          </View>
        </View>

        {/* Payable Row (computed) */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-500 mb-0.5">Payable (BDT)</Text>
          </View>
          <Text className="text-base font-bold text-foreground">
            {payable.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>

        {/* Received Amount Row */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-500 mb-0.5">Received (BDT)</Text>
          </View>
          <View className="h-10 w-36 flex-row items-center rounded-lg border border-gray-200 px-3 bg-gray-50">
            <TextInput
              value={received}
              onChangeText={setReceived}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base font-semibold text-foreground h-full py-0"
              style={{ textAlign: 'right' }}
            />
          </View>
        </View>

        {/* Due Amount Row */}
        <View
          className={`flex-row items-center px-4 py-3 ${due > 0 ? 'bg-destructive/10' : 'bg-success/10'}`}>
          <View className="flex-1">
            <Text
              className={`text-sm font-semibold mb-0.5 ${due > 0 ? 'text-destructive' : 'text-success'}`}>
              Due Amount (BDT)
            </Text>
          </View>
          <Text
            className={`text-xl font-extrabold ${due > 0 ? 'text-destructive' : 'text-success'}`}>
            {due.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    </View>
  )
}
