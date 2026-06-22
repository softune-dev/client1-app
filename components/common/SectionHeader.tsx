import { Text } from 'react-native'

const SectionHeader = ({ title, className }: { title: string; className?: string }) => {
    return (
        <Text className={`text-xl font-bold pb-2 ${className}`}>{title}</Text>
    )
}

export default SectionHeader