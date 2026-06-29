import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import SelectRetailer from '@/components/delivery/SelectRetailer'
import DeliveryItemForm from '@/components/delivery/DeliveryItemForm'
import DeliverySummary from '@/components/delivery/DeliverySummary'
import AddedItemsList from '@/components/delivery/AddedItemsList'
import { Retailer, DeliveryItem } from '@/types/delivery'
import { useState, useEffect } from 'react'
import { Alert, View, Platform, Keyboard } from 'react-native'
import { Inventory } from '@/types/common'

const retailers: Retailer[] = [
  { id: "1", name: 'Ronaldo', shop: 'Ronaldo Shop', due: 1200, phone: '01234567890', area: 'Boali', address: 'Boali, Madhupur, Tangail', status: 'Active' },
  { id: "2", name: 'Messi', shop: 'Messi Shop', due: 1200, phone: '01234567890', area: 'Adalotpara', address: 'Adalotpara, Madhupur, Tangail', status: 'Active' },
  { id: "3", name: 'Neymar', shop: 'Neymar Shop', due: 1200, phone: '01234567890', area: 'Charaljani', address: 'Charaljani, Madhupur, Tangail', status: 'Active' },
  { id: "4", name: 'Mbappe', shop: 'Mbappe Shop', due: 1200, phone: '01234567890', area: 'Bhuiyan Para', address: 'Bhuiyan Para, Madhupur, Tangail', status: 'Active' }
]

const loadedInventory: Inventory[] = [
  // Bashundhara
  {
    id: "1",
    supplier: 'Bashundhara',
    type: 'Package',
    size: '12kg',
    availableCylinder: 40,
  },
  {
    id: "2",
    supplier: 'Bashundhara',
    type: 'Refill',
    size: '12kg',
    availableCylinder: 55,
  },
  {
    id: "3",
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 25,
  },
  {
    id: "4",
    supplier: 'Bashundhara',
    type: 'Package',
    size: '35kg',
    availableCylinder: 30,
  },
  {
    id: "5",
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '35kg',
    availableCylinder: 15,
  },

  // Total
  {
    id: "6",
    supplier: 'Total',
    type: 'Package',
    size: '12kg',
    availableCylinder: 35,
  },
  {
    id: "7",
    supplier: 'Total',
    type: 'Refill',
    size: '15kg',
    availableCylinder: 45,
  },
  {
    id: "8",
    supplier: 'Total',
    type: 'Empty Cylinder',
    size: '15kg',
    availableCylinder: 20,
  },
  {
    id: "9",
    supplier: 'Total',
    type: 'Package',
    size: '22kg',
    availableCylinder: 28,
  },
  {
    id: "10",
    supplier: 'Total',
    type: 'Empty Cylinder',
    size: '22kg',
    availableCylinder: 18,
  },

  // Fresh
  {
    id: "11",
    supplier: 'Fresh',
    type: 'Package',
    size: '12kg',
    availableCylinder: 50,
  },
  {
    id: "12",
    supplier: 'Fresh',
    type: 'Refill',
    size: '12kg',
    availableCylinder: 60,
  },
  {
    id: "13",
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 22,
  },
  {
    id: "14",
    supplier: 'Fresh',
    type: 'Package',
    size: '35kg',
    availableCylinder: 40,
  },
  {
    id: "15",
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '35kg',
    availableCylinder: 16,
  },
];

const Delivery = () => {
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    retailers && retailers.length > 0 ? retailers[0] : null
  )
  const [addedItems, setAddedItems] = useState<DeliveryItem[]>([])
  const [discount, setDiscount] = useState<string>('')
  const [received, setReceived] = useState<string>('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

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

  const totalAmount = addedItems.reduce((acc, item) => acc + item.quantity * item.rate, 0)
  const discountVal = Number(discount) || 0
  const receivedVal = Number(received) || 0
  const payableAmount = Math.max(0, totalAmount - discountVal)
  const dueAmount = Math.max(0, payableAmount - receivedVal)

  // Payment Mode helper: dynamically computed based on transaction state
  const paymentMode = dueAmount === 0 ? 'Fully Paid' : receivedVal === 0 ? 'Post-paid / Due' : 'Partially Paid'

  const handleConfirmDelivery = () => {
    if (!selectedRetailer) {
      Alert.alert('Selection Required', 'Please select a retailer first.')
      return
    }

    const totalCylinders = addedItems.reduce((acc, item) => acc + item.quantity, 0)

    if (totalCylinders === 0) {
      Alert.alert('Empty Delivery', 'Please add at least one item to confirm.')
      return
    }

    const formatCurrency = (amount: number) =>
      amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

    Alert.alert(
      'Confirm Delivery',
      `Are you sure you want to confirm this delivery?\n\n` +
      `Retailer: ${selectedRetailer.shop}\n` +
      `Total Cylinders: ${totalCylinders}\n` +
      `Payment Mode: ${paymentMode}\n\n` +
      `Gross Total: ${formatCurrency(totalAmount)} BDT\n` +
      `Discount: ${formatCurrency(discountVal)} BDT\n` +
      `Net Payable: ${formatCurrency(payableAmount)} BDT\n` +
      `Received Amount: ${formatCurrency(receivedVal)} BDT\n` +
      `Due Amount: ${formatCurrency(dueAmount)} BDT`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Delivery has been confirmed successfully!')
            setAddedItems([])
            setDiscount('')
            setReceived('')
          },
        },
      ]
    )
  }

  return (
    <Container>
      <SelectRetailer
        retailers={retailers}
        selectedRetailer={selectedRetailer}
        onSelectRetailer={setSelectedRetailer}
      />

      <DeliveryItemForm
        loadedInventory={loadedInventory}
        onAddItem={handleAddItem}
      />

      <AddedItemsList items={addedItems} onRemoveItem={handleRemoveItem} />

      <DeliverySummary
        totalAmount={totalAmount}
        discount={discount}
        setDiscount={setDiscount}
        received={received}
        setReceived={setReceived}
      />

      <Button
        label="Confirm Delivery"
        onPress={handleConfirmDelivery}
        icon="check-circle"
        variant="success"
        className="mb-8"
      />

      {/* Spacer to push content above keyboard */}
      {keyboardHeight > 0 && (
        <View style={{ height: Platform.OS === 'ios' ? keyboardHeight - 50 : keyboardHeight }} />
      )}
    </Container>
  )
}

export default Delivery
