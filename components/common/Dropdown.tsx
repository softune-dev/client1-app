import { DropdownProps } from '@/types/common'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native'

export default function Dropdown<T>({
  label,
  items,
  selectedId,
  onSelect,
  getLabel,
  getKey,
  placeholder = 'Select option',
  loading = false,
  disabled = false,
  emptyMessage = 'No data found',
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
  })

  const buttonRef = useRef<View>(null)

  const selectedItem = useMemo(() => {
    return items.find((item) => getKey(item) === selectedId)
  }, [items, selectedId, getKey])

  const handleSelect = (item: T) => {
    onSelect(getKey(item))
    setOpen(false)
  }

  const handleOpen = useCallback(() => {
    if (disabled || loading) return

    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownLayout({ x, y: y + height, width })
      setOpen(true)
    })
  }, [disabled, loading])

  return (
    <View>
      {/* Label */}
      {label && (
        <Text className="mb-2 text-sm font-semibold text-gray-700">
          {label}
        </Text>
      )}

      {/* Trigger Button */}
      <Pressable
        ref={buttonRef}
        onPress={handleOpen}
        className={`h-14 flex-row items-center justify-between rounded-xl border border-gray-300 px-4 ${disabled ? 'bg-gray-100' : 'bg-white'
          }`}
      >
        <Text
          className={`text-base ${selectedItem ? 'text-black' : 'text-gray-400'
            }`}
        >
          {selectedItem ? getLabel(selectedItem) : placeholder}
        </Text>

        <MaterialIcons name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={22} className='text-gray-500' />
      </Pressable>

      {/* Dropdown positioned below the button */}
      <Modal visible={open} transparent animationType="none">
        {/* Backdrop – tapping anywhere outside closes */}
        <Pressable className="absolute inset-0" onPress={() => setOpen(false)}>
          {/* Dropdown list */}
          <View
            className="absolute bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            style={{
              top: dropdownLayout.y,
              left: dropdownLayout.x,
              width: dropdownLayout.width,
              elevation: 8,
            }}
          >
            {/* Loading */}
            {loading && (
              <View className="py-4">
                <ActivityIndicator size="small" />
              </View>
            )}

            {/* Empty state */}
            {!loading && items.length === 0 && (
              <Text className="py-4 text-center text-gray-500">
                {emptyMessage}
              </Text>
            )}

            {/* List */}
            {!loading && (
              <FlatList
                data={items}
                keyExtractor={(item) => getKey(item)}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
                style={{ maxHeight: 250 }}
                ItemSeparatorComponent={() => (
                  <View className="h-[1px] bg-gray-200" />
                )}
                renderItem={({ item }) => {
                  const isSelected = getKey(item) === selectedId

                  return (
                    <Pressable
                      onPress={() => handleSelect(item)}
                      className={`py-3.5 px-3 flex-row justify-between items-center ${isSelected ? 'bg-gray-100' : ''
                        }`}
                    >
                      <Text className="text-base font-medium">
                        {getLabel(item)}
                      </Text>

                      {isSelected && (
                        <Text className="text-green-600 font-bold">✓</Text>
                      )}
                    </Pressable>
                  )
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
