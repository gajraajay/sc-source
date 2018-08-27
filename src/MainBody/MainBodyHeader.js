import  React from 'react';
export const MainBodyHeader = ( props ) => {
  return <div className="mainbody-header d-flex m-0 align-items-center col-md-12 p-3 text-white-50 bg-dark">
    <img
      className="mr-3"
      src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg"
      alt=""
      width="48"
      height="48" />
    <div className="lh-100">
      <h6 className="mb-0 text-white lh-100">Bootstrap</h6>
      <small>Since 2011</small>
    </div>
  </div>
}

