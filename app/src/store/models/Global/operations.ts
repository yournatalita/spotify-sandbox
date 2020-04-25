import axios from 'axios';
import { Dispatch } from 'redux';

import * as actions from './actions';

const setPlayedTrackId = (id: string) => (dispatch: Dispatch): void => {
  dispatch(
    actions.setPlayedTrackIdAction({
      playedTrackId: id
    })
  );
};

const getToken = () => (): Promise<string> => {
  return new Promise<string>(resolve => {
    axios({
      method: 'get',
      url: '/api/token'
    })
      .then(response => {
        const { data } = response;

        resolve(data.accessToken);
      })
      .catch(e => {
        if (e && e.response && e.response.status === 401) {
          // TODO: remove debugging
          console.log('getToken: Error');
        }
        console.error(e);
      });
  });
};

export { setPlayedTrackId, getToken };
