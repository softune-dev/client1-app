import React from "react";
import { Text, View } from "react-native";

type Props = {
  weight: string;
  count: number | string;
  bgClass?: string;
  textClass?: string;
};

export default function Chip({
  weight,
  count,
  bgClass = "bg-sky-50",
  textClass = "text-sky-700",
}: Props) {
  return (
    <View
      className={`${bgClass} rounded-lg py-2 px-4 items-center justify-center border border-gray-100`}
    >
      <Text className={`${textClass} text-sm font-bold`}>{weight}</Text>
      <Text className="text-xl font-bold mt-1 text-gray-800">{count}</Text>
    </View>
  );
}
