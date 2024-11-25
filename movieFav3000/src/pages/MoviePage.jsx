import { useParams } from "react-router-dom";

function MoviePage() {
    const { id } = useParams();
    
  return (
    <div>
          <h1>MoviePage {id}</h1>
    </div>
  );
}

export default MoviePage;
