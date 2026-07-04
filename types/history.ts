/** A single line for one cylinder type (Package / Refill / Empty Cylinder) */
export interface CylinderLine {
  type: 'Package' | 'Refill' | 'Empty Cylinder'
  size: string      // e.g. "12kg", "35kg"
  quantity: number
  rate: number      // per cylinder
}

/** One shop delivery visit – may contain multiple cylinder types */
export interface ShopDelivery {
  id: number
  shop: string
  supplier: string
  cylinders: CylinderLine[]
  discount: number
  received: number
  date: string  // YYYY-MM-DD
  time: string
}

/** Legacy flat record kept for backward compat */
export interface DeliveryRecord {
  id: number
  shop: string
  supplier: string
  type: string
  size: string
  quantity: number
  rate: number
  discount: number
  received: number
  date: string // YYYY-MM-DD
  time: string
}