import React from 'react'
import Navbar from '../Navbar'
import './style.css'

import { Global } from './Global'

export default function ScreenData() {
    const columns = [
        { accessor: 'name', label: 'Name' },
        { accessor: 'quantity', label: 'Quantity' },
        { accessor:'city',label:'City'},
        { accessor: 'status', label: 'Status', format: (value) => (value ? '✔️' : '✖️') },
        { accessor: 'date', label: 'Purchase Date' },
        { accessor: 'price', label: 'Price' },
      ]
    
      const rows = [
        { id: 1, name: 'Abi', quantity: 36,city:'Kerala', status: true, date: '02-28-2022',price:1520 },
        { id: 2, name: 'Anand', quantity: 20,city:'Chennai', status: false, date: '03-02-2022',price:2635 },
        { id: 3, name: 'Bala', quantity: 6,city:'Bangalore', status: true, date: '05-13-2022',price:950 },
        { id: 4, name: 'David', quantity: 16,city:'Kerala', status: true, date: '07-25-2022',price:1400 },
        { id: 5, name: 'Gokul', quantity: 14,city:'Bangalore', status: true, date: '09-18-2022',price:1920 },
        { id: 6, name: 'Peter', quantity: 5,city:'Kerala', status: true, date: '12-12-2022',price:420 },
        { id: 7, name: 'Kamal', quantity: 21,city:'Chennai', status: false, date: '06-15-2022',price:1200 },
        { id: 8, name: 'Vijay', quantity: 26,city:'Kerala', status: true, date: '06-17-2022',price:1650 },
        { id: 9, name: 'Pavi', quantity: 18,city:'Chennai', status: true, date: '12-01-2022',price:3200 },
        { id: 10, name: 'Devi', quantity: 29,city:'Kerala', status: false, date: '05-18-2022',price:4500},
        { id: 11, name: 'Tamil', quantity: 32,city:'Bangalore', status: true, date: '08-09-2022',price:2600 },
        { id: 12, name: 'Raja', quantity: 12,city:'Salem', status: true, date: '07-08-2022',price:1150 },
        { id: 13, name: 'Kannan', quantity: 9,city:'Bangalore', status: true, date: '05-28-2022',price:850 },
        { id: 8, name: null, age: null, is_manager: null, start_date: null },
      ]
  return (
    <div>
        <Navbar/><br/><br/>
    <div className="App">
      <h1>Screen 3</h1>
      <h4>Global Filter,Pagination,Individual Column Filter</h4>

      <Global rows={rows} columns={columns} />
    </div>
    </div>
  )
}