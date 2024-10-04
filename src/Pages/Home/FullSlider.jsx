import React from "react";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"; // Your CSS file

const FullSlider = ({ newsData, title, seeAllLink }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show more slides on larger screens
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1024, // Tablet and below
            settings: {
              slidesToShow: 2, // Show 2 slides for tablet
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // Mobile devices
            settings: {
              slidesToShow: 1, // Show only 1 slide for mobile
              slidesToScroll: 1,
            },
          },
        ],
      };

  return (
    <div className="news-slider">
      <h2 className="latest-news-title">{title}</h2>
      {seeAllLink && <a href={seeAllLink} className="see-all">See all →</a>}
      <Slider {...settings}>
        {newsData.map((news, index) => (
            <div key={index} className="news-card">
              <Link to={`/article/${news.id}`} style={{ textDecoration: 'none' }}>
                <div className="image-container">
                    <img src={news.UrlToImage} alt={news.title} className="news-image" />
                </div>
                <div className="news-content">
                    <p className="news-time-category red-color">
                    {news.source} 
                    </p>
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-description">{news.description}</p>
                    <p className="news-readtime"><span className="red-color">{news.category}</span> • {news.published_at_human}</p>
                </div>
              </Link>
            </div>
        ))}
       </Slider>

    </div>
  );
};

// Setting default props in case the parent component does not pass these values
FullSlider.defaultProps = {
  newsData: [],
  title: 'Latest News',
  seeAllLink: null, // null means no "See All" link by default
};

// PropTypes for type-checking
FullSlider.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string,
  seeAllLink: PropTypes.string,
};

export default FullSlider;
