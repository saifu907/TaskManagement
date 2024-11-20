import { useState } from 'react'

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
function App() {


  const [searchKey, setSearchKey] = useState('');
  
  return (
    <>
    {/* <div className='row'>

          <div className='bg-light text-dark p-0 vh-100 sticky-top d-flex flex-column justify-content-between sidebarul border-end shadow'>

      </div>
    </div> */}
    <ToastContainer />

    <div className="row m-0">
      <div className="col-3 p-0 m-0">



      <div className="d-flex sticky-top flex-column  p-3 bg-light m-0  vh-100" >
        <Sidebar />
      </div>
      </ div>
      <div className="col-9 p-0 m-0 greycolor">
        

        
        <Navbars  setSearchKey={setSearchKey}/>
        <div className='ms-3 pt-3 '>
          <Routes>
            <Route path="/" element={<AllTask searchKey={searchKey}  />} />
            <Route path="/Completed" element={<Completed searchKey={searchKey}/>} />
            <Route path="/task/:id" element={<TaskDetail searchKey={searchKey}/>} />
                <Route path="/InProgress" element={<InProgress searchKey={searchKey}/>} />
                <Route path="/Pending" element={<Pending searchKey={searchKey}/>} />
                <Route path="/OverDue" element={<OverDue searchKey={searchKey}/>} />
                {/* <Route path="/pending-tasks" element={<PendingTasks />} /> */}
            {/* <Route path="/add" element={<TaskForm isEditing={false} />} />
            <Route path="/edit/:id" element={<EditTask />} /> */}
          </Routes>
            </div>
      </div>
    </div>
      
    </>
  )
}

export default App