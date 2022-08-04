import starWars from "../assets/images/sw.jpg";

export default function Poster() {
  return (
    <div>
      <img className="maxWidth100" src={starWars} alt="Star Wars image" />
    </div>
  );
}
