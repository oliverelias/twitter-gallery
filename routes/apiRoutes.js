const passport = require('passport');
const twit = require('twit');
const fs = require('fs');
const config = require('../config/config.js');
const sizeOf = require('image-size');

const createTwit = (user, appOnly) => {
  if (appOnly) {
    return new twit({
      consumer_key: config.TWITTER_CONSUMER_KEY,
      consumer_secret: config.TWITTER_CONSUMER_SECRET,
      app_only_auth: true,
      timeout: 60 * 1000,
    });
  }
  return new twit({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    access_token: user.accessToken,
    access_token_secret: user.accessSecret,
    timeout: 60 * 1000,
  });
};

const simplifyTweet = tweet => {
  if (!tweet.extended_entities) return null;
  if (!tweet.extended_entities.media) return null;
  return {
    id: tweet.id_str,
    text: tweet.text,
    favorited: tweet.favorited,
    retweeted: tweet.retweeted,
    possibly_sensitive: tweet.possibly_sensitive,
    images: [
      ...tweet.extended_entities.media.map(image => {
        return {
          url: image.media_url_https,
          url_small: `${image.media_url_https}:small`,
          aspect: image.sizes.large.w > image.sizes.large.h ? 'wide' : 'tall',
        };
      }),
    ],
  };
};

const getTwitterEndpoint = async (user, url, options) => {
  const appOnly = !user ? true : false;
  console.log(`App only?: ${appOnly}`);
  const t = createTwit(user, appOnly);
  const tweets = await t.get(url, { count: 100, ...options });
  return {
    first_id: tweets.data[0].id_str,
    last_id: tweets.data[tweets.data.length - 1].id_str,
    tweets: tweets.data.map(tweet => simplifyTweet(tweet)).filter(tweet => tweet),
  };
};

module.exports = app => {
  /**
   * Returns basic information on logged in user
   * or null if none
   */
  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      userObj = {
        username: req.user.username,
        displayName: req.user.displayName,
        profileImageUrl: req.user.profileImageUrl,
      };
      res.send(JSON.stringify(userObj));
    } else {
      res.send(null);
    }
  });

  /**
   * Returns
   */
  app.get('/api/home', async (req, res) => {
    if (req.user) {
      const data = await getTwitterEndpoint(req.user, 'statuses/home_timeline', {
        count: 200,
        ...req.query,
      });
      res.send(data);
    }
  });

  app.get('/api/user_timeline/:user', async (req, res) => {
    const data = await getTwitterEndpoint(req.user, 'statuses/user_timeline', {
      screen_name: req.params.user,
      ...req.query,
    });
    res.send(data);
  });

  app.get('/api/user_favorites/:user', async (req, res) => {
    const data = await getTwitterEndpoint(req.user, 'favorites/list', {
      screen_name: req.params.user,
      ...req.query,
    });
    res.send(data);
  });

  app.get('/api/search/:query', async (req, res) => {
    const data = getTwitterEndpoint(req.user, 'search/tweets', {
      q: req.params.query,
    });
    res.send(data);
  });

  app.get('/api/dummy_images', async (req, res) => {
    const fileList = await fs.readdirSync('./client/public/dummy_images/small').map(file => {
      let dimensions = sizeOf('./client/public/dummy_images/small/' + file);
      let aspect = dimensions.width > dimensions.height ? 'wide' : 'tall';
      return {
        extended_entities: {
          media: [
            {
              media_url: '/dummy_images/small/' + file,
              sizes: {
                large: {
                  w: dimensions.width,
                  h: dimensions.height,
                },
              },
            },
          ],
        },
        aspect: aspect,
      };
    });
    res.send(fileList);
  });
};
