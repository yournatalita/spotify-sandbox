const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const path = require('path')
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const clientId = 'b28af6ab5fa3404ebe1b04c1ffd156dc';
const clientSecret = '5073aaa6ac504b22a8d541901cbcc795';
const redirectUri = 'http://localhost:8888/callback/';
const stateKey = 'spotify_auth_state';
const app = express();

const APP_PATH = path.join(__dirname, '../app/public');

app.use(express.static(APP_PATH))
    .use(cors())
    .use(cookieParser());

console.log(__dirname + '/app/public');

app.get('/login', (req, res) => {
    const STATE = crypto.randomBytes(20).toString('hex');
    res.cookie(stateKey, STATE);

    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: STATE,
        }));
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
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
                'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const accessToken = body.access_token;
                const refreshToken = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + accessToken},
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    const refreshToken = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const accessToken = body.access_token;

            res.send({
                'access_token': accessToken
            });
        }
    });
});

console.log('Listening on 8888');
app.listen(8888);
