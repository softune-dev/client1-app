import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'
import { AddedBatchCardProps } from '@/types/laodTruck'

export default function AddedBatchCard({
  item,
  onDelete,
}: AddedBatchCardProps) {
  return (
    <View className="flex-row items-center border-b border-border pb-2 mb-1">
      <View className={` ${item.supplier === 'Bashundhara' ? 'bg-bashundhara/20' : item.supplier === 'Total' ? 'bg-total/20' : item.supplier === 'Total' ? 'bg-fresh/20' : 'bg-primary/20'} p-2 rounded-2xl items-center mr-2`}>
        <MaterialCommunityIcons name="gas-cylinder" size={24} className={` ${item.supplier === 'Bashundhara' ? 'text-bashundhara' : item.supplier === 'Total' ? 'text-total' : item.supplier === 'Fresh' ? 'text-fresh' : 'text-primary'}`} />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-lg">
          {item.supplier}
        </Text>

        <Text className="text-gray-500">
          {item.type} • {item.size}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Text className="font-bold">
          {item.quantity}
        </Text>

        <Pressable
          onPress={() => onDelete(item.id)}
        >
          <MaterialIcons name="highlight-remove" size={20} color="red" className='bg-red-50 rounded-full p-1' />
        </Pressable>
      </View>
    </View>
  )
}