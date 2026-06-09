import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TabLayout = () => (
  <View className="flex-1">
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#003591",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <View className="mr-4 rounded-full bg-white/10 p-2">
            <MaterialCommunityIcons
              name="bell-outline"
              size={22}
              color="#fff"
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: "Deliveries",
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
        name="retailers"
        options={{
          title: "Retailers",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="storefront-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  </View>
);

export default TabLayout;
