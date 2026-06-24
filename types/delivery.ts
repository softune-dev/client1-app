export interface Retailer {
  id: number
  name: string
  phone: string
  shop: string
  area: string
  address: string
}

export interface DeliveryItem {
  id: string
  type: 'Package' | 'Refill' | 'Empty'
  company: string
  size: string
  quantity: number
  rate: number
}