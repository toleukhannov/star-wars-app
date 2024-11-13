import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const StarshipsPage = () => {
  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
        setStarships(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // 10 - кол-во кораблей на странице
      } catch (error) {
        console.error("Error fetching starships:", error);
      }
    };

    fetchStarships();
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
        <h1 className='page-title'>Star Wars Starships</h1>
        <ul className='ul-list'>
          {starships.map((starship, index) => (
            <li key={index} className='ul-list__element'>
              <Link to={`/starships/${index + 1 + (page - 1) * 10}`}>{starship.name}</Link>
            </li>
          ))}
        </ul>
        <div className='page-control'>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span> Page {page} of {totalPages} </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarshipsPage;
