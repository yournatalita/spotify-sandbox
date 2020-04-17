import { Dispatch } from 'redux';

import * as actions from './actions';

const setPlayedTrackId = (id: string) => (dispatch: Dispatch) => {
  dispatch(
    actions.setPlayedTrackIdAction({
      playedTrackId: id
    })
  );
};

export { setPlayedTrackId };
