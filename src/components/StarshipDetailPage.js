import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const StarshipDetailPage = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/starships/${id}/`);
        setStarship(response.data);
      } catch (error) {
        console.error("Error fetching starship:", error);
      }
    };

    fetchStarship();
  }, [id]);

  if (!starship) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
      <div className='container' >
        <h1 className='page-title'>{starship.name}</h1>
        <div className='subject-info'>
        <p className='subject-info__element'><strong>Model:</strong> {starship.model}</p>
        <p className='subject-info__element'><strong>Manufacturer:</strong> {starship.manufacturer}</p>
        <p className='subject-info__element'><strong>Cost:</strong> {starship.cost_in_credits} credits</p>
        <p className='subject-info__element'><strong>Length:</strong> {starship.length} meters</p>
        <p className='subject-info__element'><strong>Max Speed:</strong> {starship.max_atmosphering_speed}</p>
        <p className='subject-info__element'><strong>Crew:</strong> {starship.crew}</p>
        <p className='subject-info__element'><strong>Passengers:</strong> {starship.passengers}</p>
        <p className='subject-info__element'><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetailPage;
