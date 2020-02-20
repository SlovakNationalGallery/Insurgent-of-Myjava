import React from 'react';

import Shot from '../components/Shot.jsx';

//Component
class Finish extends React.Component {
  static async getInitialProps({ req, query: { id } }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const headers = req ? { Authorization: req.headers.authorization } : {}

    const request = await fetch(`${baseUrl}/api/${id}`, { headers });

    const savedInsurgent = await request.json();

    return { savedInsurgent };
  }

  render() {
    return <Shot saved={this.props.savedInsurgent} />;
  }
}

export default Finish;
