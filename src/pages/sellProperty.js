import React from 'react'
import './cart.css'
import { Link , useNavigate, useParams } from 'react-router-dom';
import { useState , useEffect , useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Slider from 'react-slick';
import { BuyerIdContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function SellProperty() {
   const navigate = useNavigate();
   const [bid , setBid] = useState(null);
   const [loading , setLoading] = useState(false);
    const {buyerId} = useContext(BuyerIdContext);
    const BUYERID = localStorage.getItem("buyerId");
    // setBid(buyerId);
    const [buyercart , setBuyercart] = useState([]);
    const [sliderSettings, setSliderSettings] = useState({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
      });
useEffect(()=>{
    const fetchCart = async()=>{
        setBid(BUYERID);
        
        const token = localStorage.getItem("buyer_TOKEN");
        const res = await fetch(`https://presidio-project-backend-ri26-6umuscmam.vercel.app/getmycart/${BUYERID}` , {
            method:'GET',
            headers:{
                "authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
               }
        })
        const data = await res.json();
        // console.log(data);
        if(res.ok)
        {
            setBuyercart(data);
        }
    }
    fetchCart();
} , [buyercart])

useEffect(()=>{
    console.log(bid);
} , [bid])


const deleteProduct=async(e , product)=>{
   console.log(product);
   const BUYERiD = localStorage.getItem("buyerId");
   console.log(BUYERiD);
   const res = await fetch(`https://presidio-project-backend-ri26-6umuscmam.vercel.app/removefromcart/${BUYERiD}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ product:product })
});
const data = await res.json();
console.log(data);
if (res.ok) {
    toast("Item removed")
    const fetchCart = async()=>{
        const res = await fetch(`https://presidio-project-backend-ri26-6umuscmam.vercel.app/getmycart/${BUYERiD}` , {
            method:'GET'
        })
        const data = await res.json();
        // console.log(data);
        if(res.ok)
        {
            setBuyercart(data);
            console.log("Item removed successfully");
        }
    }
    fetchCart();
   
} else {
    console.log("Something went wrong");
}
}

const handleBuy = async (index)=>{
    setLoading(true);
        try{
            const cartObject = buyercart[index];
            const sellerobj = buyercart[index].sellerId;
            const buyerid = localStorage.getItem("buyerId");
            const res = await fetch(`https://presidio-project-backend-ri26-6umuscmam.vercel.app/getbuyer/${buyerid}` , {
                method:"GET"
                }) 
            const buyerobj = await res.json();
            // console.log(buyerobj);

            const response = await fetch(`https://presidio-project-backend-ri26-6umuscmam.vercel.app/billcreation`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ buyerobj , sellerobj  , cartObject })
            });
            const billid = await response.json();
            if(response.ok) {
                setLoading(false);
                navigate(`/productbuy/${billid}`);
            }
                
        }
        catch(e){
            console.log(e);
        }
}

const { id } = useParams();
const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState('');
  var imgurl;
  const [place, setPlace] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [nearBy, setNearBy] = useState('');

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => setImageUrl(reader.result);
  };


  function uploadFile(type){
    const data = new FormData();
    data.append("file" , imageUrl);
    data.append("upload_preset" , "image_preset");
    try {
        const cloudName = 'dgtonwmdv';
        const resourceType = 'image';
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      
        fetch(api, {
          method: 'POST',
          body: data
        })
          .then(response => response.json())
          .then(result => {
            imgurl = result.secure_url;
            console.log("res.data from cloud:", result.secure_url);
            storeDB();
          })
          .catch(error => {
            console.error("Error uploading to Cloudinary:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
}

 const handleSubmit = async(event) => {
    event.preventDefault();

    uploadFile('image');


  };

  const storeDB = async()=>{
    const token = localStorage.getItem("token");
    const res = await fetch("https://presidio-project-backend-ri26-6umuscmam.vercel.app/createproduct",{
            method:"post",
            headers:{
                "authorization" : `Bearer ${token}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                imageUrl: imgurl,
                userId : id,
                price:price,
                area:area,
                place:place,
                bedrooms:bedrooms,
                bathrooms:bathrooms,
                nearBy:nearBy
            })
        })
        if(res.ok)
            {
               // setBuyerId(data);
               toast("Added success !!");
               navigate(`/home/${id}`);
            }
            else
            {
               toast("Somthing went wrong!");
                
            }
  }

  return (
    <div className='cart-container'> 
    <Navbar userId={id} />
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Image:
          <input type="file" onChange={e => setImageUrl((prev)=>e.target.files[0])}  accept="image/*" />
        </label>
        {imageUrl && <img src={imageUrl} alt="Uploaded product" />}
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Place:
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        </label>
        <label>
          Area:
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
        <label>
          No Of BedRooms:
          <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        </label>
        <label>
          No Of BathRooms:
          <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
        </label>
       
        <label>
        Near By College / Hospital:
        <div>
          <label>
            <input
              type="radio"
              value="yes"
              checked={nearBy === 'yes'}
              onChange={(e) => setNearBy(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={nearBy === 'no'}
              onChange={(e) => setNearBy(e.target.value)}
            />
            No
          </label>
        </div>
      </label>
        
        <div className="button-container">
          <button className='donebtn' type="submit">Done</button>
        </div>
      </form>
    );

 </div>

  )
}

export default SellProperty
