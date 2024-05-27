import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState , useEffect } from 'react';
import { useParams   } from 'react-router-dom';
import './productbuy.css';
import Spinner from './Spinner';
import Navbar from './Navbar';
import StripeCheckout from "react-stripe-checkout";




function MyProfile() {

    const {id}=useParams();
    const[ID , SetID] = useState(null);
    const navigate = useNavigate();

    const[property , setProperty] = useState([]);
    async function fetchAllData() {
        SetID(id);
      console.log("Fetch all sellers in home page func called");
      console.log(id);
      const response = await fetch(`https://rental-home-6lrh.onrender.com/fetchProfileMyproperty/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      setProperty(data);
    }


    useEffect(() => {
        
    
        fetchAllData();
      }, []);

      const deletePost = async(id)=>{

        console.log(id);
        const response = await fetch(`https://rental-home-6lrh.onrender.com/deletepost/${id}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();
          console.log(data);
          fetchAllData();
      }



      return (
        <div>
            <Navbar userId={id} />
    
            {property.length ? (
                <div className="outerdiv">
                    <div className="head-div">
                        <h2>My properties:</h2>
                    </div>
                    {property.map((item) => (
                        <div key={item._id} className="imag-btn-div">
                            <div className="img-div">
                                <img className="img" src={item.imageUrl} alt="Property" />
                                <p>Price : RS. {item.price}</p>
                                <p>Place and area :  {item.place} , {item.area}</p>
                            </div>
                            <div className="btn-div">
                            <button className="btn-green" onClick={() => navigate(`/update/${item._id}`)}>Edit</button>
                                
                                <button className="btn-red" onClick={() => deletePost(item._id)}>Delete</button>
                            </div>
                        </div>  
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}


export default MyProfile
