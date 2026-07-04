import React, { useState, useMemo } from 'react'
import { View, Text } from 'react-native'
import Container from '@/components/common/Container'
import SectionContainer from '@/components/common/SectionContainer'
import { MaterialIcons } from '@expo/vector-icons'

import { ShopDelivery } from '@/types/history'
import { isValidDate } from '@/components/history/helpers'
import DateRangeFilter from '@/components/history/DateRangeFilter'
import SummaryCards from '@/components/history/SummaryCards'
import DateGroup from '@/components/history/DateGroup'


const deliveryHistory: ShopDelivery[] = [
  {
    id: 1, shop: 'Abul Store', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Package', size: '12kg', quantity: 20, rate: 1200 },
      { type: 'Refill',  size: '12kg', quantity: 15, rate: 900  },
      { type: 'Empty Cylinder', size: '12kg', quantity: 4, rate: 0 },
    ],
    discount: 500, received: 39500, date: '2025-06-12', time: '10:30 AM',
  },
  {
    id: 2, shop: 'Molla Enterprise', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Refill', size: '12kg', quantity: 5, rate: 900 },
    ],
    discount: 0, received: 4500, date: '2025-06-12', time: '11:15 AM',
  },
  {
    id: 3, shop: 'Shapla Store', supplier: 'Total',
    cylinders: [
      { type: 'Package',        size: '35kg', quantity: 3, rate: 3200 },
      { type: 'Empty Cylinder', size: '35kg', quantity: 2, rate: 0    },
    ],
    discount: 200, received: 9400, date: '2025-06-12', time: '02:45 PM',
  },
  {
    id: 4, shop: 'Maha Gas Store', supplier: 'Fresh',
    cylinders: [
      { type: 'Refill',  size: '12kg', quantity: 8,  rate: 850 },
      { type: 'Package', size: '12kg', quantity: 3,  rate: 1100 },
    ],
    discount: 0, received: 0, date: '2025-06-11', time: '09:00 AM',
  },
  {
    id: 5, shop: 'Rafiq Store', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Package',        size: '12kg', quantity: 15, rate: 1200 },
      { type: 'Empty Cylinder', size: '12kg', quantity: 6,  rate: 0    },
    ],
    discount: 1000, received: 17000, date: '2025-06-11', time: '01:30 PM',
  },
  {
    id: 6, shop: 'Babul Store', supplier: 'Total',
    cylinders: [
      { type: 'Package', size: '22kg', quantity: 6,  rate: 2200 },
      { type: 'Refill',  size: '22kg', quantity: 4,  rate: 1600 },
    ],
    discount: 500, received: 12700, date: '2025-06-11', time: '04:00 PM',
  },
  {
    id: 7, shop: 'Khalil Gas', supplier: 'Fresh',
    cylinders: [
      { type: 'Refill',         size: '35kg', quantity: 4, rate: 2800 },
      { type: 'Empty Cylinder', size: '35kg', quantity: 3, rate: 0    },
    ],
    discount: 0, received: 11200, date: '2025-06-10', time: '08:30 AM',
  },
  {
    id: 8, shop: 'Nayan Store', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Package', size: '12kg', quantity: 20, rate: 1200 },
      { type: 'Refill',  size: '12kg', quantity: 10, rate: 900  },
      { type: 'Empty Cylinder', size: '12kg', quantity: 5, rate: 0 },
    ],
    discount: 2000, received: 22000, date: '2025-06-10', time: '11:00 AM',
  },
  {
    id: 9, shop: 'Sumon Enterprise', supplier: 'Total',
    cylinders: [
      { type: 'Package', size: '12kg', quantity: 7, rate: 1150 },
    ],
    discount: 300, received: 7750, date: '2025-06-09', time: '10:00 AM',
  },
  {
    id: 10, shop: 'Hasan Gas House', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Refill',  size: '12kg', quantity: 12, rate: 900  },
      { type: 'Package', size: '12kg', quantity: 5,  rate: 1200 },
      { type: 'Empty Cylinder', size: '12kg', quantity: 8, rate: 0 },
    ],
    discount: 500, received: 10300, date: '2025-06-09', time: '02:00 PM',
  },
  {
    id: 11, shop: 'Rahim Store', supplier: 'Fresh',
    cylinders: [
      { type: 'Package', size: '12kg', quantity: 9, rate: 1100 },
      { type: 'Refill',  size: '12kg', quantity: 4, rate: 850  },
    ],
    discount: 0, received: 9900, date: '2025-06-08', time: '09:30 AM',
  },
  {
    id: 12, shop: 'Kamal Gas', supplier: 'Bashundhara',
    cylinders: [
      { type: 'Package',        size: '35kg', quantity: 5, rate: 3200 },
      { type: 'Empty Cylinder', size: '35kg', quantity: 4, rate: 0    },
    ],
    discount: 600, received: 15400, date: '2025-06-08', time: '03:00 PM',
  },
]

const History = () => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filterActive, setFilterActive] = useState(false)

  const { grouped, totalSales, totalDeliveries, totalDue } = useMemo(() => {
    let data = [...deliveryHistory].sort((a, b) => b.date.localeCompare(a.date))

    if (filterActive) {
      if (fromDate && isValidDate(fromDate)) {
        data = data.filter(d => d.date >= fromDate)
      }
      if (toDate && isValidDate(toDate)) {
        data = data.filter(d => d.date <= toDate)
      }
    }

    // Group by date
    const groups: Record<string, ShopDelivery[]> = {}
    data.forEach(r => {
      if (!groups[r.date]) groups[r.date] = []
      groups[r.date].push(r)
    })

    // Totals
    let totalSales = 0
    let totalDue = 0
    data.forEach(r => {
      const gross = r.cylinders.reduce((s, c) => s + c.quantity * c.rate, 0)
      const payable = Math.max(0, gross - r.discount)
      const due = Math.max(0, payable - r.received)
      totalSales += payable
      totalDue += due
    })

    return { grouped: groups, totalSales, totalDeliveries: data.length, totalDue }
  }, [fromDate, toDate, filterActive])

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <Container>
      {/* Date Range Filter */}
      <DateRangeFilter
        fromDate={fromDate}
        toDate={toDate}
        filterActive={filterActive}
        onFromChange={setFromDate}
        onToChange={setToDate}
        onApply={() => setFilterActive(true)}
        onClear={() => { setFromDate(''); setToDate(''); setFilterActive(false) }}
      />

      {/* Summary Cards */}
      <SummaryCards
        totalSales={totalSales}
        totalDeliveries={totalDeliveries}
        totalDue={totalDue}
      />

      {/* History List */}
      {sortedDates.length === 0 ? (
        <SectionContainer>
          <View className="items-center py-8 gap-3">
            <MaterialIcons name="history" size={48} color="#d1d5db" />
            <Text className="text-gray-400 font-medium text-base">No deliveries found</Text>
            <Text className="text-gray-300 text-sm text-center">
              {filterActive
                ? 'Try adjusting the date range filter'
                : 'No delivery history available'}
            </Text>
          </View>
        </SectionContainer>
      ) : (
        sortedDates.map(date => (
          <DateGroup key={date} date={date} records={grouped[date]} />
        ))
      )}

      {/* Bottom spacer */}
      <View style={{ height: 24 }} />
    </Container>
  )
}

export default History