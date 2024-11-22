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
  
  return (
    <>

    <ToastContainer />

    <div className="row m-0">
      <div className="col-3 p-0 m-0">



      <div className="d-flex sticky-top flex-column  p-3 bg-light m-0  vh-100" >
        <Sidebar />
      </div>
      </ div>
      <div className="col-9 p-0 m-0 greycolor">
        

        
        <Navbars  setSearchKey={setSearchKey}/>
        <div className='ms-2 pt-0 ms-sm-3 pt-sm-3'>
          <Routes>
            <Route path="/" element={<AllTask   />} />
            <Route path="/Completed" element={<Completed />} />
            <Route path="/task/:id" element={<TaskDetail />} />
                <Route path="/InProgress" element={<InProgress />} />
                <Route path="/Pending" element={<Pending />} />
                <Route path="/OverDue" element={<OverDue />} />
          </Routes>
            </div>
      </div>
    </div>
      
    </>
  )
}

export default App
