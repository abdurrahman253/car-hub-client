import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import CustomChat from "../Components/CustomChat";
import ErrorBoundary from '../Components/ErrorBoundary';

const AuthLayout = () => {
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

export default AuthLayout;
