import { View } from 'react-native'

const SectionContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <View className={`${className} bg-white rounded-2xl p-4 shadow-md mb-4`}>
      {children}
    </View>
  )
}

export default SectionContainer