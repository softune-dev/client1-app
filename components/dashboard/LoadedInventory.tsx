import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SectionContainer from '../common/SectionContainer'
import { Product } from '@/types/common'



const LoadedInventory = ({products}: {products: Product[]}) => {

  // Package products
  const packageProducts = products.filter(
    item => item.type === 'Package'
  )

  // Empty Cylinder products
  const emptyCylinderProducts = products.filter(
    item => item.type === 'Empty Cylinder'
  )

  // Totals
  const packageTotal = packageProducts.reduce(
    (sum, item) => sum + item.availableCylinder,
    0
  )

  const emptyCylinderTotal = emptyCylinderProducts.reduce(
    (sum, item) => sum + item.availableCylinder,
    0
  )

  return (
    <View className="mb-4 gap-3">

      {/* Packages */}
      <View>
        <View className="flex-row justify-between bg-primary p-3 rounded-t-lg">
          <Text className="font-semibold text-lg text-white">
            Packages
          </Text>

          <Text className="font-bold text-xl text-white">
            Total: {packageTotal}
          </Text>
        </View>

        <FlatList
          className='border border-border rounded-b-lg bg-white'
          data={packageProducts}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex-row justify-between p-2 border-b border-gray-200">
              <Text className='text-lg'>
                {item.supplier} - {item.size}
              </Text>

              <Text className='text-lg font-bold text-primary'>{item.availableCylinder}</Text>
            </View>
          )}
        />
      </View>

      {/* Empty Cylinders */}
      <View className="">
        <View className="flex-row justify-between bg-success p-3 rounded-t-lg">
          <Text className="font-semibold text-lg text-white">
            Empty Cylinders
          </Text>

          <Text className="font-bold text-xl text-white">
            Total: {emptyCylinderTotal}
          </Text>
        </View>

        <FlatList
          className='border border-border rounded-b-lg bg-white'
          data={emptyCylinderProducts}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex-row justify-between p-2 border-b border-gray-200">
              <Text className='text-lg'>
                {item.supplier} - {item.size}
              </Text>

              <Text className='text-lg font-bold text-success'>{item.availableCylinder}</Text>
            </View>
          )}
        />
      </View>

    </View>
  )
}

export default LoadedInventory