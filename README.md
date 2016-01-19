# crazyradio-node-driver

This is intended to be a fully functional implementation of the crazyradio driver written in javascript.
You should be able to clone the repo and run the tests and use the radio API.  

## tests
- it looks like node-usb only works on pre 4.0 node series.  I'm using `node -v` v0.12.7.  
- Use the awesome n switcher  `npm install -g n` to get any version.
- use mocha for tests: `npm install -g mocha` try sudo?
- `npm test` should just work
- make sure your cradio / cradiopa dongle is plugged in and not in some kind of weird reset mode
- currently only implemented configurations.  fork this and help me out.

## next steps
- bulk transfer modes
- node.js ps3 controller
- node.js crazyflie client
- document the api.  see tests, examples
