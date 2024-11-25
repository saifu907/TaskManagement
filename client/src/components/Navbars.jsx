import React from 'react'
import Form from 'react-bootstrap/Form';
import { CiSearch } from "react-icons/ci";
import { useTheme } from '../context/mode';
import Switch from "react-switch";
function Navbars({ setSearchKey }) {
  const { themeMode , toggleTheme } = useTheme(); 
  const isDarkMode = themeMode === "dark";

  return (
    <nav style={{ height: '90px' }} className={`navbar sticky-top d-flex justify-content-between align-items-center  px-3 ${themeMode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className={`d-flex align-items-center py-1 px-3 gap-0 rounded-pill ${themeMode === 'dark' ? 'darklightcolor  dark' : 'whitelightcolor light'}`}>
      <CiSearch className="fs-5" />
      <Form.Control
        type="text"
        placeholder="Search...."
        className={`border-0 bg-transparent outline-none  textplaceholder   searchInput ${themeMode === 'dark' ? 'text-light' : 'text-dark'}`}
        onChange={e=>setSearchKey(e.target.value)}
      />
       
    </div>
    <div className={` ${isDarkMode ? "text-light" : "text-dark"}`}>
    <label className=''>
        <Switch 
        className='toggle ' 
        offColor="#fff" 
        offHandleColor="#fff" 
        onColor="#000" 
        onHandleColor="#000" 
        checkedIcon={"Dark"} 
        uncheckedIcon={"Light"} 
        onChange={toggleTheme} 
        checked={isDarkMode} 
        width={69} 
        height={35}
        activeBoxShadow='5px 5px 5px 5px green inset'
        boxShadow='0px 0px 0px 2px inset'
        />
      </label>
</div>
    
   
  

    </nav>
  );

   
  
}

export default Navbars