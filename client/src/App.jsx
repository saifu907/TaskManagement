import { useEffect, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import AllTask from './pages/AllTask'
import Navbars from './components/Navbars'
import Completed from './pages/Completed'
import TaskDetail from './pages/TaskDetail'
import InProgress from './pages/InProgress'
import Pending from './pages/Pending'
import OverDue from './pages/OverDue'
import { ToastContainer } from 'react-toastify'
import useTasks from './customHooks/useFetchTasks'
import { useSelector } from 'react-redux'
import { useTheme } from './context/mode'
function App() {
  
  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState('')
  const {  fetchTasks, loading, error } = useTasks(debouncedSearchKey);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300); 

    return () => clearTimeout(timeout); 
  }, [searchKey]);


  useEffect(() => {
    fetchTasks();
  }, []);
  
  const { themeMode, toggleTheme } = useTheme();

  
  return (
    <>

    <ToastContainer />
<div className= {`p-0 m-0  vh-100 ${themeMode === 'dark' ? 'darklightcolor' : 'whitelightcolor'}`}>


    <div className= {` row m-0  ${themeMode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} >
      <div className="col-12 col-sm-3 p-0 m-0">

        {/* Sidebar for larger screens */}
        <div className="d-none d-sm-flex flex-column sticky-top p-3  vh-100">
          <Sidebar />
        </div>

        {/* Sidebar for smaller screens */}
        <div className={`d-flex d-sm-none fixed-bottom p-2 ${themeMode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
          <Sidebar />
        </div>


      </ div>
      <div className= {`col-12 col-sm-9 p-0 m-0 ${themeMode === 'dark' ? 'darklightcolor' : 'whitelightcolor'}`}>

        
        <Navbars  setSearchKey={setSearchKey}/>
        
        <div className='ms-2 pt-0 ms-sm-3 pt-sm-3 '>
          <Routes>
            <Route path="/" element={<AllTask loading={loading }   />} />
            <Route path="/Completed" element={<Completed loading={loading } />} />
            <Route path="/task/:id" element={<TaskDetail loading={loading } />} />
                <Route path="/InProgress" element={<InProgress loading={loading } />} />
                <Route path="/Pending" element={<Pending loading={loading } />} />
                <Route path="/OverDue" element={<OverDue loading={loading } />} />
          </Routes>
            </div>
      </div>
    </div>
</div>
      
    </>
  )
}

export default App
