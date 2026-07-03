import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          header: ({ options }) => (
            <View className="bg-primary justify-between px-4"
              style={{
                height: 130 + insets.top,
                paddingTop: 25 + insets.top
              }}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-white text-3xl font-bold">
                    {options.title ?? 'My App'}
                  </Text>
                  <Text className="text-white">Manager: <Text className="font-semibold uppercase">Neymar</Text></Text>
                </View>

                <View>
                  <Ionicons name="notifications-outline" size={26} color="white" />
                </View>
              </View>
            </View>
          ),
          tabBarStyle: {
            height: 80 + insets.bottom,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="loadTruck"
          options={{
            title: "Load Truck",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="truck-loading" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="delivery"
          options={{
            title: "Delivery",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="truck-delivery"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history-edu" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}

export default TabLayout;
