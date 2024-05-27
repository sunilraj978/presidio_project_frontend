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
import Button from 'react-bootstrap/Button';



function SellerPage() {

    const {id}=useParams();
    const[ID , SetID] = useState(null);
    const navigate = useNavigate();
    const BUYERID = localStorage.getItem("buyerId");
    const[property , setProperty] = useState([]);
    const [user , setUser] = useState([]);

    const [buyer,setBuyer] = useState([])
    const fetchUserData= async(userData)=>{
  console.log("user data ")
  console.log(userData[0]?.userId)
        const response = await fetch(`http://localhost:5000/fetchUserDetails/${userData[0]?.userId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
        
    }


    async function fetchAllData() {
        SetID(id);
      console.log("Fetch all sellers in home page func called");
      //console.log(id);
      const response = await fetch(`http://localhost:5000/fetchMyproperty/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      setProperty(data);
      if(data)
            fetchUserData(data)
       
    }

    

    useEffect(() => {
        fetchAllData();
        
      }, []);


      const notifyMail = async(e) =>{
        e.preventDefault();
        console.log("notify mail called")
        console.log(BUYERID)
        const response = await fetch(`http://localhost:5000/fetchUserDetails/${BUYERID}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();
          console.log("BUYER DATA")
          console.log(data);
          setBuyer(data)
          sendMail(data)

      }

      const sendMail = async(buyerData) =>{
        console.log("send mail called")
        const res = await fetch("http://localhost:5000/confirmorder" , {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user,
                buyer,
                property
            })
         })
        
        const data = await res.json();
    
        navigate(`/home/${BUYERID}`)
    

      }


    //   useEffect(()=>{
    //     fetchUserData();
    //   }, [property])
     


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
                                <ul>
                                   <li>
                                         <p> <b>Owner name: </b>{user[0]?.firstName}{user[0]?.lastName}</p>
                                    </li>
                                    <li>
                                         <p> <b>Phone Number: </b>{user[0]?.phoneNumber}</p>
                                    </li>
                                    <li>
                                         <p> <b>Email: </b>{user[0]?.email}</p>
                                    </li>
                                    <li>
                                         <p> <b>No.Of.Bedrooms: </b>{item.bedrooms}</p>
                                    </li>
                                    <li>
                                         <p> <b>No.Of Bathrooms : </b>{item.bathrooms}</p>
                                    </li>
                                    <li>
                                         <p> <b>Nearby college/hospital : </b>{item.nearBy}</p>
                                    </li>
                                    
                                    <Button variant="primary" className='intBtn' onClick={(e)=>notifyMail(e)}>Notify Seller</Button>
                                   
                                </ul>
                                
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


export default SellerPage
