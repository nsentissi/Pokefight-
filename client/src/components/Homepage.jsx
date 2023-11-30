import "./homepage.css";
import "./videoBackground";
import VideoBackground from "./videoBackground";
import { Link } from 'react-router-dom';


export default function Homepage() {
  return (
    <div>
      <VideoBackground />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
<h1>Pokemons!</h1>
<div className="cards">

<Link to="/" className="card-link">
  <div className="card">
    <h2 className="card-title">From the Flame</h2>
    <img src="https://cdn6.fiction.live/file/fictionlive/images/1e8ga51co_Cover_image.png" alt="" />
    <p className="card-desc">A quest following an ex-Magma grunt trying to make his way in the region. He just wants to collect badges and make mom proud damnit!</p>
  </div>
  </Link>

  <Link to="/" className="card-link">
  <div className="card">
    <h2 className="card-title">Alola from Aether</h2>
    <img src="https://cdn6.fiction.live/file/fictionlive/images/1gh84t9fv_murderisokay.jpg" alt="" />
    <p className="card-desc">An adventure in Alola where a boy from Aether Paradise tries his best to take care of a pair of siblings but this and that happen and both have stolen Pokemon and disappeared from the Paradise, whats a boy gotta do?</p>
  </div>
  </Link>

  <Link to="/" className="card-link">
  <div className="card">
    <h2 className="card-title">Monsters in the pocket of god</h2>
    <img src="https://cdn6.fiction.live/file/fictionlive/eb8fc170-6d65-4cd9-96ca-c16344b30f99.png" alt="" />
    <p className="card-desc">Welcome to the Wondrous Dangerous world of Pokemon. My name is professor [Redacted]. Some work with Pokemon, some Keep them as pets, others train and battle them. Me? I study them.
Now, are you a-</p>
  </div>
  </Link>

  <Link to="/" className="card-link">
  <div className="card">
    <h2 className="card-title">MHA:Pokeman</h2>
    <img src="https://cdn6.fiction.live/file/fictionlive/images/1gtov31n1_pokemon-pokemon-red-and-blue-blastoise-pokemon-bulbasaur-pokemon-wallpaper-preview.jpg" alt="" />
    <p className="card-desc">Follow Kanami Kemono as we decide what to do with ourselves and the over 1000+ monsters that inhabit us. Have fun!</p>
  </div>
  </Link>
</div>

      </div>
  );
}

