# push-notification [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## Installation

```sh
$ npm install --save push-notification
```

## Usage

```js
const PushNotification = require('push-notification');
const DeviceType = PushNotification.DeviceType;

const pn = PushNotification({
    apn: {
        cert: path.resolve('./cert/cert.pem'),
        key: path.resolve('./cert/key.pem'),
        production: false,
    },
    gcm: {
        apiKey: 'gcm-api-key'
    }
});

const data = {
    title: 'Title',
    message: 'Message',
    badge: '',
    sound: '',
    payload: {
        param1: 'additional data',
        param2: 'another data'
    }
};

pn.pushToAPN('ios-device-token', data); // push to single ios device
pn.pushToAPN(['token1', 'token2', 'token3'], data); // push to multiple ios devices

pn.push('device-token', data, DeviceType.IOS); // push to single ios device
pn.push(['token1', 'token2', 'token3'], data, DeviceType.IOS); // push to multiple ios devices

pn.pushToGCM('android-device-token', data); // push to single android device
pn.pushToGCM(['token1', 'token2', 'token3'], data); // push to multiple android devices

pn.push('device-token', data, DeviceType.ANDROID); // push to single android device
pn.push(['token1', 'token2', 'token3'], data, DeviceType.ANDROID); // push to multiple android devices

const devices = [
    { token: 'token1', type: DeviceType.IOS },
    { token: 'token2', type: DeviceType.ANDROID }
];

// send notification to all devices
Promise.all(devices.map(device => pn.push(device.token, data, device.type)));

// or this might be more performant 
const iosTokens = devices.filter(d => d.type === DeviceType.IOS).map(d => d.token);
const andTokens = devices.filter(d => d.type === DeviceType.ANDROID).map(d => d.token);
Promise.all([
    iosTokens.length ? pn.push(iosTokens, data, DeviceType.IOS) : Promise.resolve(),
    andTokens.length ? pn.push(andTokens, data, DeviceType.ANDROID) : Promise.resolve()
]);
```

push, pushToAPN, pushToGCM return Promise instance

```js
pn.push(...).then(res => console.log(res)).catch(err => console.log(err));
```

## Reference
### PushNotification(options)
#### Arguments

`options`
- apn
  - cert: path to cert.pem
  - key: path to key.pem
- gcm
  - apiKey

### pushToAPN(tokens, data)
#### Arguments

`tokens`
- (string) a device token
- (array) array of device tokens

`data`
- title
- message
- badge
- sound
- (object) payload 

#### Returns
`Promise` resolves push result

### pushToGCM(tokens, data)
#### Arguments

`tokens`
- (string) a device token
- (array) array of device tokens

`data`
- title
- message
- badge
- sound
- (object) payload 

#### Returns
`Promise` resolves push result

### push(tokens, data, type)
#### Arguments

`tokens`
- (string) a device token
- (array) array of device tokens

`data`
- title
- message
- badge
- sound
- (object) payload 

`type`
- (DeviceType) DeviceType.IOS or DeviceType.ANDROID

#### Returns
`Promise` resolves push result

## Configuring APN and GCM

### APN
- https://github.com/argon/node-apn/wiki/Preparing-Certificates

### GCM
- https://developers.google.com/cloud-messaging/gcm#senderid


## License

MIT © [Dongwon Lim](idw111@gmail.com)


[npm-image]: https://badge.fury.io/js/push-notification.svg
[npm-url]: https://npmjs.org/package/push-notification
[travis-image]: https://travis-ci.org/idw111/push-notification.svg?branch=master
[travis-url]: https://travis-ci.org/idw111/push-notification
[daviddm-image]: https://david-dm.org/idw111/push-notification.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idw111/push-notification
[coveralls-image]: https://coveralls.io/repos/idw111/push-notification/badge.svg
[coveralls-url]: https://coveralls.io/r/idw111/push-notification
