import { HashRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
