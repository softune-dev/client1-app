import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { formatInputDate, parseInputDate, isValidDate } from './helpers'

type DatePickerInputProps = {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  placeholder,
}: DatePickerInputProps) {
  const [raw, setRaw] = useState(value ? formatInputDate(value) : '')

  const handleChange = (text: string) => {
    setRaw(text)
    const parsed = parseInputDate(text)
    if (isValidDate(parsed) || text === '') {
      onChange(parsed)
    }
  }

  return (
    <View className="flex-1">
      <Text className="text-xs font-semibold text-gray-500 mb-1">{label}</Text>
      <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 h-10 gap-2">
        <MaterialIcons name="calendar-today" size={14} color="#6b7280" />
        <TextInput
          value={raw}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          className="flex-1 text-sm text-foreground font-medium"
        />
      </View>
    </View>
  )
}
