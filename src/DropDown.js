import React, { useState } from 'react';

const Dropdown = ({ options, id, label, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTable, setSelectedTable] = useState('');

//   const handleOptionChange = (event) => {
//     const value = event.target.value;
//     setSelectedOption(value);
//     if (onChange) {
//       onChange(value, selectedTable);
//     }
//   };

  const handleTableChange = (event) => {
    const value = event.target.value;
    setSelectedTable(value);
    if (onChange) {
      onChange(selectedOption, value);
    }
  };

  return (
    <div>
    
      <label htmlFor={id}>{label}</label>
      {/* <select id={id} value={selectedOption} onChange={handleOptionChange}>
        <option value="">--Please choose an option--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> */}
      <select id={`${id}-table`} value={selectedTable} onChange={handleTableChange}>
        <option value="">--Please choose a table--</option>
        <option value="table1">Table 1</option>
        <option value="BasicFilterDemo">BasicFilterDemo</option>
        <option value="table2">Table 2</option>
        <option value="table3">Table 3</option>
      </select>
    </div>
  );
};

export default Dropdown;
