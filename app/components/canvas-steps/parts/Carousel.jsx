import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { _s } from '../../../utils';

const SLIDE_TIMEOUT = 500;

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: this.getSlides(),
      sliding: false,
      direction: 0
    };

    this.handleAdvance = this.handleAdvance.bind(this);
    this.handleRetreat = this.handleRetreat.bind(this);
  }
  getSlides() {
    const current = this.props.current;
    const length = this.props.items.length;
    const slides = [];

    for (let i = current - 2; i <= current + 2; i++) {
      const s = i > length - 1 ? i - length : i < 0 ? i + length : i;
      slides.push(this.props.items[s]);
    }

    return slides;
  }

  handleAdvance() {
    if (this.state.sliding) return false;

    const current =
      this.props.current === this.props.items.length - 1
        ? 0
        : this.props.current + 1;

    this.props.select(current);

    this.setState({ sliding: true, direction: -1 }, () =>
      setTimeout(() => {
        this.setState({ slides: this.getSlides(), sliding: false });
      }, SLIDE_TIMEOUT + 50)
    );
  }

  handleRetreat() {
    if (this.state.sliding) return false;

    const current =
      this.props.current === 0
        ? this.props.items.length - 1
        : this.props.current - 1;

    this.props.select(current);

    this.setState({ sliding: true, direction: 0 }, () =>
      setTimeout(() => {
        this.setState({ slides: this.getSlides(), sliding: false });
      }, SLIDE_TIMEOUT)
    );
  }

  render() {
    const { sliding, direction } = this.state;
    const { data } = this.props;

    const slideStyles = sliding
      ? direction < 0
        ? {
            transform: `translateX(-${100 / 1.5}%)`,
            transition: `transform ${SLIDE_TIMEOUT}ms ease-in-out`
          }
        : {
            transform: 'translateX(0)',
            transition: `transform ${SLIDE_TIMEOUT}ms ease-in-out`
          }
      : {};

    return (
      <Swipeable
        onSwipedRight={this.handleRetreat}
        onSwipedLeft={this.handleAdvance}
      >
        <div className="carousel-tray">
          <button className="carousel-control" onClick={this.handleRetreat}>
            {_s('PREVIOUS', data)}
          </button>
          <button
            className="carousel-control advance"
            onClick={this.handleAdvance}
          >
            {_s('NEXT', data)}
          </button>
          <ul className="carousel" style={slideStyles}>
            {this.state.slides.map((i, index) => {
              let iCurrent = null;
              let iStyle = {};

              if (sliding) {
                iCurrent = direction < 0 ? 3 : 1;
                iStyle = {
                  transition: `all ${SLIDE_TIMEOUT}ms ease-in-out`
                };
              } else {
                iCurrent = 2;
              }

              return (
                <li
                  key={`carousel_${index}`}
                  className="carousel-item"
                  style={{
                    left: `${(100 / 3) * index}%`
                  }}
                >
                  <img
                    key={`carousel_image_${index}`}
                    src={`/static/${i.full || i.image}`}
                    style={iStyle}
                    className={`carousel-image ${
                      index === iCurrent ? 'current' : null
                    }`}
                  />
                </li>
              );
            })}
          </ul>
          <div className="indicator">
            <svg width={this.props.items.length * 60} height="100">
              <g>
                {this.props.items.map((item, index) => {
                  return (
                    <circle
                      key={`indicator_${index}`}
                      cx={index * 60 + 30}
                      cy="50"
                      r="10"
                      fill={
                        this.props.current === index ? 'white' : 'transparent'
                      }
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          <style jsx>{`
            div.indicator {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: flex-end;
            }

            circle {
              stroke: white;
              stroke-width: 2px;
            }

            div.carousel-tray {
              position: relative;
              overflow: hidden;
            }

            ul.carousel {
              list-style: none;
              height: 100vh;
              position: relative;
              transform: translateX(calc(100% / -3));
            }

            li.carousel-item {
              position: absolute;
              width: calc(100% / 3);
              height: 100vh;
              top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: left ${SLIDE_TIMEOUT}ms ease-in-out;
            }

            img.carousel-image {
              transform: scale(0.8);
              opacity: 0.5;
              will-change: transform, opacity;
              width: 100%;
            }

            img.carousel-image.current {
              transform: scale(1);
              opacity: 1;
            }

            button.carousel-control {
              position: absolute;
              top: calc(50% - 25px);
              z-index: 1;
              margin: 0 1rem;
              padding: 1rem;
              width: 4rem;
              height: 4rem;
              background-color: transparent;
              background-image: url('/static/i-arrow.svg');
              color: transparent;
              transform: scaleX(-1);
              outline: none;
            }

            button.advance {
              right: 0;
              transform: none;
            }
          `}</style>
        </div>
      </Swipeable>
    );
  }
}

export default Carousel;
