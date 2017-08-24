const path = require('path');
const expect = require('expect.js');
const PushNotification = require('../index.js');
const devices = require('./cert/devices.json');
const pn = PushNotification({
	apn: {
		cert: path.join(__dirname, '/cert/cert.pem'),
		key: path.join(__dirname, '/cert/key.pem'),
		production: false
	},
	gcm: {
		apiKey: ''
	}
});

describe('trivial test', function() {
	it('should have DeviceType', function() {
		const { DeviceType } = PushNotification;
		expect(DeviceType).to.be.an('object');
	});
});

describe('test with real devices', function() {
	it('should push to apn', function() {
		// ios
		return pn
			.pushToAPN(devices.ios, { title: 'push test', message: 'testing push-notification package', badge: '2' })
			.then(res => console.log(res))
			.catch(err => console.log(err));
	});

	it('should push to gcm', function() {
		// android
		return pn
			.pushToGCM(devices.android, { title: 'push test', message: 'testing push-notification package', badge: '2' })
			.then(res => console.log(res))
			.catch(err => console.log(err));
	});
});
