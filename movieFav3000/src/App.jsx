import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import Home from "./pages/Home";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage/>} />
      </Routes>
    </main>
  );
};

export default App;
