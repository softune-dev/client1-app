import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface DateInputProps {
  label?: string;
  onDateChange: (date: Date) => void;
}

export default function DateAndTimePicker({ label = 'Select Date', onDateChange }: DateInputProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>('');

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Android dismisses automatically on press; iOS updates inline
    setShow(Platform.OS === 'ios');

    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate);
      // Format as DD/MM/YYYY for display
      const d = selectedDate.getDate().toString().padStart(2, '0');
      const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const y = selectedDate.getFullYear();
      setDisplayText(`${d}/${m}/${y}`);
    }
  };

  return (
    <View className="w-full">
      {/* Label */}
      <Text className="text-xs font-semibold text-gray-500 mb-1">{label}</Text>

      {/* Clickable trigger */}
      <Pressable
        onPress={() => setShow(true)}
        className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 h-10 gap-2 active:bg-gray-100"
      >
        <MaterialIcons name="calendar-today" size={14} color="#6b7280" />
        <Text className={`flex-1 text-sm font-medium ${displayText ? 'text-foreground' : 'text-gray-400'}`}>
          {displayText || 'DD/MM/YYYY'}
        </Text>
      </Pressable>

      {/* Native system date picker */}
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
