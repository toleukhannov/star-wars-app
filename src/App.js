import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import CharactersPage from './components/CharactersPage';
import CharacterDetailPage from './components/CharacterDetailPage';
import PlanetsPage from './components/PlanetsPage';
import PlanetDetailPage from './components/PlanetDetailPage';
import StarshipsPage from './components/StarshipsPage';
import StarshipDetailPage from './components/StarshipDetailPage';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<ProfilePage />} />
        </Route>
        <Route path="/characters" element={<PrivateRoute />}>
          <Route path="" element={<CharactersPage />} />
        </Route>
        <Route path="/characters/:id" element={<PrivateRoute />}>
          <Route path="" element={<CharacterDetailPage />} />
        </Route>
        <Route path="/planets" element={<PrivateRoute />}>
          <Route path="" element={<PlanetsPage />} />
        </Route>
        <Route path="/planets/:id" element={<PrivateRoute />}>
          <Route path="" element={<PlanetDetailPage />} />
        </Route>
        <Route path="/starships" element={<PrivateRoute />}>
          <Route path="" element={<StarshipsPage />} />
        </Route>
        <Route path="/starships/:id" element={<PrivateRoute />}>
          <Route path="" element={<StarshipDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

function PrivateRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default App;
