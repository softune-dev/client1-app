import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type CustomModalProps = {
  visible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function CustomModal({
  visible,
  onClose,
  title,
  children,
}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          {/* Backdrop/Overlay - closes modal when clicked */}
          <Pressable className="absolute inset-0" onPress={onClose} />

          {/* Modal Container */}
          <View className="bg-white rounded-t-[28px] p-5 max-h-[85%] pb-10 shadow-2xl z-10">
            {/* Header indicator */}
            <View className="items-center mb-3">
              <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </View>

            {/* Header Title & Close Button */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-foreground">{title}</Text>
              <Pressable
                onPress={onClose}
                className="p-1.5 rounded-full bg-gray-100 active:bg-gray-200"
              >
                <MaterialIcons name="close" size={20} className="text-foreground" />
              </Pressable>
            </View>

            {/* Content */}
            <View className="flex-shrink">{children}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
