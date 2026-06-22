import { View, Text, Pressable } from 'react-native'

const ConfirmButton = () => {
  return (
    <View>
      <Pressable onPress={() => alert("Truck Loaded!")}
        className="bg-success active:bg-subscription py-4 rounded-xl shadow-md flex-row items-center justify-center gap-2"
      >
        <Text className="text-white font-semibold text-xl">
          Confirm Truck Load
        </Text>
      </Pressable>
    </View>
  )
}

export default ConfirmButton