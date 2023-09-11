import './App.css';
import Movie from './pages/movie/Movie';

function App() {
  return (
    <div className="App">
      <h1 style={{color: "white", margin: "0rem", paddingBottom: "1.5rem", fontSize:"3rem", fontWeight:"500"}}>Movies</h1>
      <Movie/>
    </div>
  );
}

export default App;
