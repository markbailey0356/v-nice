const browserEnv = require('browser-env');
browserEnv();

const {requestAnimationFrame} = require('request-animation-frame-polyfill');
global.requestAnimationFrame = requestAnimationFrame;

require('web-animations-js');

