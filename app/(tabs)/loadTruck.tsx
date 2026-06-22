import Container from '@/components/common/Container'
import AddedBatch from '@/components/loadTruck/AddedBatch'
import ConfirmButton from '@/components/loadTruck/ConfirmButton'
import CylinderBatchForm from '@/components/loadTruck/CylinderBatchForm'
import VehicleCard from '@/components/loadTruck/VehicleCard'
import { Product } from '@/types/common'
import { AddedItem } from '@/types/laodTruck'
import { useState } from 'react'

const products: Product[] = [
  {
    id: 1,
    supplier: 'Bashundhara',
    type: 'Package',
    size: '12kg',
    availableCylinder: 40
  },
  {
    id: 2,
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 50
  },
  {
    id: 3,
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 15
  },
  {
    id: 4,
    supplier: 'Bashundhara',
    type: 'Package',
    size: '35kg',
    availableCylinder: 80
  },
  {
    id: 5,
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '35kg',
    availableCylinder: 60
  },

  {
    id: 6,
    supplier: 'Total',
    type: 'Package',
    size: '12kg',
    availableCylinder: 10
  },
  {
    id: 7,
    supplier: 'Total',
    type: 'Package',
    size: '15kg',
    availableCylinder: 55
  },
  {
    id: 8,
    supplier: 'Total',
    type: 'Empty Cylinder',
    size: '15kg',
    availableCylinder: 10
  },
  {
    id: 9,
    supplier: 'Total',
    type: 'Package',
    size: '22kg',
    availableCylinder: 40
  },
  {
    id: 10,
    supplier: 'Total',
    type: 'Package',
    size: '22kg',
    availableCylinder: 35
  },

  {
    id: 11,
    supplier: 'Fresh',
    type: 'Package',
    size: '12kg',
    availableCylinder: 70
  },
  {
    id: 12,
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 65
  },
  {
    id: 13,
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 20
  },
  {
    id: 14,
    supplier: 'Fresh',
    type: 'Package',
    size: '35kg',
    availableCylinder: 90
  },
  {
    id: 15,
    supplier: 'Fresh',
    type: 'Package',
    size: '35kg',
    availableCylinder: 55
  },
];

const loadTruck = () => {
  const [addedItems, setAddedItems] = useState<AddedItem[]>([])

  const handleAddBatch = (newItem: AddedItem) => {
    setAddedItems((prev) => [...prev, newItem])
  }

  const handleDelete = (id: string) => {
    setAddedItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Container>
      <VehicleCard />

      <CylinderBatchForm
        products={products}
        onAddBatch={handleAddBatch}
      />

      <AddedBatch
        addedItems={addedItems}
        handleDelete={handleDelete}
      />

      <ConfirmButton />
    </Container>
  )
}

export default loadTruck