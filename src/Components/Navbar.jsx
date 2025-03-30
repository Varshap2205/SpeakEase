import React, { useEffect, useState, useRef } from 'react';
import logo from '/fav-icon.png';
import { MdMenuBook } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const LoginDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative hidden md:block" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded"
            >
                Login
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <button 
                        onClick={() => navigate("/user-login")} 
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Login as User
                    </button>
                    <button 
                        onClick={() => navigate("/admin-login")} 
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Login as Admin
                    </button>
                </div>
            )}
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollEnabled, setScrollEnabled] = useState(true);
    
    const handleToggle = () => setIsOpen(!isOpen);
    const handleCloseMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollEnabled) return;
            const sections = ['home', 'services', 'about', 'pricing', 'testimonial', 'contact'];
            const scrollPosition = window.scrollY + 100;
            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollEnabled]);

    const handleScrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setScrollEnabled(false);
            setActiveSection(targetId);
            window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
            setTimeout(() => setScrollEnabled(true), 800);
        }
    };

    const navLinks = (
        <ul className="font-medium flex flex-col md:flex-row lg:space-x-8 sm:space-x-4 space-y-2 md:space-y-0 p-4 md:p-0">
            {['home', 'services', 'about', 'pricing', 'testimonial', 'contact'].map((section) => (
                <li key={section}>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={`#${section}`}
                        className={`text-white ${activeSection === section ? 'isActive' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleCloseMenu();
                            handleScrollTo(section);
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.a>
                </li>
            ))}
        </ul>
    );

    return (
        <header className="bg-heroBg text-white py-6 px-4 fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex justify-between items-center h-full">
                <a href="/" className="flex gap-3 justify-center items-center text-2xl font-bold">
                    <img src={logo} alt="SpeakEase Logo" />
                    <span>SpeakEase</span>
                </a>
                <div className="hidden md:flex flex-grow justify-center">
                    <nav>{navLinks}</nav>
                </div>
                <LoginDropdown />
                <button onClick={handleToggle} className="block md:hidden text-white focus:outline-none">
                    <MdMenuBook className="size-6" />
                </button>
            </div>
            {isOpen && (
    <nav className="absolute top-full left-0 w-full bg-heroBg z-20 md:hidden">
        <ul className="flex flex-col p-4 space-y-3">
            {['home', 'services', 'about', 'pricing', 'testimonial', 'contact'].map((section) => (
                <li key={section}>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={`#${section}`}
                        className={`text-white ${activeSection === section ? 'isActive' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleCloseMenu();
                            handleScrollTo(section);
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.a>
                </li>
            ))}
            <li className="py-2">
                <button className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded w-full text-left" onClick={handleCloseMenu}>
                    Login
                </button>
            </li>
        </ul>
    </nav>
)}

        </header>
    );
};

export default Navbar;
