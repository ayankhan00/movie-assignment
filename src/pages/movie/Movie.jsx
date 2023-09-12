import React, { useState, useEffect } from 'react';
import './Movie.css'
import Pagination from '../../components/pagination/Pagination';

function Movie() {
    const [movies, setMovies] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [input, setInput] = useState([]);
    const [artist, setArtist] = useState([]);
    const [dateGroup, setDateGroup] = useState([]);
    const [sortBy, setSortBy] = useState('releaseDate');
    const [groupBy, setGroupBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(40);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.movies); setFilteredData(data.movies); distinctArtist(data.movies)
                distinctDate(data.movies)
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const distinctArtist = (data) => {
        let arts = []
        data.forEach((d) => {
            if (!arts.includes(d.actors[0])) {
                arts = [...arts, d.actors[0]]
            } else if (!arts.includes(d.actors[1])) {
                arts = [...arts, d.actors[1]]
            }
        })
        setArtist(arts)
    }


    const distinctDate = (data) => {
        let uniqueDate = []
        data.forEach((d) => {
            if (!uniqueDate.includes(d.release_date)) {
                console.log(d.release_date);
                uniqueDate = [...uniqueDate, d.release_date]
            }
        })
        setDateGroup(uniqueDate)
    }


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
            {console.log(dateGroup)}
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
                <label htmlFor="group">Group by: </label>
                <select
                    id="group"
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                >
                    <option value="default">default</option>
                    <option value="releaseDate">Release Date</option>
                    <option value="artists">Artists</option>
                </select>
            </div>


            {groupBy === 'releaseDate' ? <>{dateGroup.map((d, index) => (
                <div style={{ marginTop: "2rem" }}>
                    <h2 style={{ textAlign: "left" }}> * {d}</h2>
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th style={{ width: "50%" }}>Title</th>
                                <th style={{ width: "15%" }}>Release Date</th>
                                <th style={{ width: "35%" }}>Artists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMovies.map((movie, index) => {
                                if (movie.release_date === d)
                                    return (
                                        <tr key={index}>
                                            <td>{movie.title}</td>
                                            <td>{movie.release_date}</td>
                                            <td>{movie.actors.join(', ')}</td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                </div>
            ))}</>
                :

                groupBy === 'artists' ? <>{artist.map((d, index) => (
                    <div style={{ marginTop: "2rem" }}>
                        <h2 style={{ textAlign: "left" }}> * {d}</h2>
                        <table className="movie-table">
                            <thead>
                                <tr>
                                    <th style={{ width: "50%" }}>Title</th>
                                    <th style={{ width: "15%" }}>Release Date</th>
                                    <th style={{ width: "35%" }}>Artists</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMovies.map((movie, index) => {
                                    if (movie.actors[0] === d || movie.actors[1] === d)
                                        return (
                                            <tr key={index}>
                                                <td>{movie.title}</td>
                                                <td>{movie.release_date}</td>
                                                <td>{movie.actors.join(', ')}</td>
                                            </tr>
                                        )
                                })}
                            </tbody>
                        </table>
                    </div>
                ))}</> :

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
            }


            {/* <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedMovies.length / itemsPerPage)}
                onPageChange={handlePageChange}
            /> */}
        </div>
    )
}

export default Movie






