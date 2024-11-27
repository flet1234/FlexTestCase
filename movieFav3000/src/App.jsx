import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundaryWrapper from "./components/ErrorBoundaryWrapper";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "./css/app.css";

const Favorites = lazy(() => import("./pages/Favorites"));
const NowPlaying = lazy(() => import("./pages/NowPlaying"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const NotFound = lazy(() => import("./components/NotFound"));
const Popular = lazy(() => import("./pages/Popular"));

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <NavBar />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to={"/popular/1"} replace />} />
            <Route path="/popular/:pageNum" element={<Popular />} />
            <Route path="/now-playing/:pageNum" element={<NowPlaying />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/not-found" element={<NotFound />} /> {/* 404 route */}
            <Route path="/*" element={<NotFound />} /> {/* Catch-all route */}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </ErrorBoundaryWrapper>
  );
};

export default App;
