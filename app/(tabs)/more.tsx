import { Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold">More</Text>
      <Text className="text-sm text-gray-500 mt-2">
        Additional options and settings will appear here.
      </Text>
    </View>
  );
}
