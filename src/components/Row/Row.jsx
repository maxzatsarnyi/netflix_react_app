// this file is jsx because the movie-trailer library hasn't got types
import React, { FC, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from '../../config/axios';
import movieTrailer from 'movie-trailer';
import './Row.scss';

const base_url = 'https://image.tmdb.org/t/p/original/';

// type Props = {
//   title: string;
//   fetchUrl: string;
//   isLargeRow?: boolean;
// };

export const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log('Error: ', error));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(fetchUrl);
      setMovies(data.results);
      return data;
    };
    fetchData();
    // you have to specify url as a dependency
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
