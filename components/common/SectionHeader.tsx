import { Text } from 'react-native'

const SectionHeader = ({ title, className }: { title: string; className?: string }) => {
    return (
        <Text className={`text-xl font-semibold ${className}`}>{title}</Text>
    )
}

export default SectionHeader