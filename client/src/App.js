import "./App.css";
import Header from "./components/header";
// import Main from "./components/Main";
// import Main2 from "./components/Main2";
// import { useState } from "react";

function App() {
  // const [currentPage, setCurrentPage] = useState("Date");
  // const handlePageChange = (page) => setCurrentPage(page);

  // const renderPage = () => {
  //   if (currentPage === "Date") {
  //     return <Main2 />;
  //   }
  //   return <Main />;
  // };

  return (
    <div className="App">
      {/* <Header currentPage={currentPage} handlePageChange={handlePageChange} /> */}
      <Header />
    </div>
  );
}

export default App;
