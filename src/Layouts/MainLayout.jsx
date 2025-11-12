import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Provider/AuthProvider";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import CustomChat from "../Components/CustomChat";
import ErrorBoundary from "../Components/ErrorBoundary";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
       <ErrorBoundary>
         <Outlet />
       </ErrorBoundary>
      </main>
      <Footer />

    
      <CustomChat />
    </div>
  );
};

export default MainLayout;