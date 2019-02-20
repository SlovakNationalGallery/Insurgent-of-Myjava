import React, { Component, Fragment } from 'react';
import Router from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { _s } from '../utils';

import {
  finishAdvance,
  setInsurgentName,
  setInsurgentEmail,
  finishFinished
} from '../actions';

import { Loader, Validate, Input } from './finale-steps';
import TimeoutCta from './TimeoutCta.jsx';

function mapStateToProps(state) {
  const { data, finish } = state;
  return {
    data,
    finish
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { finishAdvance, setInsurgentName, setInsurgentEmail, finishFinished },
    dispatch
  );
}

class Finale extends Component {
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  setName(name) {
    if (!name) return;
    this.props.setInsurgentName(name);
    this.props.finishAdvance();
  }

  setEmail(email) {
    this.props.setInsurgentEmail(email);
    this.props.finishFinished({
      id: this.props.saved._id,
      name: this.props.finish.name,
      email
    });
  }

  render() {
    const { step, done } = this.props.finish;

    if (done) Router.push(`/gallery`);

    const character = this.props.data.content.characters[
      this.props.saved.insurgent.character
    ];

    const weapon = this.props.data.content.weapons[
      this.props.saved.insurgent.weapon.model
    ];

    const extras = this.props.saved.insurgent.weapon.extras;

    if (step === 0) return <Loader next={this.props.finishAdvance} />;

    return (
      <Fragment>
        {step === 1 ? (
          <div className="timeout-overlay">
            <TimeoutCta
              timeout={10000}
              action={() => this.props.finishAdvance()}
            >
              {_s('CONTINUE', this.props.data)}
            </TimeoutCta>
          </div>
        ) : null}

        {step === 2 ? (
          <Input nextAction={this.setName}>
            <h1 className="input-title">
              {_s('INPUT_NAME_TITLE', this.props.data)}
            </h1>
            <div
              className="input-intro"
              dangerouslySetInnerHTML={_s(
                'INPUT_NAME_TEXT',
                this.props.data,
                true
              )}
            />
          </Input>
        ) : null}

        {step === 3 ? (
          <Input nextAction={this.setEmail}>
            <h1 className="input-title">
              {_s('INPUT_EMAIL_TITLE', this.props.data)}
            </h1>
            <div
              className="input-intro"
              dangerouslySetInnerHTML={_s(
                'INPUT_EMAIL_TEXT',
                this.props.data,
                true
              )}
            />
          </Input>
        ) : null}

        <Validate
          character={character}
          weapon={weapon}
          extras={extras}
          insurgent={this.props.saved.insurgent}
        />

        <style jsx>
          {`
            div.timeout-overlay {
              position: absolute;
              z-index: 1000000;
              right: 10vw;
              bottom: 10vh;
            }

            h1.input-title {
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }

            div.input-intro {
              font-family: SourceSans;
              font-size: 1.3rem;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

const ConnectedFinale = connect(
  mapStateToProps,
  mapDispatchToProps
)(Finale);

export default ConnectedFinale;
