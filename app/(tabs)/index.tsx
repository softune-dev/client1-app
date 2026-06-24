import "@/global.css";
import Container from "@/components/common/Container";
import TruckInfo from "@/components/dashboard/TruckInfo";
import LoadedInventory from "@/components/dashboard/LoadedInventory";
import TodaysSummary from "@/components/dashboard/TodaysSummary";
import RecentDeliveries from "@/components/dashboard/RecentDeliveries";
import { Product } from "@/types/common";

const products: Product[] = [
  // Bashundhara
  {
    id: 1,
    supplier: 'Bashundhara',
    type: 'Package',
    size: '12kg',
    availableCylinder: 40,
  },
  {
    id: 2,
    supplier: 'Bashundhara',
    type: 'Refill',
    size: '12kg',
    availableCylinder: 55,
  },
  {
    id: 3,
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 25,
  },
  {
    id: 4,
    supplier: 'Bashundhara',
    type: 'Package',
    size: '35kg',
    availableCylinder: 30,
  },
  {
    id: 5,
    supplier: 'Bashundhara',
    type: 'Empty Cylinder',
    size: '35kg',
    availableCylinder: 15,
  },

  // Total
  {
    id: 6,
    supplier: 'Total',
    type: 'Package',
    size: '12kg',
    availableCylinder: 35,
  },
  {
    id: 7,
    supplier: 'Total',
    type: 'Refill',
    size: '15kg',
    availableCylinder: 45,
  },
  {
    id: 8,
    supplier: 'Total',
    type: 'Empty Cylinder',
    size: '15kg',
    availableCylinder: 20,
  },
  {
    id: 9,
    supplier: 'Total',
    type: 'Package',
    size: '22kg',
    availableCylinder: 28,
  },
  {
    id: 10,
    supplier: 'Total',
    type: 'Empty Cylinder',
    size: '22kg',
    availableCylinder: 18,
  },

  // Fresh
  {
    id: 11,
    supplier: 'Fresh',
    type: 'Package',
    size: '12kg',
    availableCylinder: 50,
  },
  {
    id: 12,
    supplier: 'Fresh',
    type: 'Refill',
    size: '12kg',
    availableCylinder: 60,
  },
  {
    id: 13,
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '12kg',
    availableCylinder: 22,
  },
  {
    id: 14,
    supplier: 'Fresh',
    type: 'Package',
    size: '35kg',
    availableCylinder: 40,
  },
  {
    id: 15,
    supplier: 'Fresh',
    type: 'Empty Cylinder',
    size: '35kg',
    availableCylinder: 16,
  },
];

const recentDeliveriesData = [
  {
    name: "Rafiq Store",
    weight: "12 KG",
    qty: 2,
    time: "10:30 AM",
  },
  {
    name: "Molla Enterprise",
    weight: "15 KG",
    qty: 10,
    time: "10:15 AM",
  },
  {
    name: "Shapla Store",
    weight: "12 KG",
    qty: 15,
    time: "09:45 AM",
  },
]

export default function Dashboard() {
  return (
    <Container>
      <TruckInfo />
      <LoadedInventory products={products} />
      <TodaysSummary />
      <RecentDeliveries recentDeliveriesData={recentDeliveriesData} />
    </Container>
  );
}
