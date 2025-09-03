import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      {/* Layout wrapper (Header + Footer common) */}
      <Layout>
       

        
      </Layout>
    </Router>
  );
}

export default App;
