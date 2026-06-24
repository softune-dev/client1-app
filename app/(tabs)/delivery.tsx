import Container from '@/components/common/Container'
import SelectRetailer from '@/components/delivery/SelectRetailer'
import DeliveryItemForm from '@/components/delivery/DeliveryItemForm'
import DeliverySummary from '@/components/delivery/DeliverySummary'
import AddedItemsList from '@/components/delivery/AddedItemsList'
import { Retailer, DeliveryItem } from '@/types/delivery'
import { useState } from 'react'
import { Alert } from 'react-native'

const retailers: Retailer[] = [
  { id: 1, name: 'Ronaldo', phone: '1234567890', shop: 'Ronaldo Shop', area: 'Boali', address: 'Boali, Madhupur, Tangail' },
  { id: 2, name: 'Messi', phone: '1234567890', shop: 'Messi Shop', area: 'Adalotpara', address: 'Adalotpara, Madhupur, Tangail' },
  { id: 3, name: 'Neymar', phone: '1234567890', shop: 'Neymar Shop', area: 'Charaljani', address: 'Charaljani, Madhupur, Tangail' },
  { id: 4, name: 'Mbappe', phone: '1234567890', shop: 'Mbappe Shop', area: 'Bhuiyan Para', address: 'Bhuiyan Para, Madhupur, Tangail' }
]

const delivery = () => {
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    retailers && retailers.length > 0 ? retailers[0] : null
  )
  const [addedItems, setAddedItems] = useState<DeliveryItem[]>([])
  const [activeItem, setActiveItem] = useState<{ quantity: number; rate: number } | null>(null)
  const [paymentMode, setPaymentMode] = useState<string>('Post-paid')

  const handleAddItem = (item: Omit<DeliveryItem, 'id'>) => {
    const newItem: DeliveryItem = {
      ...item,
      id: Date.now().toString(),
    }
    setAddedItems((prev) => [...prev, newItem])
  }

  const handleRemoveItem = (id: string) => {
    setAddedItems((prev) => prev.filter((item) => item.id !== id))
  }

  const togglePaymentMode = () => {
    setPaymentMode((prev) => (prev === 'Post-paid' ? 'Cash' : 'Post-paid'))
  }

  const handleConfirmDelivery = () => {
    if (!selectedRetailer) {
      Alert.alert('Selection Required', 'Please select a retailer first.')
      return
    }

    const totalCylinders =
      addedItems.reduce((acc, item) => acc + item.quantity, 0) + (activeItem?.quantity || 0)
    const totalAmount =
      addedItems.reduce((acc, item) => acc + item.quantity * item.rate, 0) +
      (activeItem?.quantity || 0) * (activeItem?.rate || 0)

    if (totalCylinders === 0) {
      Alert.alert('Empty Delivery', 'Please enter or add at least one item to confirm.')
      return
    }

    Alert.alert(
      'Confirm Delivery',
      `Are you sure you want to confirm this delivery?\n\n` +
        `Retailer: ${selectedRetailer.shop}\n` +
        `Total Items: ${totalCylinders} Cylinders\n` +
        `Payment Mode: ${paymentMode}\n` +
        `Total Amount: ${totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} BDT`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Delivery has been confirmed successfully!')
            setAddedItems([])
          },
        },
      ]
    )
  }

  const totalCylinders =
    addedItems.reduce((acc, item) => acc + item.quantity, 0) + (activeItem?.quantity || 0)
  const totalAmount =
    addedItems.reduce((acc, item) => acc + item.quantity * item.rate, 0) +
    (activeItem?.quantity || 0) * (activeItem?.rate || 0)

  return (
    <Container>
      {/* Retailer Selector */}
      <SelectRetailer
        retailers={retailers}
        selectedRetailer={selectedRetailer}
        onSelectRetailer={setSelectedRetailer}
      />

      {/* Delivery Item Entry Form */}
      <DeliveryItemForm
        onAddItem={handleAddItem}
        onActiveItemChange={setActiveItem}
      />

      {/* Added Items List */}
      <AddedItemsList items={addedItems} onRemoveItem={handleRemoveItem} />

      {/* Summary Card and Submit Action */}
      <DeliverySummary
        totalCylinders={totalCylinders}
        totalAmount={totalAmount}
        paymentMode={paymentMode}
        onTogglePaymentMode={togglePaymentMode}
        onConfirm={handleConfirmDelivery}
      />
    </Container>
  )
}

export default delivery
