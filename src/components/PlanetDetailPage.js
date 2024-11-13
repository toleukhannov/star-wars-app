import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const PlanetDetailPage = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}/`);
        setPlanet(response.data);
        setEditableData(response.data);
      } catch (error) {
        console.error("Error fetching planet:", error);
      }
    };

    fetchPlanet();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setPlanet(editableData);
    setIsEditing(false);
  };

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
      <div className='container'>
        <h1 className='page-title'>{editableData.name}</h1>
        {isEditing ? (
          <div className='editing__container'>
            <label className='subject-info__element'>
              Climate:
              <input name="climate" value={editableData.climate} onChange={handleChange} />
            </label>
            <label className='subject-info__element'>
              Terrain:
              <input name="terrain" value={editableData.terrain} onChange={handleChange} />
            </label >
            <label className='subject-info__element'>
              Population:
              <input name="population" value={editableData.population} onChange={handleChange} />
            </label >
            <button className='save__btn' onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className='subject-info'>
            <p className='subject-info__element'><strong>Climate:</strong> {planet.climate}</p>
            <p className='subject-info__element'><strong>Terrain:</strong> {planet.terrain}</p>
            <p className='subject-info__element'><strong>Population:</strong> {planet.population}</p>
            <button className='edit__btn' onClick={handleEditToggle}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetDetailPage;
