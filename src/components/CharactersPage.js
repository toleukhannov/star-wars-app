import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // 10 - кол-во персонажей на странице
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Header/>
      <div className='container'>
        <h1 className='page-title'>Персонажи из Star Wars</h1>
        <ul className='ul-list'>
          {characters.map((character, index) => (
            <li key={index} className='ul-list__element'>
              <Link to={`/characters/${index + 1 + (page - 1) * 10}`}>{character.name}</Link>
            </li>
          ))}
        </ul>
        <div className='page-control'>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Предыдущий
          </button>
          <span> Страница {page} из {totalPages} </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Следующий
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;
