import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import SectionContainer from '../common/SectionContainer'

type RecentDeliveriesProps = {
  recentDeliveriesData: {
    name: string;
    weight: string;
    qty: number;
    time: string;
  }[];
};

const RecentDeliveries = ({ recentDeliveriesData }: RecentDeliveriesProps) => {
  return (
    <SectionContainer>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-xl font-extrabold">
          Recent Deliveries
        </Text>
        <Text className="font-semibold text-blue-500">View All</Text>
      </View>

      <View className="pb-4">
        {recentDeliveriesData.map((d, i) => (
          <View
            key={i}
            className="flex-row items-center py-3 border-b border-gray-300 gap-2"
          >
            <View className="bg-green-50 p-2 rounded-xl items-center">
              <Ionicons
                name="storefront-outline"
                size={24}
                color="green"
              />
            </View>

            <View className="flex-row flex-1 justify-between">
              <View className="gap-1">
                <Text className="font-bold text-lg">{d.name}</Text>
                <View className="flex-row gap-4">
                  <Text className="text-gray-500 font-semibold">
                    {d.weight}
                  </Text>
                  <Text className="text-gray-500 font-semibold">
                    Qty: {d.qty}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-500 font-semibold">
                {d.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SectionContainer>
  )
}

export default RecentDeliveries