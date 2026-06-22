import ActionButton from "@/components/dashboard/ActionButton";
import Chip from "@/components/dashboard/Chip";
import "@/global.css";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import truck from "../../assets/images/truck.webp";
import Container from "@/components/common/Container";
import SectionContainer from "@/components/common/SectionContainer";

export default function Dashboard() {
  return (
    <Container>
      <View className="gap-3">
        {/* truck info */}
        <SectionContainer className="flex-row justify-between">
          <View className="flex-row gap-2">
            <Image className="w-18 h-16" source={truck} />
            <View className="justify-between">
              <Text className="font-bold text-xl">Dhaka-TA-1234</Text>

              <View>
                <Text className="text-gray-400 font-semibold">Driver</Text>
                <Text className="font-bold">Rahim Uddin</Text>
              </View>
            </View>
          </View>

          <View className="justify-between">
            <View>
              <Text className="bg-green-100 text-green-600 font-semibold py-1 px-3 rounded-xl">
                In Transit
              </Text>
            </View>

            <View className="items-end mr-2">
              <Text className="text-gray-400 font-semibold">Helper</Text>
              <Text className="font-bold">N/A</Text>
            </View>
          </View>
        </SectionContainer>

        {/* Loaded inventory */}
        <SectionContainer className=" bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between">
            <Text className="font-extrabold text-xl">Loaded Inventory</Text>

            <Text className="font-semibold">Total: 175 Cyllinders</Text>
          </View>
          <View className="flex-row justify-between mt-1">
            <Chip
              weight="12 KG"
              count={100}
              bgClass="bg-sky-50 border-sky-200"
              textClass="text-sky-700"
            />
            <Chip
              weight="15 KG"
              count={50}
              bgClass="bg-emerald-50 border-green-200"
              textClass="text-emerald-700"
            />
            <Chip
              weight="18 KG"
              count={25}
              bgClass="bg-amber-50  border-yellow-200"
              textClass="text-amber-700"
            />
            <Chip
              weight="22 KG"
              count={0}
              bgClass="bg-rose-50 border-rose-200"
              textClass="text-rose-700"
            />
            <Chip
              weight="35 KG"
              count={0}
              bgClass="bg-purple-50 border-purple-200"
              textClass="text-purple-700"
            />
          </View>
        </SectionContainer>

        {/* Remaining inventory */}
        <SectionContainer className=" bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between">
            <Text className="font-extrabold text-xl">
              Remaining Inventory
            </Text>

            <Text className="font-semibold">Total: 125 Cyllinders</Text>
          </View>
          <View className="flex-row justify-between mt-1">
            <Chip
              weight="12 KG"
              count={70}
              bgClass="bg-sky-50 border-sky-200"
              textClass="text-sky-700"
            />
            <Chip
              weight="15 KG"
              count={30}
              bgClass="bg-emerald-50 border-green-200"
              textClass="text-emerald-700"
            />
            <Chip
              weight="18 KG"
              count={20}
              bgClass="bg-amber-50  border-yellow-200"
              textClass="text-amber-700"
            />
            <Chip
              weight="22 KG"
              count={0}
              bgClass="bg-rose-50 border-rose-200"
              textClass="text-rose-700"
            />
            <Chip
              weight="35 KG"
              count={0}
              bgClass="bg-purple-50 border-purple-200"
              textClass="text-purple-700"
            />
          </View>
        </SectionContainer>

        {/* pages buttons */}
        <View className="gap-2 px-1">
          <View className="flex-row gap-2">
            <View className="flex-1">
              <ActionButton
                label="New Delivery"
                bg="bg-blue-600"
                icon="add"
              />
            </View>
            <View className="flex-1">
              <ActionButton
                label="View Deliveries"
                bg="bg-green-600"
                icon="list"
              />
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <ActionButton
                label="Retailers"
                bg="bg-violet-600"
                icon="store"
              />
            </View>
            <View className="flex-1">
              <ActionButton
                label="Trip Return"
                bg="bg-orange-500"
                icon="keyboard-return"
              />
            </View>
          </View>
        </View>

        {/* Today's Summary */}
        <SectionContainer className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-xl font-extrabold">
            Today&apos;s Summary
          </Text>

          <View className="flex-row justify-between mt-3">
            <View className="flex-row gap-2">
              <MaterialCommunityIcons
                name="truck-delivery"
                size={24}
                color="orange"
              />
              <View>
                <Text className="font-semibold">Deliveries</Text>
                <Text className="text-2xl font-bold">8</Text>
              </View>
            </View>

            <View className="flex-row gap-2">
              <AntDesign
                name="delivered-procedure"
                size={21}
                color="green"
              />

              <View>
                <Text className="font-semibold">Delivered</Text>
                <Text className="text-2xl font-bold">50</Text>
              </View>
            </View>

            <View className="flex-row gap-2">
              <MaterialIcons name="inventory" size={22} color="red" />

              <View>
                <Text className="font-semibold">Remaining</Text>
                <Text className="text-2xl font-bold">125</Text>
              </View>
            </View>
          </View>
        </SectionContainer>

        {/* Recent Deleveries */}
        <SectionContainer className="bg-white rounded-2xl pt-4 shadow mb-12">
          <View className="flex-row justify-between items-center border-b border-gray-200 pb-2 px-4">
            <Text className="text-xl font-extrabold">
              Recent Deliveries
            </Text>
            <Text className="font-semibold text-blue-500">View All</Text>
          </View>

          <View className="px-4 pb-4">
            {[
              {
                name: "Rafiq Store",
                weight: "12 KG",
                qty: 2,
                time: "10:30 AM",
              },
              {
                name: "Molla Enterprise",
                weight: "15 KG",
                qty: 10,
                time: "10:15 AM",
              },
              {
                name: "Shapla Store",
                weight: "12 KG",
                qty: 15,
                time: "09:45 AM",
              },
            ].map((d, i) => (
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
      </View>
    </Container>
  );
}
