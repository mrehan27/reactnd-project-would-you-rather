import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../utils/Constants';

function PageNotFound(props) {
    return (
        <div className='page-not-found'>
            <h1 className='page-not-found-head'>Page Not Found</h1>
            <p className='page-not-found-body'>The page you are looking for does not exist or have been deleted. Let us help and take you back home.</p>
            <Link
                className='button-outlined'
                to={Constants.PATH_TO_DASHBOARD}
            >
                Go to Home
            </Link>
        </div>
    );
}

export default PageNotFound;
