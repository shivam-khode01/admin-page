import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [content, setContent] = useState('');
  const [data, setData] = useState(null); // State for fetched data

  const handleUpdateContent = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        'http://localhost:5000/api/admin/update-content',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Content updated successfully');
    } catch (error) {
      alert('Error updating content');
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-content');
        setData(response.data); // Assuming the response contains the content
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h1>Admin Page</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdateContent}>Update Content</button>
      
      {/* Render fetched data if available */}
      <div>
        <h2>Fetched Data:</h2>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data available</p>}
      </div>
    </div>
  );
};

export default AdminPage;
