import { Inventory } from "./common"

export interface Retailer {
  id: string
  name: string
  shop: string
  due: number
  phone: string
  area: string
  address: string
  status: string
}

export interface DeliveryItem {
  id: string
  type: 'Package' | 'Refill' | 'Empty'
  company: string
  size: string
  quantity: number
  rate: number
}

export type DeliveryItemFormProps = {
  loadedInventory: Inventory[]
  onAddItem: (item: Omit<DeliveryItem, 'id'>) => void
}