import React from 'react';

import "../styles/globals.css";

import Filter from '../components/filter/filters';
import Footer from '../components/footer';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchBar/searchBar';
import LeftTab from '../components/joblisting';
import JobContextProvider from '../context/job.context';



const MyApp = () => {
  return (
    <div className="bg-white md:bg-gray-300">
      <Navbar />
      <JobContextProvider>
        <div className="h-full md:px-4 border-t md:border-0 mt-2 border-gray-500">
          <Searchbar />

          <div className="flex mt-4">
            <Filter />
            <LeftTab />

          </div>
        </div>
      </JobContextProvider>
      <Footer />
    </div>
  );
};


export default MyApp;