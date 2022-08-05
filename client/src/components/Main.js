import Movie from "./Movie";
import News from "./News";
import Poster from "./Poster";

export default function Main() {
  return (
    <div className="rowC">
      <div style={{ flex: 1 }}>
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <News />
        <News />
        <News />
        <News />
        <News />
      </div>
      <div style={{ flex: 1 }}>
        <Poster />
      </div>
    </div>
  );
}
