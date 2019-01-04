import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Page Not Found</h1>
        <p>
          Sorry, we're unable to get that page.
        </p>
        <Link to='/' className='button button--link'>HEAD HOME</Link>
      </div>
    </div>
  );
};
