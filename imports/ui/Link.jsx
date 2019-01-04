import React, { Component } from 'react';

import AddLink from './AddLink.jsx';
import LinksList from './LinksList.jsx';
import LinksListFilters from './LinksListFilters.jsx';
import PrivateHeader from './PrivateHeader.jsx';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <div className='page-content'>
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};
