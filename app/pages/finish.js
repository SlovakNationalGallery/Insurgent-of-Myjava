import React from 'react';
import Router from 'next/router';

import Finale from '../components/Finale.jsx';

//Component
class Finish extends React.Component {
  static async getInitialProps({ req, res, query: { id } }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const headers = req ? { Authorization: req.headers.authorization } : {}

    const request = await fetch(`${baseUrl}/api/${id}`, { headers });

    const savedInsurgent = await request.json();

    if (savedInsurgent.finished) {
      const dest = `/gallery/${savedInsurgent._id}`;
      if (res) {
        res.writeHead(302, {
          Location: dest
        });
        res.end();
      } else {
        Router.push(dest);
      }
    }

    return { savedInsurgent };
  }

  render() {
    return <Finale saved={this.props.savedInsurgent} />;
  }
}

export default Finish;
