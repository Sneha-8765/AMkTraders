import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log('Image file:', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Product added successfully!');
      console.log(response.data);
      setName('');
      setPrice('');
      setImage(null);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProduct;