import React, { useEffect , useState ,useContext } from 'react';
import '../App.css';
import {Link , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BuyerIdContext } from '../App'
import Spinner from '../components/Spinner';
//----------------------------------------------------------> Buyer


function Signin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token,setToken] = useState('');
    const { buyerId , setBuyerId } = useContext(BuyerIdContext);
    const [loading, setLoading] = useState(false);
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         setLoading(true);
        if(email==='' || password==='')
        {
            toast("Enter all fields");
            navigate('/signin');
            return;
        }
         const res = await fetch("https://rental-home-6lrh.onrender.com/loginbuyer" , {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
         })
        
        const data = await res.json();
         if(res.ok)
         {
            setLoading(false)
            toast("Login success !!");
                setTimeout(() => {
                    setBuyerId(data[0]);
                    localStorage.setItem("buyerId",data[0])
                    localStorage.setItem("token",data[1])
                    setToken(data[1]);
                    
                }, 800);
         }
         else
         {
             setLoading(false)
            toast("Invalid username or password!");
                    navigate('/signinbuyer');
                    return;
         }
    };

    useEffect(() => {
        if (buyerId) {
            console.log(buyerId);
           
            const BUYERID = localStorage.getItem("buyerId");
            navigate(`/home/${BUYERID}`);
        }
    }, [buyerId]);


    return (
        <div className='register'>
            <form className='reg-form' onSubmit={handleSubmit}>

                <label>
                    Email:
                    <input type='email' value={email} onChange={handleEmailChange} required />
                </label>

                <label>
                    Password:
                    <input type='password' value={password} onChange={handlePasswordChange} required />
                </label>
                
                <div>
                <button className='btn-model' type='submit'>Login</button>
                <ToastContainer />
                </div>
                
                <h4><Link to="/register">Doesn't have account?</Link></h4>
            </form>

             <div>
            {loading? <Spinner/>:(<></>)}
            </div>
                        
        </div>
    );
}


export default Signin;
