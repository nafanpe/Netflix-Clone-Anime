import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const ANIMATION_GENRE_ID = 16;

const TitleCards = ({ title, category = "popular" }) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef()
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_AUTH_KEY
    }
  };

  const handleWheel = (e) => {
    e.preventDefault()
    cardsRef.current.scrollLeft += e.deltaY
  }

  const TMDB_BASE_URL = "https://api.themoviedb.org/3";

useEffect(() => {
  const currentCardsRef = cardsRef.current;

  const fetchMovies = async () => {
    try {
      let url;
      if (category === "now_playing" || category === "upcoming") {
        url = `${TMDB_BASE_URL}/movie/${category}?language=en-US&page=1`;
      } else {
        const categorySort = {
          popular: 'popularity.desc',
          top_rated: 'vote_average.desc&vote_count.gte=1000',
        };
        url = `${TMDB_BASE_URL}/discover/movie?` +
              `with_genres=${ANIMATION_GENRE_ID}&` +
              `sort_by=${categorySort[category]}&` +
              `language=en-US&page=1`;
      }

      const response = await fetch(url, options);
      const data = await response.json();
      setApiData(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  fetchMovies();

  return () => {
    if (currentCardsRef) {
      currentCardsRef.removeEventListener('wheel', handleWheel);
    }
  };
}, [category, options]);

  return (
    <div className='title-cards'>
      <h2>{title || "Animated Movies"}</h2>
      <div className="cardlist" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} 
                alt={card.original_title} 
              />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>No animated movies found.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;