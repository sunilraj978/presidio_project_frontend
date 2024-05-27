import React , { Component } from 'react'
import Slider from "react-slick";
import HorizontalScroll from 'react-scroll-horizontal';
import { Link , useNavigate , useParams} from 'react-router-dom';
import { createContext, useContext, useState , useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from '../components/Spinner';
import '../pages/home.css'
import { BuyerIdContext } from '../App';


function Navbar({userId}) {
    const {buyerId} = useContext(BuyerIdContext);
    const BUYERID = localStorage.getItem("buyerId");
  return (
    <div className='container'>
                <nav className="navbar">
                    <div>
                        <Link to={`/home/${userId}`}>
                        <img className="logo" src='https://res.cloudinary.com/dgtonwmdv/image/upload/v1716695740/homerental_logo-removebg-preview_zwtf7g.png'/>
                        </Link>
                    </div>
                    <div className="nav-container">
                        <Link to={`/home/${BUYERID}`} className="nav-link">Home</Link>
                        <Link to={`/sellProperty/${BUYERID}`} className="nav-link">Sell Property</Link>
                        <Link to={`/myprofile/${BUYERID}`} className="nav-link">Profile</Link>
                        <Link to="/" className="nav-link" onClick={()=>{
                            localStorage.clear()
                        }}>Logout</Link>
                    </div>
                </nav>
    </div>
  )
}

export default Navbar


