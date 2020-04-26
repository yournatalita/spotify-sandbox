import express from 'express';
import request from 'request';
import cors from 'cors';
import * as path from 'path';
import * as querystring from 'querystring';
import cookieParser from 'cookie-parser';
import * as crypto from 'crypto';
import bodyParser from 'body-parser';

const clientId = 'b28af6ab5fa3404ebe1b04c1ffd156dc';
const clientSecret = '5073aaa6ac504b22a8d541901cbcc795';
const redirectUri = 'http://localhost:8888/callback/';
const stateKey = 'spotify_auth_state';
const app = express();

import { SCOPES } from './constants/scopes';

import * as userController from './controllers/user';
import * as browseController from './controllers/browse';
import * as personalizationController from './controllers/personalization';
import * as videosController from './controllers/videos';
import * as tracksController from './controllers/tracks';
import * as playerController from './controllers/player';

const APP_PATH = path.join(__dirname, '../app/public');

app
  .use(express.static(APP_PATH))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

const setApiListeners = (accessToken: string, _refreshToken: string): void => {
  app.get('/api/user', (req, res): void => {
    userController.getUser({ accessToken, req, res });
  });

  app.get('/api/recommendations', (req, res): void => {
    browseController.getRecommendations({ accessToken, req, res });
  });

  app.get('/api/personalization', (req, res): void => {
    const { typePath } = req.query || {};
    const params = req.query;

    personalizationController.getPersonalization({
      accessToken,
      req,
      res,
      options: { typePath },
      params
    });
  });

  app.get('/api/video', (req, res): void => {
    const params = req.query;

    videosController.searchVideo({ req, res, params });
  });

  app.get('/api/track', (req, res): void => {
    const params = req.query;

    tracksController.getTrackById({ accessToken, req, res, params });
  });

  app.get('/api/token', (req, res): void => {
    res.status(200).send({ accessToken });
  });

  app.put('/api/play', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.play({ accessToken, req, res, params, data });
  });

  app.post('/api/play/next', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.playNext({ accessToken, req, res, params, data });
  });

  app.post('/api/play/prev', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.playPrev({ accessToken, req, res, params, data });
  });

  app.put('/api/pause', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.pause({ accessToken, req, res, params, data });
  });

  app.get('/api/player/state', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.getState({ accessToken, req, res, params, data });
  });

  app.get('/api/player/recent', (req, res): void => {
    const params = req.query;
    const data = req.body;

    playerController.getRecentlyPlayed({ accessToken, req, res, params, data });
  });
};

app.get('/login', (_req, res) => {
  const STATE = crypto.randomBytes(20).toString('hex');
  res.cookie(stateKey, STATE);

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: SCOPES,
        redirect_uri: redirectUri,
        state: STATE
      })
  );
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        // const options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { Authorization: 'Bearer ' + accessToken },
        //   json: true
        // };

        setApiListeners(accessToken, refreshToken);

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/main');
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;

      res.send({
        access_token: accessToken
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
