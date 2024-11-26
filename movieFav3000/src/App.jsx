import { Navigate, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import Home from "./pages/Home";
import "./css/app.css";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={"/1"} replace />} />
          <Route path="/:pageNum" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/not-found" element={<NotFound />} />  {/* 404 route */}
          <Route path="/*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
