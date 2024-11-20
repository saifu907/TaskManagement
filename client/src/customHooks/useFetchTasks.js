import { useState, useEffect } from 'react';
import { getTasks } from '../api/taskApi';

const useTasks = (searchKey) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
          const result = await getTasks(searchKey);
      if (result.status === 200) {
        setTasks(result.data);
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
    fetchTasks();
  }, [searchKey]);

  return { tasks, setTasks,fetchTasks, loading, error };
};

export default useTasks;
