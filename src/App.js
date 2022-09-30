import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu";
import ListMovies from "./components/ListMovies";
import LastWatch from "./components/LastWatch";

function App() {
  return (
    <div className="container">
      <Menu />
      <ListMovies />
      <LastWatch name="My Last Watch" view="View More" />
    </div>
  );
}

export default App;
