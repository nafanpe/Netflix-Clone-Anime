import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/TitleCards'
import Footer from '../../Components/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();
  const Banner_link_id = '1KMcoJBMWE4';

  return (
    <div className='home'>
        <Navbar />
        <div className="hero">
          <img src="https://occ-0-3011-116.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRoh_7IcG1KBzYc0qa2V64x-F-WZdgxTP7QbOfwmLje1dExZlys6m3imZNRBls0Ii_Rlxs-G7k9WqO-LF3GvCYaigf98.jpg?r=55e" alt="" className='banner-img'/>
          <div className="hero-caption">
            <img src="https://freepngimg.com/thumb/advertising/80345-monkey-warriors-one-pirate-text-luffy-zoro.png" alt="" className='caption-img'/>
            <p>Luffy and his crew sail to find the One Piece, battling immortal foes and uncovering ancient secrets on his quest to become Pirate King.</p>
            <div className="hero-btns">
              <button onClick={() => (
                navigate(`/player/${Banner_link_id}`)
              )} className='btn'><img src={play_icon} alt="" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
            <TitleCards/>
          </div>
        </div>
        <div className="more-cards">
          <TitleCards title={"Top Rated Movies"} category={"top_rated"}/>
          <TitleCards title={"Now Playing"} category={"now_playing"}/>
          <TitleCards title={"Upcoming Animated Movies"} category={"upcoming"}/>
          <TitleCards title={"Popular Animated Movies"} category={"popular"}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
