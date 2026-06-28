import Container from '@/components/common/Container'
import AddedBatch from '@/components/loadTruck/AddedBatch'
import ConfirmButton from '@/components/loadTruck/ConfirmButton'
import CylinderBatchForm from '@/components/loadTruck/CylinderBatchForm'
import VehicleCard from '@/components/loadTruck/VehicleCard'
import { Driver, Product, Truck } from '@/types/common'
import { AddedItem } from '@/types/laodTruck'
import { useState } from 'react'

const trucks: Truck[] = [
  { id: "1", number: 'DhakaMetro-09-A-5555', registration: 'reg-7870', capacity: 100, remainingCylinder: 10, status: 'active' },
  { id: "2", number: 'DhakaMetro-09-A-5556', registration: 'reg-7871', capacity: 200, remainingCylinder: 20, status: 'active' },
  { id: "3", number: 'DhakaMetro-09-A-5557', registration: 'reg-7872', capacity: 300, remainingCylinder: 30, status: 'active' },
]

const drivers: Driver[] = [
  { id: "1", name: 'Lionel Messi', phone: '1234567890', license: '1234567890', nid: '1234567890', presentAddress: '123 Main St', permanentAddress: '123 Main St', status: 'active' },
  { id: "2", name: 'Cristiano Ronaldo', phone: '1234567890', license: '1234567890', nid: '1234567890', presentAddress: '123 Main St', permanentAddress: '123 Main St', status: 'active' },
  { id: "3", name: 'Kylian Mbappé', phone: '1234567890', license: '1234567890', nid: '1234567890', presentAddress: '123 Main St', permanentAddress: '123 Main St', status: 'active' },
]

const products: Product[] = [
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
    type: 'Empty Cylinder',
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
    type: 'Package',
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
    type: 'Package',
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

const loadTruck = () => {
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [addedItems, setAddedItems] = useState<AddedItem[]>([])

  const availableSpace =
    (selectedTruck?.capacity ?? 0) -
    (selectedTruck?.remainingCylinder ?? 0) -
    addedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleTruckChange = (truck: Truck | null) => {
    setSelectedTruck(truck);
    setAddedItems([]);
  };

  const handleAddBatch = (newItem: AddedItem) => {
    setAddedItems((prev) => [...prev, newItem]);
  }

  const handleDelete = (id: string) => {
    setAddedItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <Container>
      <VehicleCard
        trucks={trucks}
        drivers={drivers}
        vehicle={selectedTruck}
        setVehicle={handleTruckChange}
        availableSpace={availableSpace}
      />

      <CylinderBatchForm
        key={selectedTruck?.id ?? "no-truck"}
        products={products}
        onAddBatch={handleAddBatch}
        availableSpace={availableSpace}
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