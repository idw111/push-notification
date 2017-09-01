'use strict';

const apn = require('apn');
const gcm = require('node-gcm');

const DeviceType = {
  IOS: 'IOS',
  ANDROID: 'ANDROID'
};

const PushNotification = options => {
  const apnSender = options.apn && options.apn.cert && options.apn.key ? new apn.Provider(options.apn) : null;
  const gcmSender = options.gcm && options.gcm.apiKey ? new gcm.Sender(options.gcm.apiKey) : null;

  const pn = {
    push(tokens, data, type) {
      if (type === DeviceType.IOS) {
        return pn.pushToAPN(tokens, data);
      }
      if (type === DeviceType.ANDROID) {
        return pn.pushToGCM(tokens, data);
      }
      return Promise.reject(new Error('unknow device type'));
    },

    pushToAPN(tokens, {title, message, badge, sound = 'default', payload}) {
      if (!apnSender) {
        return Promise.reject(new Error('options.apn is required...'));
      }
      const devices = typeof tokens === 'string' ? [tokens] : tokens instanceof Array ? tokens : [];
      if (!devices.length) {
        return Promise.reject(new Error('empty tokens...'));
      }
      const notification = new apn.Notification({
        alert: {title, body: message},
        sound,
        badge,
        payload
      });
      return apnSender.send(notification, devices);
    },

    pushToGCM(tokens, {title, message, sound = 'default', payload}) {
      if (!gcmSender) {
        return Promise.reject(new Error('options.gcm is required...'));
      }
      const devices = typeof tokens === 'string' ? [tokens] : tokens instanceof Array ? tokens : [];
      if (!devices.length) {
        return Promise.reject(new Error('empty tokens...'));
      }
      const notification = new gcm.Message({
        notification: {title, body: message},
        sound,
        data: payload
      });
      return new Promise((resolve, reject) => {
        gcmSender.send(notification, {registrationTokens: devices}, (err, res) => (err ? reject(err) : resolve(res)));
      });
    }
  };

  return pn;
};

PushNotification.DeviceType = DeviceType;

module.exports = PushNotification;
