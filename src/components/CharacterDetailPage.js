import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState({
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setCharacter(response.data);

        // Fetch homeworld
        if (response.data.homeworld) {
          const homeworldResponse = await axios.get(response.data.homeworld);
          setHomeworld(homeworldResponse.data.name);
        }

        // Fetch films
        if (response.data.films) {
          const filmPromises = response.data.films.map((filmUrl) => axios.get(filmUrl));
          const filmResponses = await Promise.all(filmPromises);
          setFilms(filmResponses.map((film) => film.data.title));
        }

        // Fetch species
        if (response.data.species.length > 0) {
          const speciesPromises = response.data.species.map((speciesUrl) => axios.get(speciesUrl));
          const speciesResponses = await Promise.all(speciesPromises);
          setSpecies(speciesResponses.map((specie) => specie.data.name));
        } else {
          setSpecies(["Unknown"]);
        }

        // Fetch starships
        if (response.data.starships.length > 0) {
          const starshipPromises = response.data.starships.map((starshipUrl) => axios.get(starshipUrl));
          const starshipResponses = await Promise.all(starshipPromises);
          setStarships(starshipResponses.map((starship) => starship.data.name));
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedCharacter({
      height: character.height,
      mass: character.mass,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      gender: character.gender,
    });
  };

  const handleSaveClick = () => {
    setCharacter({
      ...character,
      ...editedCharacter,
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
      <div className='container'>
        <h1 className='page-title'>{character.name}</h1>
        {isEditing ? (
          <div className='editing__container'>
            <p className='subject-info__element'><strong>Height:</strong>
            <input 
              type="number"
              name="height"
              value={editedCharacter.height}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Mass:</strong>
            <input
              type="number"
              name="mass"
              value={editedCharacter.mass}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Hair Color:</strong>
            <input
              type="text"
              name="hair_color"
              value={editedCharacter.hair_color}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Skin Color:</strong>
            <input 
              type="text"
              name="skin_color"
              value={editedCharacter.skin_color}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Eye Color:</strong>
            <input 
              type="text"
              name="eye_color"
              value={editedCharacter.eye_color}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Birth Year:</strong>
            <input 
              type="text"
              name="birth_year"
              value={editedCharacter.birth_year}
              onChange={handleChange}
            />
            </p>
            <p className='subject-info__element'><strong>Gender:</strong>
            <input 
              type="text"
              name="gender"
              value={editedCharacter.gender}
              onChange={handleChange}
            />
            </p>
            <button className='save__btn' onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div className='subject-info'>
            <p className='subject-info__element'><strong>Height:</strong> {character.height} cm</p>
            <p className='subject-info__element'><strong>Mass:</strong> {character.mass} kg</p>
            <p className='subject-info__element'><strong>Hair Color:</strong> {character.hair_color}</p>
            <p className='subject-info__element'><strong>Skin Color:</strong> {character.skin_color}</p>
            <p className='subject-info__element'><strong>Eye Color:</strong> {character.eye_color}</p>
            <p className='subject-info__element'><strong>Birth Year:</strong> {character.birth_year}</p>
            <p className='subject-info__element'><strong>Gender:</strong> {character.gender}</p>
            <p className='subject-info__element'><strong>Homeworld:</strong> {homeworld || "Loading..."}</p>
            <p className='subject-info__element'><strong>Species:</strong> {species.join(', ')}</p>
            <p className='subject-info__element'><strong>Films:</strong></p>
            <ul>
              {films.length > 0 ? films.map((film, index) => (
                <li key={index}>{film}</li>
              )) : <li>Loading...</li>}
            </ul>
            <p className='subject-info__element'><strong>Starships:</strong></p>
            <ul>
              {starships.length > 0 ? starships.map((starship, index) => (
                <li key={index}>{starship}</li>
              )) : <li>No Starships</li>}
            </ul>
            <button className='edit__btn' onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;
