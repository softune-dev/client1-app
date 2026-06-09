import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  bg?: string;
  icon?: string;
};

export default function ActionButton({
  label,
  bg = "bg-blue-600",
  icon = "add",
}: Props) {
  return (
    <TouchableOpacity
      className={`${bg} rounded-2xl p-4 center`}
    >
      <View className="flex-row items-center gap-1">
        <MaterialIcons name={icon as any} size={30} color="#fff" />
        <Text className="text-white font-semibold text-lg">{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
