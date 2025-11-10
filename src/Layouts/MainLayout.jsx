import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Provider/AuthProvider";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";



const MainLayout = () => {
  const { loading } = useContext(AuthContext) ;


  if( loading ) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;