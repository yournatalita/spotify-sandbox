import axios from 'axios';
import { Dispatch } from 'redux';

import { IRequest } from '../declarations.d';

import * as actions from './actions';

const getRecommendations = (options: IRequest) => (dispatch: Dispatch) => {
  axios(options)
    .then(response => {
      dispatch(actions.getRecommendations(response));
    })
    .catch(e => {
      console.error(e);
    });
};

export { getRecommendations };
