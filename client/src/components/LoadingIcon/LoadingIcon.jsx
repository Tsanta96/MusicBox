import React from 'react';
import './loadingIcon.scss';
const LoadingIcon = props => (
  <div className="position-loader">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingIcon;

