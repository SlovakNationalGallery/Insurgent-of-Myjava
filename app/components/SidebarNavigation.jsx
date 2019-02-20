import React, { Component, Fragment } from 'react';
import Cta from './Cta.jsx';

import { _s } from '../utils';

class SidebarNavigation extends Component {
  listSteps() {
    const steps = [];
    for (let index = 0; index <= this.props.totalSteps; index++) {
      steps.push(
        <Cta
          active={index <= this.props.step}
          key={`step_${index}`}
          action={() => this.props.changeStep(index)}
        >
          {index}
        </Cta>
      );
    }
    return steps;
  }

  render() {
    const {
      advanceStep,
      activateHelp,
      saveInsurgent,
      step,
      totalSteps,
      data
    } = this.props;

    return (
      <Fragment>
        <header className="sidebar-steps">
          <nav>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="400"
              height="100"
              viewBox="0 0 105.833 26.458"
            >
              <g
                transform="translate(0 -270.542)"
                stroke="#fff"
                strokeWidth=".54"
              >
                <path
                  d="M8.524 282.966c18.92 0 75.678.133 94.597.133v-.133-.132c-18.92 0-75.678.132-94.597.132z"
                  transform="matrix(1.05696 0 0 1 -6.225 .804)"
                  fill="none"
                />
                <circle
                  cx="3.326"
                  cy="283.771"
                  r="1.663"
                  fill={step > -1 ? 'white' : 'black'}
                />
                <circle
                  r="1.663"
                  cy="283.771"
                  cx="36.311"
                  fill={step > 0 ? 'white' : 'black'}
                />
                <circle
                  cx="69.296"
                  cy="283.771"
                  r="1.663"
                  fill={step > 2 ? 'white' : 'black'}
                />
                <circle
                  r="1.663"
                  cy="283.771"
                  cx="102.281"
                  fill={step > 3 ? 'white' : 'black'}
                />
              </g>
            </svg>
          </nav>
        </header>
        <ul className="sidebar-nav">
          <li className="sidebar-next">
            {step < totalSteps ? (
              <Cta action={() => advanceStep()} className="big">
                {_s('CONTINUE', data)}
              </Cta>
            ) : (
              <Cta action={() => saveInsurgent()} className="big">
                {_s('FINISH', data)}
              </Cta>
            )}
          </li>
          <li>
            <Cta action={() => activateHelp()}>{_s('HELP', data)}</Cta>
          </li>
          <li>
            <Cta href="/">{_s('HOME', data)}</Cta>
          </li>
        </ul>
        <style jsx>{`
          header.sidebar-steps {
          }

          ul.sidebar-nav {
            list-style: none;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          }

          li.sidebar-next {
            flex-basis: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default SidebarNavigation;
