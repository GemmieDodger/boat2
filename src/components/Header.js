// import Flexbox from 'flexbox-react';
import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheet.css';
<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
</style>



export default function Header() {
    return (
        <header>
       
                 <Link to="/"><h2 id="title">Bits & Boats</h2></Link>
  
        </header>
    )
}