import React from 'react'

function MovieList(movies) {
    return (
        <>
            {movies.map((movie, index) => (
                <li key={index}>
                    <strong>Title:</strong> {movie.title}
                    <br />
                    <strong>Release Date:</strong> {movie.release_date}
                    <br />
                    <strong>Actors:</strong> {movie.actors.join(', ')}
                </li>
            ))}
        </>
    )
}

export default MovieList
