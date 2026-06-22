import React from 'react'
import { ScrollView, View } from 'react-native'

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <View className={`${className} bg-gray-100 rounded-t-2xl -mt-8 z-50`}>
      <ScrollView className="px-2 -mt-4">
        {children}
      </ScrollView>
    </View>
  )
}

export default Container