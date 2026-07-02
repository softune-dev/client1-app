import { Driver, Truck } from "./common"

export type VehicleCardProps = {
  trucks: Truck[]
  drivers: Driver[]
  vehicle: Truck | null
  setVehicle: (vehicle: Truck | null) => void
  availableSpace: number
}

export interface AddedItem {
  id: string
  supplier: string
  type: string
  size: string
  quantity: number
}

export type AddedBatchCardProps = {
  item: AddedItem
  onDelete: (id: string) => void
}

