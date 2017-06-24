const express = require('express');
const request = require('request');
const router = express.Router();

const client_id = process.env.FACEBOOK_CLIENT_ID;
const client_secret = process.env.FACEBOOK_CLIENT_SECRET;

const redirect_uri = process.env.REDIRECT_URI

// redirect to oauth provider
router.get('/login', (req, res, next) => {
  const url = 'https://www.facebook.com/v2.8/dialog/oauth';
  const queryParams = `client_id=${client_id}&redirect_uri=${redirect_uri}`
  const scopes = ['user_birthday', 'user_likes', 'user_photos', 'user_posts']
  res.redirect(url + '?' + queryParams);
});

router.get('/callback', (req, res, next) => {
  const {code, state} = req.query;
  const url = 'https://graph.facebook.com/v2.8/oauth/access_token';
  const qs = {client_id, redirect_uri, client_secret, code}
  request.get(url, {qs}, (err, resp, body) => {
    const data = JSON.parse(body);
    req.session.access_token = data.access_token;
    res.redirect('/user/me');
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy( () => {
    res.redirect('/');
  });
});

module.exports = router;
