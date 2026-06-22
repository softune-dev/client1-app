import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../common/Dropdown'
import SectionContainer from '../common/SectionContainer'

const vehicles = [
  { id: '1', number: 'Dhaka-TA-1234', capacity: '100' },
  { id: '2', number: 'Dhaka-TA-1235', capacity: '100' },
  { id: '3', number: 'Dhaka-TA-1236', capacity: '100' },
]
const drivers = [
  { id: '1', name: 'Lionel Messi' },
  { id: '3', name: 'Cristiano Ronaldo' },
  { id: '2', name: 'Kylian Mbappé' },
]

const VehicleCard = () => {
  const [vehicleId, setVehicleId] = useState<string | null>(null)
  const [driverId, setDriverId] = useState<string | null>(null)

  return (
    <SectionContainer>
      <Text className='font-bold text-xl text-center'>Select Vehicle</Text>
      <Dropdown
        label="Select Truck"
        items={vehicles}
        selectedId={vehicleId}
        onSelect={setVehicleId}
        getLabel={(item) => item.number}
        getKey={(item) => item.id}
        placeholder="Choose a truck"
      />

      <View className="mt-4">
        <Dropdown
          label="Select Driver"
          items={drivers}
          selectedId={driverId}
          onSelect={setDriverId}
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          placeholder="Choose a driver"
        />
      </View>
    </SectionContainer>
  )
}

export default VehicleCard