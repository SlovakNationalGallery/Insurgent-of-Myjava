import 'isomorphic-unfetch';
import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { PageTransition } from 'next-page-transitions';

import { Main } from '../components/layouts';

import { initStore } from '../store';
import { DATA } from '../constants';

class Insurgent extends App {
  static async getInitialProps({ Component, ctx }) {
    const baseUrl = ctx.req
      ? `${ctx.req.protocol}://${ctx.req.get('Host')}`
      : '';
    const headers = ctx.req ? { Authorization: ctx.req.headers.authorization } : {}

    const state = ctx.store.getState();

    if (!state.data.loaded) {
      const data = await fetch(`${baseUrl}/data`, { headers });

      ctx.store.dispatch({
        type: DATA.LOADED,
        payload: await data.json()
      });
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });

    document.body.addEventListener(
      'touchstart',
      e => {
        if (e.touches > 2) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      false
    );
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <PageTransition timeout={500} classNames="page-transition">
            <Main>
              <Head>
                <title>Insurgent of Myjava</title>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
              </Head>
              <Component {...pageProps} />
            </Main>
          </PageTransition>
        </Provider>

        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 500ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 500ms;
          }
        `}</style>
      </Container>
    );
  }
}

export default withRedux(initStore)(Insurgent);
