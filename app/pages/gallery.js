import React from 'react';

import GalleryList from '../components/GalleryList.jsx';

//Component
class Gallery extends React.Component {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const headers = req ? { Authorization: req.headers.authorization } : {}

    const request = await fetch(`${baseUrl}/api/`, { headers });

    const items = await request.json();

    return { items };
  }

  render() {
    return <GalleryList items={this.props.items} />;
  }
}

export default Gallery;
