import React , { Component } from 'react'
import { Link , useNavigate , useParams} from 'react-router-dom';
import { createContext, useContext, useState , useEffect } from 'react';
import './home.css';
import Navbar from '../components/Navbar';
import Card from '../components/Card';


function Home() {
    const {id} = useParams();
     const navigate = useNavigate();
    const [sellers, setSellers] = useState([]);
    const [searchtext, setSearchtext] = useState("");
  

    async function fetchAllData() {
        console.log("Fetch all sellers in home page func called");
        const response = await fetch(`https://rental-home-6lrh.onrender.com/fetchData`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        console.log(data);
        setSellers(data);
      }

    useEffect(() => {
      
  
      fetchAllData();
    }, []);


  

    const handlefilter= async(e)=>{
        e.preventDefault();

        if(searchtext===""){
            fetchAllData();
        }
        const response = await fetch(`https://rental-home-6lrh.onrender.com/fetchfilter`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 searchtext: searchtext.toUpperCase(),
            })
        });
        const data = await response.json();
        console.log(data);
        setSellers(data);

    }


    const handleinterest = (userId)=>{
        navigate(`/sellerpage/${userId}`);
    }


    return (
      <div className='home'>
        <Navbar userId={id} />
        <div className='filterrr'>
        <input  className='inputfilter' type='text' placeholder='Filter by city..' value={searchtext} onChange={(e)=>{
            setSearchtext(e.target.value)
            console.log(searchtext);
            console.log(searchtext.length);
            if(searchtext.length==1){
                fetchAllData();
            }
        }}/>
        <button className='btn-fil' onClick={handlefilter}>Search</button>
        </div>
        
        <div className='seller-cards'>
          {sellers.map((seller) => (
                    <Card image={seller.imageUrl} firstName={seller.firstName} lastName={seller.lastName} price={seller.price} Bedrooms={seller.bedrooms} Bathrooms={seller.bathrooms} Area={seller.area} Place={seller.place} Nearby={seller.nearBy} id={seller._id} />

          ))}
        </div>
      </div>
    );
  };

  

export default Home;
