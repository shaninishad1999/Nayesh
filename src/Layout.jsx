import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NayashLanding from "./components/NayashLanding";
import FoundersSection from "./components/FoundersSection";
import NewsletterSection from "./components/NewsletterSection";
import NayashGroupCard from "./components/NayashGroupCard";
import CompanyValuesPage from "./components/CompanyValuesPage";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="">
        {children}

        <NayashLanding />
        <FoundersSection/>
        <NayashGroupCard/>
        <CompanyValuesPage/>
        <NewsletterSection/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
