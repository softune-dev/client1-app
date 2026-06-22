import { AddedItem } from '@/types/laodTruck'
import { Text, View } from 'react-native'
import SectionContainer from '../common/SectionContainer'
import AddedBatchCard from './AddedBatchCard'
import SectionHeader from '../common/SectionHeader'

const AddedBatch = ({ addedItems, handleDelete }: { addedItems: AddedItem[], handleDelete: (id: string) => void }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Selected Batches" />
      {addedItems.length === 0 ? (
        <Text className="text-gray-500 text-center py-4 font-medium">
          No batch selected
        </Text>
      ) : (
        addedItems.map((item) => (
          <View key={item.id} className='pb-3'>
            <AddedBatchCard
              item={item}
              onDelete={handleDelete}
            />
          </View>
        ))
      )}
    </SectionContainer>
  )
}

export default AddedBatch