import React from 'react'
import { Pressable, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type ButtonProps = {
  label: string
  onPress: () => void
  icon?: keyof typeof MaterialIcons.glyphMap
  variant?: 'primary' | 'success' | 'destructive' | 'secondary'
  className?: string
  disabled?: boolean
}

export default function Button({
  label,
  onPress,
  icon,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-success active:bg-success/90'
      case 'destructive':
        return 'bg-destructive active:bg-destructive/90'
      case 'secondary':
        return 'bg-gray-100 active:bg-gray-200'
      case 'primary':
      default:
        return 'bg-primary active:bg-primary/90'
    }
  }

  const getTextColorClass = () => {
    if (variant === 'secondary') return 'text-foreground'
    return 'text-white'
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`py-4 rounded-2xl shadow-md flex-row items-center justify-center gap-2 ${getVariantClass()} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {icon && <MaterialIcons name={icon} size={24} color={variant === 'secondary' ? '#081126' : 'white'} />}
      <Text className={`${getTextColorClass()} font-semibold text-xl`}>
        {label}
      </Text>
    </Pressable>
  )
}
