const expect = require('expect.js');
const PushNotification = require('../index.js');
const dotenv = require('dotenv');

dotenv.config();

const pn = PushNotification({
  apn: {
    cert: process.env.IOS_CERT,
    key: process.env.IOS_KEY,
    production: false
  },
  gcm: {
    apiKey: process.env.ANDROID_APIKEY
  }
});

describe('trivial test', function () {
  it('should have DeviceType', function () {
    const {DeviceType} = PushNotification;
    expect(DeviceType).to.be.an('object');
  });
});

describe('test with real devices', function () {
  // Prerequisite
  // IOS_CERT, IOS_KEY, IOS_TOKEN, ANDROID_APIKEY, ANDROID_TOKEN should be set in .env file
  it.skip('should push to apn', function () {
    // Ios
    return pn
      .pushToAPN(process.env.IOS_TOKEN, {title: 'John Doe', message: 'testing push-notification package', badge: '2'})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });

  it.skip('should push to gcm', function () {
    // Android
    return pn
      .pushToGCM(process.env.ANDROID_TOKEN, {title: 'push test', message: 'testing push-notification package', badge: '2'})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });
});
