const passport = require('passport');
const twit = require('twit');
const fs = require('fs');
const config = require('../config/config.js');
const sizeOf = require('image-size');

const createTwit = (accessToken, accessSecret) => {
  return new twit({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    access_token: accessToken,
    access_token_secret: accessSecret,
    timeout: 60 * 1000,
  });
};

module.exports = app => {
  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      userObj = {
        username: req.user.username,
        displayName: req.user.displayName,
        profileImageUrl: req.user.profileImageUrl,
      };
      console.log(userObj);
      res.send(JSON.stringify(userObj));
    } else {
      res.send(null);
    }
  });

  app.get('/api/home', async (req, res) => {
    const t = createTwit(req.user.token, req.user.tokenSecret);
    const tweets = await t.get('statuses/home_timeline', { count: 100 });
    res.send(tweets.data);
  });

  app.get('/api/user_timeline/:user', async (req, res) => {
    const t = createTwit(req.user.token, req.user.tokenSecret);
    const tweets = await t.get('statuses/user_timeline', {
      count: 200,
      screen_name: req.params.user,
    });
    res.send(tweets.data);
  });

  app.get('/api/user_favorites/:user', async (req, res) => {
    const t = createTwit(req.user.token, req.user.tokenSecret);
    const tweets = await t.get('favorites/list', {
      screen_name: req.params.user,
    });
    res.send(tweets.data);
  });

  app.get('/api/search/:query', async (req, res) => {
    const t = createTwit(req.user.token, req.user.tokenSecret);
    const tweets = await t.get('search/tweets', {
      q: req.params.query,
    });
    res.send(tweets.data);
  });

  app.get('/api/dummy_images', async (req, res) => {
    const fileList = await fs.readdirSync('./client/public/dummy_images').map(file => {
      let dimensions = sizeOf('./client/public/dummy_images/' + file);
      return {
        extended_entities: {
          media: [
            {
              media_url: '/dummy_images/' + file,
              sizes: {
                large: {
                  w: dimensions.width,
                  h: dimensions.height,
                }
              }
            }
          ]
        }
      }
    });
    // fileList.map(file => {
    //   console.log(file);
    //   return file + 'is this working';
    //   // return {
    //   //   extended_entities: {
    //   //     media: [
    //   //       {
    //   //         w: 200,
    //   //         h: 400,
    //   //         media_url: file
    //   //       }
    //   //     ]
    //   //   }
    //   // }
    // })
    console.log('filelist: ' + fileList);
    res.send(fileList);
    
  });
};
