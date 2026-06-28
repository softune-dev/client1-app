export interface Product {
  id: string;
  supplier: string;
  type: string;
  size: string;
  availableCylinder: number;
}

export interface Truck {
  id: string;
  number: string;
  registration: string;
  capacity: number;
  remainingCylinder: number;
  status: string
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  nid: string;
  presentAddress: string;
  permanentAddress: string;
  status: string;
}

export type DropdownProps<T> = {
  label?: string
  items: T[]

  selectedId: string | null
  onSelect: (id: string) => void

  getLabel: (item: T) => string
  getKey: (item: T) => string

  placeholder?: string
  loading?: boolean
  disabled?: boolean
  emptyMessage?: string
}