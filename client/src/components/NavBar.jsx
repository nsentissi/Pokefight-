import "./navbar.css";
import { Link } from "react-router-dom";


export default function NavBar() {
    return (
    <nav className="navbar">
        <Link to="/">Homepage</Link>
        <Link to="/pokemon">Pokemonlist</Link>

        <Link to="pokemon/leaderboard">Leaderboard</Link>

        <span></span>
    </nav>
);
}