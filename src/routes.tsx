import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FeedList from './pages/FeedList';
import UserDetails from './pages/UserDetails';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}