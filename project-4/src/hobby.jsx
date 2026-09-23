import Gaming from "./assets/free fire.jpg";
import Music from "./assets/Music.jpg";
import Reading from "./assets/feels.jpg";
import Photography from "./assets/photogrphy.jpg";
import Traveling from "./assets/travel.jpg";
import Cooking from "./assets/cook.jpg";
import "./hobby.css";

//child component

function HobbyCard(props) {
  return (
    <div className="card">

      <img
        src={props.image}
        alt={props.hobby}
      />

      <h2>{props.hobby}</h2>

      <p>{props.description}</p>

    </div>
  );
}

//Parent component
function Hobby() {
  return (
    <div>
      <h1>My Hobbies</h1>

      <div className="hobby-container">

        <HobbyCard
          image={Gaming}
          hobby="Gaming"
          description="I enjoy playing video games."
        />

        <HobbyCard
          image={Music}
          hobby="Music"
          description="I love listening to music."
        />

        <HobbyCard
          image={Reading}
          hobby="Reading"
          description="I enjoy reading books."
        />

        <HobbyCard
          image={Photography}
          hobby="Photography"
          description="I like taking beautiful photos."
        />

        <HobbyCard
          image={Traveling}
          hobby="Traveling"
          description="I enjoy visiting new places."
        />

        <HobbyCard
          image={Cooking}
          hobby="Cooking"
          description="I enjoy cooking different dishes."
        />

      </div>
    </div>
  );
}





export default Hobby;