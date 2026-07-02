import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Alert } from 'react-native'
import Dropdown from '../common/Dropdown'
import SectionContainer from '../common/SectionContainer'
import { DeliveryItemFormProps } from '@/types/delivery'

export default function DeliveryItemForm({
  loadedInventory,
  onAddItem,
}: DeliveryItemFormProps) {
  const [activeTab, setActiveTab] = useState<'Package' | 'Refill' | 'Empty'>('Package')
  const [company, setCompany] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<string>('')
  const [rate, setRate] = useState<string>('')

  const targetType = activeTab === 'Empty' ? 'Empty Cylinder' : activeTab

  // Get matching suppliers/companies for the active tab from products
  const availableSuppliers = Array.from(
    new Set(
      loadedInventory
        .filter(item => item.type === targetType)
        .map(item => item.supplier)
    )
  ).map(name => ({ id: name, name }))

  // Get matching sizes for the active tab and selected company from products
  const availableSizes = Array.from(
    new Set(
      loadedInventory
        .filter(item => item.type === targetType && item.supplier === company)
        .map(item => item.size)
    )
  ).map(name => ({ id: name, name }))

  // Reset company and size selections when tab or products change
  useEffect(() => {
    setCompany(null)
    setSize(null)
  }, [activeTab, loadedInventory])

  // Reset size selection when company changes
  useEffect(() => {
    setSize(null)
  }, [company])

  const remainingItem = loadedInventory.find(
    item => item.type === targetType && item.supplier === company && item.size === size
  )
  const remainingCylindersCount = remainingItem ? remainingItem.availableCylinder : 0

  const handleAddItem = () => {
    if (!company || !size || !quantity || !rate) return

    const q = Number(quantity)
    const r = Number(rate)
    if (isNaN(q) || q <= 0 || isNaN(r) || r <= 0) {
      Alert.alert('Invalid Values', 'Please enter valid positive numbers for quantity and rate.')
      return
    }

    if (q > remainingCylindersCount) {
      Alert.alert(
        'Insufficient Stock',
        `The selected truck only has ${remainingCylindersCount} cylinders of this type/size/supplier available.`
      )
      return
    }

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
      <View className="flex-row bg-success/20 p-1.5 rounded-2xl mb-4">
        {(['Package', 'Refill', 'Empty'] as const).map((tab) => {
          const isSelected = activeTab === tab
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 items-center rounded-xl transition-all ${isSelected ? 'bg-white shadow-xs' : ''
                }`}
            >
              <Text
                className={`font-semibold text-base ${isSelected ? 'text-success font-bold' : 'text-success'
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
              label="Supplier"
              items={availableSuppliers}
              selectedId={company}
              onSelect={(id) => setCompany(id)}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select Supplier"
              disabled={availableSuppliers.length === 0}
            />
          </View>

          <View className="flex-1">
            <Dropdown
              label="Size"
              items={availableSizes}
              selectedId={size}
              onSelect={(id) => setSize(id)}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select Size"
              disabled={!company || availableSizes.length === 0}
            />
          </View>
        </View>

        {/* Remaining Cylinders Info */}
        {company && size ? (
          <View className="mb-4 bg-success/10 py-3.5 px-4 rounded-xl flex-row items-center justify-between border border-success/20">
            <View className="flex-row items-center gap-2">
              <View className="w-2.5 h-2.5 rounded-full bg-success" />
              <Text className="text-success font-semibold text-sm">Stock Available on Truck</Text>
            </View>
            <Text className="font-bold text-lg text-success">
              {remainingCylindersCount} Cylinders
            </Text>
          </View>
        ) : (
          <View className="mb-4 bg-destructive/10 py-3.5 px-4 rounded-xl flex-row items-center justify-between border border-destructive">
            <Text className="text-destructive font-semibold text-sm">Select Supplier & Size</Text>
            <Text className="font-bold text-lg text-destructive">0 Cylinders</Text>
          </View>
        )}

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
                className="flex-1 text-base text-foreground h-full py-0"
              />
            </View>
            {company && size && quantity !== '' && Number(quantity) > remainingCylindersCount && (
              <Text className="text-red-500 text-xs mt-1.5 font-semibold">
                Exceeds truck stock ({remainingCylindersCount} available)
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="mb-2 text-sm font-semibold text-gray-500">
              Rate (BDT)
            </Text>
            <View className="h-14 flex-row items-center rounded-xl border border-gray-300 px-4 bg-white">
              <TextInput
                placeholder="0"
                keyboardType="numeric"
                value={rate}
                onChangeText={setRate}
                className="flex-1 text-base text-foreground h-full py-0"
              />
            </View>
          </View>
        </View>

        {/* Add Another Item Button */}
        <Pressable
          onPress={handleAddItem}
          disabled={!company || !size || !quantity || !rate || Number(quantity) > remainingCylindersCount || Number(quantity) <= 0}
          className={`py-3.5 rounded-xl items-center justify-center ${company && size && quantity && rate && Number(quantity) <= remainingCylindersCount && Number(quantity) > 0
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
