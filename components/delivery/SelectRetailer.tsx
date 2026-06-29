import { View, Text, Pressable, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import SectionContainer from '../common/SectionContainer'
import SectionHeader from '../common/SectionHeader'
import CustomModal from '../common/CustomModal'
import { Retailer } from '@/types/delivery'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

type SelectRetailerProps = {
  retailers: Retailer[]
  selectedRetailer: Retailer | null
  onSelectRetailer: (retailer: Retailer) => void
}

const SelectRetailer = ({ retailers, selectedRetailer, onSelectRetailer }: SelectRetailerProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRetailers = retailers.filter((retailer) => {
    const query = searchQuery.toLowerCase()
    return (
      retailer.name.toLowerCase().includes(query) ||
      retailer.shop.toLowerCase().includes(query) ||
      retailer.area.toLowerCase().includes(query) ||
      retailer.address.toLowerCase().includes(query)
    )
  })

  return (
    <SectionContainer>
      <View className="flex-row items-center justify-between mb-3">
        <SectionHeader title="Select Retailer" />
        <Pressable onPress={() => setModalVisible(true)}>
          <Text className="text-primary font-semibold text-sm">View All</Text>
        </Pressable>
      </View>

      {selectedRetailer ? (
        <View className="flex-row items-center">
          {/* Store Icon */}
          <View className="bg-primary/10 p-2.5 rounded-xl items-center justify-center mr-3">
            <MaterialCommunityIcons name="storefront-outline" size={24} color="#1D4ED8" />
          </View>

          {/* Retailer Details */}
          <View className="flex-1">
            <Text className="font-semibold text-lg text-foreground leading-snug">
              {selectedRetailer.shop}
            </Text>
            <Text className="text-gray-500 text-xs mt-0.5 font-medium">
              {selectedRetailer.address}
            </Text>
          </View>

          {/* Change Button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-primary px-5 py-2.5 rounded-full active:bg-primary/90"
          >
            <Text className="text-white font-semibold text-sm">Change</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => setModalVisible(true)}
          className="border border-dashed border-gray-300 rounded-2xl p-6 items-center justify-center bg-gray-50"
        >
          <MaterialCommunityIcons name="storefront-outline" size={32} color="#9ca3af" style={{ marginBottom: 8 }} />
          <Text className="text-gray-500 font-medium text-base">Tap to select a retailer</Text>
        </Pressable>
      )}

      {/* Selection Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          setSearchQuery('')
        }}
        title="Select Retailer"
      >
        {/* Search Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5 mb-4 border border-gray-200">
          <MaterialIcons name="search" size={22} color="#9ca3af" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search by shop or area..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base text-foreground"
            placeholderTextColor="#9ca3af"
            clearButtonMode="while-editing"
          />
          {searchQuery !== '' && (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcons name="cancel" size={20} color="#9ca3af" />
            </Pressable>
          )}
        </View>

        {/* Retailers List */}
        <FlatList
          data={filteredRetailers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedRetailer?.id === item.id
            return (
              <Pressable
                onPress={() => {
                  onSelectRetailer(item)
                  setModalVisible(false)
                  setSearchQuery('')
                }}
                className={`flex-row items-center p-3 rounded-2xl mb-2.5 border ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white'
                }`}
              >
                {/* Left Icon */}
                <View className={`p-2.5 rounded-xl items-center mr-3 ${isSelected ? 'bg-primary/20' : 'bg-gray-100'}`}>
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={20}
                    color={isSelected ? '#1D4ED8' : '#6b7280'}
                  />
                </View>

                {/* Info */}
                <View className="flex-1">
                  <Text className={`font-semibold text-base ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {item.shop}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-0.5 font-medium">
                    {item.name} • {item.address}
                  </Text>
                </View>

                {/* Right Selection Indicator */}
                {isSelected ? (
                  <MaterialIcons name="check-circle" size={22} color="#1D4ED8" />
                ) : (
                  <MaterialIcons name="radio-button-off" size={22} color="#d1d5db" />
                )}
              </Pressable>
            )
          }}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text className="text-gray-400 text-base font-medium">No retailers found</Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: 400 }}
        />
      </CustomModal>
    </SectionContainer>
  )
}

export default SelectRetailer
