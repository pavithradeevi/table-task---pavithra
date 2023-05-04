import Navbar from '../Navbar'
import './styles.css'

import { Table } from './Table'

export default function Data() {
  const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'is_manager', label: 'Manager', format: (value) => (value ? '✔️' : '✖️') },
    { accessor: 'start_date', label: 'Start Date' },
  ]

  const rows = [
    { id: 1, name: 'Abi', age: 36, is_manager: true, start_date: '02-28-2012' },
    { id: 2, name: 'Anand', age: 31, is_manager: true, start_date: '05-05-2014' },
    { id: 3, name: 'Bala', age: 39, is_manager: false, start_date: '07-12-2022' },
    { id: 4, name: 'David', age: 40, is_manager: false, start_date: '02-28-2009' },
    { id: 5, name: 'Gokul', age: 20, is_manager: false, start_date: '01-01-2022' },
    { id: 6, name: 'Peter', age: 42, is_manager: true, start_date: '04-01-2002' },
    { id: 7, name: 'Kamal', age: 36, is_manager: true, start_date: '06-09-2012' },
    { id: 8, name: 'Vijay', age: 29, is_manager: false, start_date: '21-12-2017' },
    { id: 7, name: 'Pavi', age: 22, is_manager: false, start_date: '18-05-2020' },
    { id: 7, name: 'Devi', age: 46, is_manager: true, start_date: '21-01-2001' },
    { id: 7, name: 'Tamil', age: 26, is_manager: false, start_date: '12-11-2021' },
    { id: 7, name: 'Raja', age: 41, is_manager: true, start_date: '05-05-2003' },
    { id: 7, name: 'Kannan', age: 23, is_manager: false, start_date: '16-02-2022' },
    { id: 8, name: null, age: null, is_manager: null, start_date: null },
  ]

  return (
    <div>
        <Navbar/><br/><br/>
    <div className="App">
      <h1>Screen 2</h1>
      <h4>Sorting, Filtering, Pagination,Refresh</h4>

      <Table rows={rows} columns={columns} />
    </div>
    </div>
  )
}
