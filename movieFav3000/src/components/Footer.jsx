import "../css/footer.css";

function Footer() {
    
    return (
        <div className="footerContainer">
            <h3>Backend source :</h3>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <img className="footerTMDBImage" src="/assets/images/tmdb_logo.svg"/>
        </a>
      </div>
    );
}

export default Footer