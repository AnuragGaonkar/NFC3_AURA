import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Navbar.css';
import SignUpModal from '../Login/SignUpModal';
import ProfileSlideBar from './ProfileSlideBar';
import { useTranslation } from 'react-i18next';
import '../i18n';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [language, setLanguage] = useState('English'); // Default language
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    const languageCode = lang === 'English' ? 'en' : 'hi'; // Use 'hi' for Hindi
    i18n.changeLanguage(languageCode).catch((error) => {
      console.error('Error changing language:', error);
    });
    setLanguage(lang);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    document.querySelector('.navbar-title').style.display = 'none';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.querySelector('.navbar-title').style.display = 'block';
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null); // Set user to null on sign-out
      setIsProfileOpen(false); // Ensure profile is closed on sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleProfileSlideBar = () => {
    if (user) { // Only toggle if user is authenticated
      setIsProfileOpen(!isProfileOpen);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">{t('Community Safety App')}</h1>
      </div>
      <div className="navbar-right">
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <div className='navv'>
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <div className="navbar-banner">
              <button className="close-button" onClick={closeMenu}>×</button>
              <h2>{t('Community Safety App')}</h2>
            </div>
            <Link to="/" className="navbar-link" onClick={closeMenu}>{t('HOME')}</Link>
            <Link to="/map" className="navbar-link" onClick={closeMenu}>{t('MAP')}</Link>
            <Link to="/report" className="navbar-link" onClick={closeMenu}>{t('REPORT A CRIME')}</Link>
            {!user ? (
              <Link className="navbar-link" onClick={openModal}>{t('SIGN IN')}</Link>
            ) : (
              <>
                <Link className="navbar-link" onClick={toggleProfileSlideBar}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#7D8590"
                      d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
                    ></path>
                  </svg>
                  {user.displayName || t('Profile')}
                </Link>
                {isProfileOpen && <ProfileSlideBar user={user} onClose={toggleProfileSlideBar} />}
              </>
            )}
            <button onClick={() => handleLanguageChange('English')}>{t('English')}</button>
            <button onClick={() => handleLanguageChange('Hindi')}>{t('Hindi')}</button>
          </div>
        </div>
        <div className="navbar-links-desktop">
          <Link to="/" className="navbar-link-desktop">{t('HOME')}</Link>
          <Link to="/map" className="navbar-link-desktop">{t('MAP')}</Link>
          <Link to="/report" className="navbar-link-desktop">{t('REPORT A CRIME')}</Link>
          {!user ? (
            <Link className="navbar-link-desktop" onClick={openModal}>{t('SIGN IN')}</Link>
          ) : (
            <Link className="navbar-link-desktop" onClick={handleSignOut}>
              {t('Profile')}
            </Link>
          )}
        </div>
      </div>
      {isModalOpen && <SignUpModal onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;
