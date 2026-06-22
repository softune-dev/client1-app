export interface AddedItem {
  id: string
  supplier: string
  type: string
  size: string
  quantity: number
}

export type AddedBatchCardProps = {
  item: {
    id: string
    supplier: string
    type: string
    size: string
    quantity: number
  }
  onDelete: (id: string) => void
}