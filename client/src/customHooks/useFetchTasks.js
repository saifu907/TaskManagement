import { useState, useEffect } from 'react';
import { getTasks } from '../api/taskApi';
import { useDispatch } from 'react-redux';
import { setTasks } from '../features/taskList';

const useTasks = (searchKey) => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  
  const fetchTasks = async () => {
      setLoading(true);
      setError(null);


      try {
        
          const result = await getTasks(searchKey||'');
      if (result.status === 200) {
        console.log(result.data ,'hyhg' );
        
        dispatch(setTasks(result.data));
      } else {
        setError('Failed to fetch tasks.');
      }
    } catch (err) {
      setError('Error fetching tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (searchKey) {
      fetchTasks();
    }
  }, [searchKey]);

  return { loading,error,fetchTasks};
};

export default useTasks;
