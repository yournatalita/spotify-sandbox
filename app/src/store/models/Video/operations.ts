import axios from 'axios';
import { Dispatch } from 'redux';

import { TopVideoData } from './index.d';
import * as actions from './actions';

const getTopVideo = ({ q, id }: TopVideoData) => (dispatch: Dispatch) => {
  axios({
    url: '/api/video',
    method: 'get',
    params: { q }
  })
    .then(response => {
      const { data } = response;

      dispatch(actions.getTopVideo({ ...data, artistSpotifyId: id }));
    })
    .catch(e => {
      console.error(e);
    });
};

const removeTopVideo = () => (dispatch: Dispatch) => {
  dispatch(actions.removeTopVideo());
};

export { getTopVideo, removeTopVideo };
