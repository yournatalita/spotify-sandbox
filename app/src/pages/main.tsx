import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { TMainProps } from './main.d';
import { operationsBrowse } from '../store/models/Browse';

const Main = ({ getRecommendations }: TMainProps): JSX.Element => {
  useEffect(() => {
    getRecommendations({
      url: '/api/recommendations',
      method: 'get'
    });
  }, []);

  return <div className="Main">Main</div>;
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return state;
};

const mapDispatchToProps = {
  ...operationsBrowse
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
