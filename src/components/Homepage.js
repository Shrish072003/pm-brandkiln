import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProjectModal from './AddProjectModal'; // Adjust the path based on your actual file structure

const Homepage = () => {
  const [projects, setProjects] = useState([]);
  const [layoutMode, setLayoutMode] = useState('grid');
  const [isModalOpen, setModalState] = useState(false); // State to control modal visibility

  // Function to fetch projects from API
  const fetchProjects = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/projects/`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };

  // Use effect to fetch projects on component mount
  useEffect(() => {
    fetchProjects();
    // Remove event listener cleanup
    return () => {
      document.removeEventListener('projectUpdate', fetchProjects);
    };
  }, []);

  // Function to toggle layout mode between 'grid' and 'list'
  const toggleLayoutMode = (mode) => {
    setLayoutMode(mode);
    localStorage.setItem('layoutMode', mode);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setModalState(true);
  };

  // Function to handle adding a new project
  const handleAddProject = () => {
    openModal();
  };

  return (
    <div className="flex flex-col items-center w-full pt-10">
      <div className="mb-4 space-x-4 flex items-center justify-between w-full pr-10 pl-12">
        <div className='text-2xl' >Recent Projects</div>
        <div className='flex items-center justify-between gap-4'>
        <button
          className={`px-4 py-2 rounded-md ${layoutMode === 'grid' ? 'text-white bg-indigo-300' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleLayoutMode('grid')}
        >
          <svg width="36px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 3C3.88235 3 3 3.88235 3 6.75C3 9.61765 3.88235 10.5 6.75 10.5C9.61765 10.5 10.5 9.61765 10.5 6.75C10.5 3.88235 9.61765 3 6.75 3Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.75 13.5C3.88235 13.5 3 14.3824 3 17.25C3 20.1176 3.88235 21 6.75 21C9.61765 21 10.5 20.1176 10.5 17.25C10.5 14.3824 9.61765 13.5 6.75 13.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.25 13.5C14.3824 13.5 13.5 14.3824 13.5 17.25C13.5 20.1176 14.3824 21 17.25 21C20.1176 21 21 20.1176 21 17.25C21 14.3824 20.1176 13.5 17.25 13.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.25 3C14.3824 3 13.5 3.88235 13.5 6.75C13.5 9.61765 14.3824 10.5 17.25 10.5C20.1176 10.5 21 9.61765 21 6.75C21 3.88235 20.1176 3 17.25 3Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`px-2 py-1 rounded-md focus:outline-none ${layoutMode === 'list' ? 'text-white bg-indigo-300' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleLayoutMode('list')}
        >
          <svg width="45px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L4 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M15 12L4 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 17H4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
          <h1 className="text-lg text-gray-600">Select or create new project</h1>
        </div>
      ) : (
        <div className={`${layoutMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : ''} w-full px-10`}>
          {projects.map((project) => (
          <Link
          to={`/${project._id}`}
          key={project._id}
          className={`relative main-card bg-white rounded-lg shadow-md hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] ${layoutMode === 'list' ? 'py-4 px-6 mb-4 flex flex-col w-96' : 'p-5'}`}
        >
          <div className="text-xl font-semibold text-gray-800 mb-2">{project.title}</div>
          <div className={`${layoutMode === 'list' ? 'mb-2' : 'mb-2 line-clamp-3 truncate'} text-gray-600`}>{project.description}</div>
          <div className="text-sm text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</div>
        </Link>
        
          ))}
          <div
            onClick={handleAddProject}
            className={`relative bg-white main-card gap-3 items-center flex-col justify-center flex rounded-lg shadow-md hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] ${layoutMode === 'list' ? 'py-4 px-6 mb-4 flex flex-col w-4/5' : 'p-5'}`}
          >
                            <div>Add Projects</div>

            <div className='bg-indigo-200 rounded-full p-[15px] focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-1 lastcard'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>

          </div>
        </div>
      )}

      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && <AddProjectModal isModalOpen={isModalOpen} closeModal={() => setModalState(false)} />}
    </div>
  );
};

export default Homepage;
