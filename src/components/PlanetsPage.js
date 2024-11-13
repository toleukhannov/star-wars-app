import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
        setPlanets(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // 10 - кол-во планет на странице
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    fetchPlanets();
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
        <h1 className='page-title'>Star Wars Planets</h1>
        <ul className='ul-list'>
          {planets.map((planet, index) => (
            <li key={index} className='ul-list__element'>
              <Link to={`/planets/${index + 1 + (page - 1) * 10}`}>{planet.name}</Link>
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

export default PlanetsPage;
