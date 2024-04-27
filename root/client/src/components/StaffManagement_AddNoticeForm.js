import React, { useState } from 'react';
import axios from 'axios';

const AddNoticeForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:4000/Notice/notice', { title, content, expirationDate });
      alert('Notice added successfully');
      setTitle('');
      setContent('');
      setExpirationDate('');
      setIsLoading(false);
  
      window.location = '/staff/notices';
    } catch (err) {
      console.error(err);
      alert('Failed to add notice');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #ccc', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '20px auto', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Notice Form</h2>
      <label style={{ display: 'block', marginBottom: '20px', textAlign: 'left', fontSize: '16px' }}>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} required />
      </label>
      <label style={{ display: 'block', marginBottom: '20px', textAlign: 'left', fontSize: '16px' }}>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} required />
      </label>
      <label style={{ display: 'block', marginBottom: '20px', textAlign: 'left', fontSize: '16px' }}>
        Expiration Date:
        <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} required />
      </label>
      <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Notice'}
      </button>
    </form>
  );
};

export default AddNoticeForm;
