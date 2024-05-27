import React, { useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const {id} = useParams();
  const navigate = useNavigate();


  const handleSubmit = async(event) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:5000/update/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                price:price,
                area:area,
                place:place,
                bedrooms:bedrooms,
                bathrooms:bathrooms,
            })
        })
        const data = await res.json()
        console.log(data);
        if(res.ok)
            {
               // setBuyerId(data);
               navigate(`/home/${data.userId}`);
            }
            else
            {
              
                
            }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">Price:</label>
        <input 
          type="text" 
          id="price" 
          name="price" 
          value={price} 
          onChange={(event) => setPrice(event.target.value)} 
        /><br />

        <label htmlFor="place">Place:</label>
        <input 
          type="text" 
          id="place" 
          name="place" 
          value={place} 
          onChange={(event) => setPlace(event.target.value)} 
        /><br />

        <label htmlFor="area">Area:</label>
        <input 
          type="text" 
          id="area" 
          name="area" 
          value={area} 
          onChange={(event) => setArea(event.target.value)} 
        /><br />

        <label htmlFor="bathrooms">Number of Bathrooms:</label>
        <input 
          type="number" 
          id="bathrooms" 
          name="bathrooms" 
          value={bathrooms} 
          onChange={(event) => setBathrooms(event.target.value)} 
        /><br />

        <label htmlFor="bathrooms">Number of Bedrooms:</label>
        <input 
          type="number" 
          id="bathrooms" 
          name="bedrooms" 
          value={bedrooms} 
          onChange={(event) => setBedrooms(event.target.value)} 
        /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
