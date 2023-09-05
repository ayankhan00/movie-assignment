import React, { useState, useEffect } from 'react';
import './style.css'
// import '../../public/data.json'

// const movieListStyles = {
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
//     backgroundColor: '#fff',
// };

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [input, setInput] = useState([]);
    const [sortBy, setSortBy] = useState('releaseDate');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of i

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => { setMovies(data.movies); setFilteredData(data.movies); })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
        const s = movies.filter((prod) => {
            return prod.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        console.log(input);
        setFilteredData(s);
    };
    const sortedMovies = [...filteredData].sort((a, b) => {
        if (sortBy === 'releaseDate') {
            return new Date(a.release_date) - new Date(b.release_date);
        } else if (sortBy === 'artists') {
            return a.actors.join(', ').localeCompare(b.actors.join(', '));
        }
        return 0;
    });


    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className="movie-list">
            <h2>Movies Page</h2>
            <input
                type='text'
                placeholder='Search...'
                value={input}
                onChange={handleChange}
            />
            {console.log(filteredData)}
            <div className="dropdown">
                <label htmlFor="sort">Sort by: </label>
                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="releaseDate">Release Date</option>
                    <option value="artists">Artists</option>
                </select>
            </div>
            <ul>
                {currentMovies.map((movie, index) => (
                    <li key={index}>
                        <strong>Title:</strong> {movie.title}
                        <br />
                        <strong>Release Date:</strong> {movie.release_date}
                        <br />
                        <strong>Actors:</strong> {movie.actors.join(', ')}
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastMovie >= sortedMovies.length}
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default MovieList
