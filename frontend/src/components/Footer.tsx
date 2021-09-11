import React from 'react';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

const Footer: React.FC = () => {
    return (
      <footer className="px-10 py-4 bg-white h-16">
        <nav className="my-0 mx-auto max-w-7xl flex items-center justify-between">
          <div>2021 &copy; NotesKeeper</div>
          <div>
            <a
              href="https://github.com/JinHao-L/crud-application"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="w-8 h-8" />
            </a>
          </div>
        </nav>
      </footer>
    );
  };
  
  export default Footer;