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
      <div className='container'>
        <h1 className='page-title'>{starship.name}</h1>
        <p><strong>Model:</strong> {starship.model}</p>
        <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
        <p><strong>Cost:</strong> {starship.cost_in_credits} credits</p>
        <p><strong>Length:</strong> {starship.length} meters</p>
        <p><strong>Max Speed:</strong> {starship.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {starship.crew}</p>
        <p><strong>Passengers:</strong> {starship.passengers}</p>
        <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
      </div>
    </div>
  );
};

export default StarshipDetailPage;
