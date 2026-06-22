import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../common/Dropdown'
import { Entypo } from '@expo/vector-icons'
import SectionContainer from '../common/SectionContainer';
import { AddedItem } from '@/types/laodTruck';
import { Product } from '@/types/common';
import SectionHeader from '../common/SectionHeader';

const CylinderBatchForm = ({
  products,
  onAddBatch,
}: {
  products: Product[]
  onAddBatch: (item: AddedItem) => void
}) => {
  const [supplier, setSupplier] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(0)

  const suppliers = [
    ...new Set(products.map((p) => p.supplier)),
  ].map((supplier) => ({
    id: supplier,
    name: supplier,
  }))

  const types = supplier
    ? [
      ...new Set(
        products
          .filter(
            (p) => p.supplier === supplier
          )
          .map((p) => p.type)
      ),
    ].map((type) => ({
      id: type,
      name: type,
    }))
    : []

  const sizes =
    supplier && type
      ? [
        ...new Set(
          products
            .filter(
              (p) =>
                p.supplier === supplier &&
                p.type === type
            )
            .map((p) => p.size)
        ),
      ].map((size) => ({
        id: size,
        name: size,
      }))
      : []

  const handleAddLoadEntry = () => {
    if (!supplier || !type || !size || !quantity) {
      return
    }

    const newItem: AddedItem = {
      id: Date.now().toString(),
      supplier,
      type,
      size,
      quantity: Number(quantity),
    }

    onAddBatch(newItem)

    // reset form
    setSupplier(null)
    setType(null)
    setSize(null)
    setQuantity(0)
  }

  return (
    <SectionContainer>
      <SectionHeader title="Add Cylinder Batch" />

      <View className='gap-4'>
        <View className='flex-row gap-4 items-center'>
          <View className='flex-1'>
            <Dropdown
              label="Supplier"
              items={suppliers}
              selectedId={supplier}
              onSelect={(id) => {
                setSupplier(id)

                // reset dependent fields
                setType(null)
                setSize(null)
              }}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select supplier"
            />
          </View>

          <View className='flex-1'>
            <Dropdown
              label="Type"
              items={types}
              selectedId={type}
              onSelect={(id) => {
                setType(id)

                // reset size
                setSize(null)
              }}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select type"
              disabled={!supplier}
            />
          </View>
        </View>

        <View className='flex-row gap-4 items-center'>
          <View className='flex-1'>
            <Dropdown
              label="Size"
              items={sizes}
              selectedId={size}
              onSelect={setSize}
              getLabel={(item) => item.name}
              getKey={(item) => item.id}
              placeholder="Select size"
              disabled={!type}
            />
          </View>

          <View className='flex-1'>
            <Text className="mb-2 text-sm font-semibold text-gray-700">
              Quantity
            </Text>
            <View className='h-14 flex-row items-center justify-between rounded-xl border px-4 border-gray-300'>
              <TextInput
                className='w-full'
                placeholder='0'
                keyboardType="numeric"
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text) || 0)}
              />
            </View>
          </View>
        </View>

        <View>
          <Pressable
            onPress={handleAddLoadEntry}
            disabled={!supplier || !type || !size || !quantity}
            className={`py-3 rounded-xl shadow-md flex-row items-center justify-center gap-2 ${supplier && type && size && quantity
              ? 'bg-destructive active:bg-destructive/80'
              : 'bg-red-300'
              }`}
          >
            <Entypo name="add-to-list" size={24} color="white" />
            <Text className="text-white font-semibold text-xl">
              Add Batch
            </Text>
          </Pressable>
        </View>
      </View>


    </SectionContainer>
  )
}

export default CylinderBatchForm