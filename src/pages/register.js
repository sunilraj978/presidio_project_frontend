import React, { useState , useContext , useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BuyerIdContext } from '../App'
import Spinner from '../components/Spinner';


function Register() {
    const { buyerId , setBuyerId } = useContext(BuyerIdContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    async function handleSubmit(e){

        e.preventDefault()
         setLoading(true);
        const res = await fetch("https://rental-home-6lrh.onrender.com/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                phoneNumber:phoneNumber
            })
        })
        // .then(res=>res.json())
        // .then(data=>{
        //     navigate(`/home/${}`)
        //     console.log(data)
        // })
        const data = await res.json();
        //console.log(data);
        if(res.ok)
        {
           setLoading(false)
           toast("Signup success !!");
               setTimeout(() => {
                   setBuyerId(data);
               }, 800);
        }
        else
        {
            setLoading(false)
           toast("Username not available!");
                   navigate('/register');
                   return;
        }
        
}
    useEffect(() => {
        if (buyerId) {
            console.log("buyer id : " + buyerId);
            localStorage.setItem("buyerId" , buyerId)
            navigate(`/home/${buyerId}}`);
        }
    }, [buyerId]);

    return (
        <div className='register'>
            <form className='reg-form' onSubmit={handleSubmit}>
                <label>
                    FirstName:
                    <input type='text' value={firstName} onChange={handleFirstName} required />
                </label>

                <label>
                    LastName:
                    <input type='text' value={lastName} onChange={handleLastName} required />
                </label>

                <label>
                    Email:
                    <input type='email' value={email} onChange={handleEmailChange} required />
                </label>

                <label>
                    Password:
                    <input type='password' value={password} onChange={handlePasswordChange} required />
                </label>

                <label>
                    PhoneNumber:
                    <input type='text' value={phoneNumber} onChange={handlePhoneNumber} required />
                </label>

                <div>
                <button className='btn-model' type='submit'>Register</button>
                <ToastContainer />
                </div>
                
            </form>

            <div>
            {loading? <Spinner/>:(<></>)}
            </div>
                        
        </div>
    );
}

export default Register;
