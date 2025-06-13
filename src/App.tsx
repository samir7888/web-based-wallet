import "./App.css";

import { Route, Routes } from "react-router-dom";
import ShowBalance from "./components/show-balance";
import Home from "./home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:network/:key" element={<ShowBalance />} />
    </Routes>
  );
}

export default App;
