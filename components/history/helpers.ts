import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'

export const formatCurrency = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatDisplayDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const formatInputDate = (dateStr: string) => {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export const parseInputDate = (input: string): string => {
  // Accepts DD/MM/YYYY or YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input
  const parts = input.split('/')
  if (parts.length === 3) {
    const [d, m, y] = parts
    if (d && m && y && y.length === 4) return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  return ''
}

export const isValidDate = (str: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(Date.parse(str + 'T00:00:00'))

export const getSupplierColor = (supplier: string) => {
  switch (supplier) {
    case 'Bashundhara': return '#dc2026'
    case 'Total': return '#f57f3e'
    case 'Fresh': return '#0080e0'
    default: return '#6b7280'
  }
}

export const getTypeIcon = (type: string): React.ComponentProps<typeof MaterialIcons>['name'] => {
  switch (type) {
    case 'Package': return 'inventory-2'
    case 'Refill': return 'replay'
    case 'Empty Cylinder': return 'radio-button-unchecked'
    default: return 'local-gas-station'
  }
}
