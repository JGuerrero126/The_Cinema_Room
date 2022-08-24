import Movie from "./Movie";
import News from "./News";
import Poster2 from "./Poster2";

export default function Main() {
  return (
    <div className="rowC">
      <div style={{ flex: 1 }}>
        <News />
        <News />
        <News />
        <News />
        <News />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </div>
      <div style={{ flex: 1 }}>
        <Poster2 />
      </div>
    </div>
  );
}
