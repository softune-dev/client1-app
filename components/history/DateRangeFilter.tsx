import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import SectionContainer from '@/components/common/SectionContainer'
import DateAndTimePicker from '@/components/common/DateAndTimePicker'

type DateRangeFilterProps = {
  fromDate: string
  toDate: string
  filterActive: boolean
  onFromChange: (v: string) => void
  onToChange: (v: string) => void
  onApply: () => void
  onClear: () => void
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  filterActive,
  onFromChange,
  onToChange,
  onApply,
  onClear,
}: DateRangeFilterProps) {
  return (
    <SectionContainer className="mb-4">
      {/* Header row */}
      <View className="flex-row items-center gap-2 mb-3">
        <MaterialIcons name="filter-list" size={18} color="#1D4ED8" />
        <Text className="text-base font-semibold text-foreground">Filter by Date Range</Text>
        {filterActive && (
          <View className="bg-primary/10 rounded-full px-2 py-0.5 ml-auto">
            <Text className="text-primary text-xs font-semibold">Active</Text>
          </View>
        )}
      </View>

      {/* Date inputs */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1">
          <DateAndTimePicker
            label="From Date"
            onDateChange={(d) => onFromChange(d.toISOString().split('T')[0])}
          />
        </View>
        <View className="flex-1">
          <DateAndTimePicker
            label="To Date"
            onDateChange={(d) => onToChange(d.toISOString().split('T')[0])}
          />
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row gap-2">
        <Pressable
          onPress={onApply}
          className="flex-1 bg-primary rounded-xl py-2.5 flex-row items-center justify-center gap-2 active:opacity-80"
        >
          <Ionicons name="search" size={16} color="white" />
          <Text className="text-white font-semibold text-sm">Apply Filter</Text>
        </Pressable>

        {filterActive && (
          <Pressable
            onPress={onClear}
            className="flex-1 bg-gray-100 rounded-xl py-2.5 flex-row items-center justify-center gap-2 active:opacity-80"
          >
            <MaterialIcons name="close" size={16} color="#374151" />
            <Text className="text-gray-700 font-semibold text-sm">Clear</Text>
          </Pressable>
        )}
      </View>
    </SectionContainer>
  )
}
