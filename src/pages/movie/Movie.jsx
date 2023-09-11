import React, { useState, useEffect } from 'react';
import './Movie.css'
import Pagination from '../../components/pagination/Pagination';

function Movie() {
    const [movies, setMovies] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [input, setInput] = useState([]);
    const [sortBy, setSortBy] = useState('releaseDate');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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
        setCurrentPage(1)
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className="movie-list" >
            <div className="search-bar-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="search-input"
                        value={input}
                        onChange={handleChange}
                    />
                    <button className="search-button">Search</button>
                </div>
            </div>
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

            <table className="movie-table">
                <thead>
                    <tr>
                        <th style={{ width: "50%" }}>Title</th>
                        <th style={{ width: "15%" }}>Release Date</th>
                        <th style={{ width: "35%" }}>Artists</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.title}</td>
                            <td>{movie.release_date}</td>
                            <td>{movie.actors.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedMovies.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default Movie






