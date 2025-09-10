// App.jsx (root)
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 999999 }} // <- very high z-index for toasts
        toastOptions={{
          duration: 4000,
          style: { fontSize: "14px" },
        }}
      />

      <Layout>
        {/* Routes / pages */}
      </Layout>
    </Router>
  );
}

export default App;
