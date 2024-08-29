// src/Home.jsx
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="l-header">
        <h1>News</h1>
      </header>

      <div className="carousel-wrapper">
        <Splide
          id="js-splide"
          options={{
            perPage: 2,
            perMove: 1,
            arrows: false,
            focus: 'center',
            cover: true,
            type: 'loop',
            autoplay: true,
            pagination: false,
            speed: 500,
            interval: 2000,
            pauseOnHover: false,
            breakpoints: {
              800: {
                perPage: 2,
                focus: 'center',
              },
              600: {
                perPage: 1,
              },
            },
          }}
        >
          <SplideSlide>
            <div className="c-card">
              <div className="c-card__content">
                <header className="c-card__header">
                  <h2 className="c-card__title" data-title="Crime Scene 1">Crime Scene 1</h2>
                </header>
                <img
                  className="c-card__image"
                  src="https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=600"
                  alt="Crime Scene 1"
                />
                <footer className="c-card__footer">
                  <a href="#" className="c-card__link">See Details</a>
                </footer>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="c-card">
              <div className="c-card__content">
                <header className="c-card__header">
                  <h2 className="c-card__title" data-title="Crime Scene 2">Crime Scene 2</h2>
                </header>
                <img
                  className="c-card__image"
                  src="https://images.pexels.com/photos/13359828/pexels-photo-13359828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Crime Scene 2"
                />
                <footer className="c-card__footer">
                  <a href="#" className="c-card__link">See Details</a>
                </footer>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="c-card">
              <div className="c-card__content">
                <header className="c-card__header">
                  <h2 className="c-card__title" data-title="Crime Scene 3">Crime Scene 3</h2>
                </header>
                <img
                  className="c-card__image"
                  src="https://images.pexels.com/photos/3412019/pexels-photo-3412019.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Crime Scene 3"
                />
                <footer className="c-card__footer">
                  <a href="#" className="c-card__link">See Details</a>
                </footer>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="c-card">
              <div className="c-card__content">
                <header className="c-card__header">
                  <h2 className="c-card__title" data-title="Crime Scene 4">Crime Scene 4</h2>
                </header>
                <img
                  className="c-card__image"
                  src="https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Crime Scene 4"
                />
                <footer className="c-card__footer">
                  <a href="#" className="c-card__link">See Details</a>
                </footer>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default Home;
