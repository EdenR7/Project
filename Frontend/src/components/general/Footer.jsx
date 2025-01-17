import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" h-32 border-t flex flex-col w-full items-center p-6 break-650px:flex-row break-650px:justify-center break-650px:gap-10 break-1000px:gap-20">
      <div>
        <div className="flex space-x-4 justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <Twitter />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <Facebook />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <Linkedin />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <Github />
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center">
        <div className="mb-4 md:mb-0 text-center">
          <Link className="text-lg font-semibold text-primary" to="/">
            TaskEase
          </Link>
          <p>
            &copy; {new Date().getFullYear()} TaskEase. All rights reserved.
          </p>
          <p className=" text-primary">Created and designed By Eden Roth</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
