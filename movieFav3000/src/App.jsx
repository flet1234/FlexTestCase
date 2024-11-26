import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import Home from "./pages/Home";
import "./css/app.css"
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage/>} />
      </Routes>
    </main>
      <Footer />
    </>
  );
};

export default App;
