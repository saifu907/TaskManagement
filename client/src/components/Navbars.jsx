import React from 'react'
import Form from 'react-bootstrap/Form';
import { CiSearch } from "react-icons/ci";
function Navbars({ setSearchKey }) {
  return (
    <nav style={{ height: '90px' }} className="navbar sticky-top d-flex justify-content-start align-items-center bg-light ps-3">
      
   <div className="d-flex align-items-center py-1 px-3 gap-0 rounded-pill search" >
      <CiSearch className="text-muted fs-5" />
      <Form.Control
        type="text"
        placeholder="Search...."
        className="border-0 bg-transparent outline-none text-dark  searchInput"
        // style={{ outline: 'none' }}
        onChange={e=>setSearchKey(e.target.value)}
      />
    </div>
    </nav>
  );

   
  
}

export default Navbars