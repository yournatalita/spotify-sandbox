import axios from 'axios';
import { Dispatch } from 'redux';

import { IRequest } from '../declarations.d';
import * as actions from './actions';

const getTopVideo = (options: IRequest) => (dispatch: Dispatch) => {
  axios(options)
    .then(response => {
      const { data } = response;

      dispatch(actions.getTopVideo(data));
    })
    .catch(e => {
      console.error(e);
    });
};

const removeTopVideo = () => (dispatch: Dispatch) => {
  dispatch(actions.removeTopVideo());
};

export { getTopVideo, removeTopVideo };
