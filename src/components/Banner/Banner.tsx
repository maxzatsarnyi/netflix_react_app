import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import requests from '../../config/requests';
import { GetMovieResponse, Movie } from '../../entities';
import './Banner.scss';

export const Banner = () => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<GetMovieResponse<Movie>>(
        requests.fetchNetflixOriginals
      );
      // func grabs a random movie between 0 and last index
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return data;
    };
    fetchData();
  }, []);

  const truncate = (str: string = '', n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h3 className='banner__description'>
          {truncate(movie?.overview, 100)}
        </h3>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  );
};
