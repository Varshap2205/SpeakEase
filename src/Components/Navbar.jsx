import React, { useEffect, useState } from 'react';
import logo from '/fav-icon.png';
import { MdMenuBook } from 'react-icons/md';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollEnabled]);

    const handleScrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setScrollEnabled(false); // Disable the scroll listener
            setActiveSection(targetId); // Set the active section immediately
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
            setTimeout(() => setScrollEnabled(true), 800); // Re-enable after smooth scroll
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
                <div>
                    <a href="/" className="flex gap-3 justify-center items-center text-2xl font-bold">
                        <img src={logo} alt="SpeakEase Logo" />
                        <span>SpeakEase</span>
                    </a>
                </div>
                <div className="hidden md:flex flex-grow justify-center">
                    <nav>{navLinks}</nav>
                </div>
                <div className="hidden md:block">
                    <a href="#chat" className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded">
                        Chat With AI
                    </a>
                </div>

                <div className="block md:hidden">
                    <button
                        onClick={handleToggle}
                        className={`text-white focus:outline-none ${isOpen ? 'border border-white' : ''}`}
                    >
                        <MdMenuBook className="size-6" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav className="absolute top-full left-0 w-full bg-heroBg z-20 md:hidden">
                    <ul className="flex flex-col p-4 space-y-3">
                        {navLinks.props.children}
                        <li className="py-2">
                            <a
                                href="#chat"
                                className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCloseMenu();
                                    handleScrollTo('chat'); // Smooth scroll to chat section
                                }}
                            >
                                Chat With AI
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
