import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [api_data, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '' 
  })
  
  // Normalize TMDB Authorization header and prepare fetch options
  const rawAuthKey = import.meta.env.VITE_TMDB_AUTH_KEY || ''
  const normalizedAuthorization = rawAuthKey.startsWith('Bearer ') ? rawAuthKey : `Bearer ${rawAuthKey}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: normalizedAuthorization
    }
  };

  // Determine preferred language from browser
  const browserLanguage = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US'

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=${encodeURIComponent(browserLanguage)}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results && response.results[0] ? response.results[0] : { name: '', key: '', published_at: '', type: '' }))
    .catch(err => console.error(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${api_data.key}`} title="trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <div className="player-info">
        <p>{api_data.published_at ? api_data.published_at.slice(0,10) : ''}</p>
        <p>{api_data.name}</p>
        <p>{api_data.type}</p>
      </div>
    </div>
  )
}

export default Player
