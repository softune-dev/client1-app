import Container from '@/components/common/Container'
import { View, Text } from 'react-native'

const loadTruck = () => {
  return (
    <Container>
      {/* truck info */}
      <View className="bg-white rounded-xl py-3 px-4">
        <Text className='font-bold text-xl'>Select Vehicle</Text>
      </View>
    </Container>
  )
}

export default loadTruck