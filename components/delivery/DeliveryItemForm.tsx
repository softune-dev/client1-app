import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import Dropdown from '../common/Dropdown'
import SectionContainer from '../common/SectionContainer'
import { DeliveryItem } from '@/types/delivery'

type DeliveryItemFormProps = {
  onAddItem: (item: Omit<DeliveryItem, 'id'>) => void
  onActiveItemChange: (item: { quantity: number; rate: number } | null) => void
}

const companies = [
  { id: 'Bashundhara LP', name: 'Bashundhara LP' },
  { id: 'Total LP', name: 'Total LP' },
  { id: 'Fresh LP', name: 'Fresh LP' },
  { id: 'Beximco LPG', name: 'Beximco LPG' },
  { id: 'Omera LPG', name: 'Omera LPG' },
]

const sizes = [
  { id: '12 KG', name: '12 KG' },
  { id: '15 KG', name: '15 KG' },
  { id: '35 KG', name: '35 KG' },
  { id: '45 KG', name: '45 KG' },
]

export default function DeliveryItemForm({
  onAddItem,
  onActiveItemChange,
}: DeliveryItemFormProps) {
  const [activeTab, setActiveTab] = useState<'Package' | 'Refill' | 'Empty'>('Package')
  const [company, setCompany] = useState<string | null>('Bashundhara LP')
  const [size, setSize] = useState<string | null>('12 KG')
  const [quantity, setQuantity] = useState<string>('5')
  const [rate, setRate] = useState<string>('1250')

  // Notify parent of active form calculations in real time
  useEffect(() => {
    const q = Number(quantity)
    const r = Number(rate)
    if (q > 0 && r > 0) {
      onActiveItemChange({ quantity: q, rate: r })
    } else {
      onActiveItemChange(null)
    }
  }, [quantity, rate])

  const handleAddItem = () => {
    if (!company || !size || !quantity || !rate) return

    const q = Number(quantity)
    const r = Number(rate)
    if (q <= 0 || r <= 0) return

    onAddItem({
      type: activeTab,
      company,
      size,
      quantity: q,
      rate: r,
    })

    // Reset quantity and rate, but keep company & size selected
    setQuantity('')
    setRate('')
  }

  return (
    <View className="mb-4">
      {/* Segmented Tab Bar */}
      <View className="flex-row bg-[#E5E9F5]/40 p-1.5 rounded-2xl mb-4">
        {(['Package', 'Refill', 'Empty'] as const).map((tab) => {
          const isSelected = activeTab === tab
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 items-center rounded-xl transition-all will-change-variable ${
                isSelected ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  isSelected ? 'text-primary font-bold' : 'text-gray-500'
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Main Form Fields Card */}
      <SectionContainer className="p-5">
        {/* Company & Size Dropdowns */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1">
            <Dropdown
              label="Company"
              items={companies}
              selectedId={company}
              onSelect={setCompany}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select Company"
            />
          </View>

          <View className="flex-1">
            <Dropdown
              label="Size"
              items={sizes}
              selectedId={size}
              onSelect={setSize}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select Size"
            />
          </View>
        </View>

        {/* Quantity & Rate Inputs */}
        <View className="flex-row gap-4 mb-5">
          <View className="flex-1">
            <Text className="mb-2 text-sm font-semibold text-gray-500">
              Quantity
            </Text>
            <View className="h-14 flex-row items-center rounded-xl border border-gray-300 px-4 bg-white">
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                className="flex-1 text-base text-foreground"
              />
            </View>
          </View>

          <View className="flex-1">
            <Text className="mb-2 text-sm font-semibold text-gray-500">
              Rate (TK)
            </Text>
            <View className="h-14 flex-row items-center rounded-xl border border-gray-300 px-4 bg-white">
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                className="flex-1 text-base text-foreground"
              />
            </View>
          </View>
        </View>

        {/* Add Another Item Button */}
        <Pressable
          onPress={handleAddItem}
          disabled={!company || !size || !quantity || !rate}
          className={`py-3.5 rounded-xl items-center justify-center ${
            company && size && quantity && rate
              ? 'bg-primary/10 active:bg-primary/20'
              : 'bg-gray-100 opacity-60'
          }`}
        >
          <Text className="text-primary font-bold text-base">
            + Add Another Item
          </Text>
        </Pressable>
      </SectionContainer>
    </View>
  )
}
