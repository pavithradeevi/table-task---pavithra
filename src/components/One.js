import React, { useState, useEffect, useRef } from 'react';
import { Slider } from 'primereact/slider';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { CustomerService } from './CustomerService';
import Navbar from '../Navbar';
import { Paginator } from 'primereact/paginator';

export default function One() {
    
    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        // status: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.CONTAINS },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);
    const [statuses] = useState(['unqualified','nonpaid','paid', 'qualified', 'new', 'negotiation', 'renewal']);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'nonpaid':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'paid':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => {
            setCustomers(getCustomers(data));
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} /> */}
                <span>{rowData.country.name}</span>
            </div>
        );
    };

   

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;

        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{representative.name}</span>
            </div>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option.name}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
    };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const onInputTextFilter = (e, field) => {
        let _filters = { ...filters };
        _filters[field].value = e.target.value;
        setFilters(_filters);
    };

    

    



    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    const header = renderHeader();

    return (
        <div>

        <Navbar/><br/><br/>
        <div className="card">
        <div className='App'>
            
        <h1>Screen 1</h1><br/>
        <h4>GlobalFilter,Pagination and Individual Column Filter</h4>
        </div><br/><br/>
        <DataTable value={customers} loading={loading} header={renderHeader()} globalFilter={filters.global.value} 
    emptyMessage="No customers found." responsive>
    <Column field="name" header="Name" filter filterPlaceholder="Search by name" filterMatchMode={filters.name.matchMode} 
        onFilter={(e) => onInputTextFilter(e, 'name')} />
    <Column field="country.name" header="Country" filter filterPlaceholder="Search by country" filterMatchMode={filters['country.name'].matchMode} 
        onFilter={(e) => onInputTextFilter(e, 'country.name')} body={countryBodyTemplate} />
    <Column field="representative.name" header="Representative" filter filterPlaceholder="Search by representative" filterMatchMode={filters.representative.matchMode} 
        onFilter={(e) => onInputTextFilter(e, 'representative')} body={representativeBodyTemplate} />
    {/* <Column field="date" header="Date" filter filterPlaceholder="Search by date" filterMatchMode={filters.date.constraints[0].matchMode} 
        onFilter={(e) => onDateFilter(e, 'date')} body={dateBodyTemplate} /> */}
        <Column field="status" header="Status" filter filterPlaceholder="Filter by status" filterMatchMode={FilterMatchMode.CONTAINS} />
    {/* <Column field="balance" header="Balance" filter filterPlaceholder="Search by balance" filterMatchMode={filters.balance.constraints[0].matchMode} 
        onFilter={(e) => onInputNumberFilter(e, 'balance')} body={balanceBodyTemplate} />
    <Column field="activity" header="Activity" filter filterPlaceholder="Search by activity" filterMatchMode={filters.activity.matchMode} 
        onFilter={(e) => onSliderFilter(e, 'activity')} body={activityBodyTemplate} /> */}
</DataTable>
        </div>
        </div>
    );
}



