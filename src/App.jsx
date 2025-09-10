import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";

import { Toaster } from "react-hot-toast"; // 👈 yeh import karein

function App() {
  return (
    <Router>
      {/* Global Toaster for all toast messages */}
      <Toaster
        position="top-center" // 👈 position set kar sakte hain (top-right, bottom-right, etc.)
        toastOptions={{
          duration: 4000, // default 4 sec
          style: {
            fontSize: "14px",
          },
        }}
      />

      {/* Layout wrapper (Header + Footer common) */}
      <Layout>
        {/* yahan aap Routes daaloge */}
      </Layout>
    </Router>
  );
}

export default App;
