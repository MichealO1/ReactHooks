import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import TrailerPage from "./components/TrailerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <MovieCard />; */}
      <Routes>
        <Route index element={<MovieCard />} />
        {/* <Route path="trailer/:imdbID" element={<TrailerPage />} /> */}
        <Route path="trailer">
          <Route path=":imdbID" element={<TrailerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
