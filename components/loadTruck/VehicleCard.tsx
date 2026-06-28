import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../common/Dropdown'
import SectionContainer from '../common/SectionContainer'
import { VehicleCardProps } from '@/types/laodTruck'
import { Driver } from '@/types/common'

const VehicleCard = ({ trucks, drivers, vehicle, setVehicle, availableSpace }: VehicleCardProps) => {
  const [driver, setDriver] = useState<Driver | null>(null)

  return (
    <SectionContainer>
      <Text className='font-bold text-xl text-center'>Select Vehicle</Text>
      <Dropdown
        label="Select Truck"
        items={trucks}
        selectedId={vehicle?.id || null}
        onSelect={(id) => setVehicle(trucks.find((truck) => truck.id === id) || null)}
        getLabel={(item) => item.number}
        getKey={(item) => item.id}
        placeholder="Choose a truck"
      />

      <View className="mt-4">
        <Dropdown
          label="Select Driver"
          items={drivers}
          selectedId={driver?.id || null}
          onSelect={(id) => setDriver(drivers.find((driver) => driver.id === id) || null)}
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          placeholder="Choose a driver"
        />
      </View>

      <View className='mt-2 bg-gray-100 p-2 rounded-lg'>
        <View className='flex-row justify-between'>
          <Text className='font-semibold text-lg'>Total Capacity: {vehicle?.capacity}</Text>
          <Text className='font-semibold text-lg'>Remaining Cylinder: {vehicle?.remainingCylinder}</Text>
        </View>
        <Text className='font-semibold text-lg text-center mt-2'>Available Space: {availableSpace || 0}</Text>
      </View>
    </SectionContainer>
  )
}

export default VehicleCard