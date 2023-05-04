import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Navbar() {
  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div>
        <h1 style={{ color: 'red' }}><a href="/">PARIPOORNA</a></h1>
    </div><br/>
    <div style={{display:'flex',flexDirection:'row'}}>

      <h4>Tables</h4>
      <Dropdown as={ButtonGroup}>
        <Button variant="info">Screens</Button>
        <Dropdown.Toggle split variant="success" id="dropdown-custom-2" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1" href="./table1">Screen 1</Dropdown.Item>
          <Dropdown.Item eventKey="2" href="./table2">Screen 2</Dropdown.Item>
          <Dropdown.Item eventKey="3" href="./table3">Screen 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    
    </div>
  );
}
