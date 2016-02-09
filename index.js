//Node.js CrazyRadio Driver
//index.js

// require the usb library
var usb = require('usb');
//console.log('type', usb.LIBUSB_TRANSFER_TYPE_BULK);

// Global configuration values
var crazyIDs = {
    'vendorId': 6421,
    'productId': 30583
};
var radioPowerDBs = {
    '-18' : 0,
    '-12' : 1,
    '-6' : 2,
    '0' : 3
};
var dataRate = {
    '250K' : 0,
    '1M' : 1,
    '2M' : 2
};

var ARDValues = {
    '250us' : 0x00,
    '500us' : 0x01,
    '1ms' : 0x02,
    '4ms' : 0x0F
};

function Crazyradio(){}

module.exports = Crazyradio;

// Device utility section
Crazyradio.prototype.debugLevel = function(debugLevel) {
    debugLevel = debugLevel || 4;
    if (debugLevel >= 0 && debugLevel <= 4) {
        usb.setDebugLevel(debugLevel);
        return true;
    } else {
        return false;
    }
};

Crazyradio.prototype.listAll = function () {
    return usb.getDeviceList();
};

Crazyradio.prototype.find = function() {
    return usb.findByIds(crazyIDs.vendorId, crazyIDs.productId);
};

Crazyradio.prototype.open = function(device, cb) {
    device.open();
    cb(false, 'device opened');
};

Crazyradio.prototype.close = function(device, cb) {
    device.close();
    cb(false, 'device closed');
};

// Device configuration methods
Crazyradio.prototype.setChannel = function(device, channel, cb) {

    channel = Number(channel) || 80;
    console.log('setting channel', channel);

    if ((channel < 0) || (channel > 125)) {
        return cb('Error: cannot set a channel outside of [0 125]');
    } else {
        device.controlTransfer(0x40, 0x01, channel, 0, new Buffer(0), cb);

    }
};

Crazyradio.prototype.setAddress = function(device, address, cb) {

    address = address || 0xE7E7E7E7E7;
    console.log('setting address', address);

    device.controlTransfer(0x40, 0x02, 0, 0, new Buffer(5), cb);
};

Crazyradio.prototype.setDataRate = function(device, rate, cb) {

    rate = rate || '250K';
    console.log('setting data rate', rate, dataRate[rate]);

    if ((dataRate[rate] < 0) || (dataRate[rate] > 2)) {
        return cb('Error: cannot set data rate outside of [250K 1M 2M]');
    } else {
        device.controlTransfer(0x40, 0x03, dataRate[rate], 0, new Buffer(0), cb);
    }

};

Crazyradio.prototype.setRadioPower = function(device, power, cb) {

    power = power || '-18';
    console.log('setting radio power', power, 'dBs', radioPowerDBs[power]);

    if (typeof radioPowerDBs[power] === 'undefined') {
        return cb('Error: invalid radio power, [-18, -12, -6, 0]');
    } else {
        device.controlTransfer(0x40, 0x04, radioPowerDBs[power], 0, new Buffer(0), cb);
    }

};

Crazyradio.prototype.setRadioARD = function(device, ARD, cb) {

    ARD = ARD || '250us';

    console.log('setting radio ARD', ARD, ARDValues[ARD]);

    if (typeof ARDValues[ARD] === 'undefined') {
        return cb('Error: invalid radio ARD, [250us, 500us, 1ms, 4ms]');
    } else {
        device.controlTransfer(0x40, 0x05, ARDValues[ARD], 0, new Buffer(0), cb);
    }

};

Crazyradio.prototype.setRadioARC = function(device, ARC, cb) {

    ARC = Number(ARC) || 3;

    console.log('setting radio ARC', ARC);

    if (ARC > 0 && ARC < 16) {
        device.controlTransfer(0x40, 0x06, ARC, 0, new Buffer(0), cb);
    } else {
        return cb('Error: invalid radio ARC, [1 - 15]');
    }

};

Crazyradio.prototype.ACKEnable = function(device, ACK, cb) {

    ACK = ACK || 1;

    console.log('setting radio ACK', ACK);

    if (ACK >= 0) {
        device.controlTransfer(0x40, 0x10, ACK, 0, new Buffer(0), cb);
    } else {
        return cb('Error: invalid ACK, [0 1]');
    }

};

Crazyradio.prototype.setContinuousCarrier = function(device, active, cb) {

    active = active || 0;
    console.log('setting continuous carrier', active);

    if (active < 0) {
        return cb('Error: active value must be 0 or 1');
    } else {
        device.controlTransfer(0x40, 0x20, active, 0, new Buffer(0), cb);
    }
};

Crazyradio.prototype.startScanChannels = function(device, low, high, cb) {

    low = low || 0;
    high = high || 125;
    var length = high - low;

    console.log('scanning channels between', low, 'and', high, 'length:', length);

    if ((low || high < 0) || (low || high > 125) && high > low) {
        return cb('Error: scan range cannot be outside of [0 125]');
    } else {
        device.controlTransfer(0x40, 0x21, low, high, new Buffer(high - low), cb);

    }
};

Crazyradio.prototype.getScanChannels = function(device, cb) {
    device.controlTransfer(0xC0, 0x21, 0, 0, 63, cb);
};

Crazyradio.prototype.launchBootloader = function(device, cb) {
    device.controlTransfer(0x40, 0xFF, 0, 0, new Buffer(0), cb);
};

//interfaces

Crazyradio.prototype.getInterfaces = function(device, cb) {
    cb(device.interfaces());
};

//
//  my.sendPacket = function(buffer, packetSendCb) {
//
//    console.debug('sendPacket', buffer);
//    console.debug('sendPacket to my.handle', my.handle);
//
//    var to = {
//      'direction': 'out',
//      'endpoint': 1,
//      'data' : buffer
//    };
//
//    chrome.usb.bulkTransfer(my.handle, to, function(info) {
//      console.log('bulkTransfer cb', info);
//
//      if (info.resultCode !== 0) {
//        console.error("Cannot send data to the dongle");
//      } else {
//        var ti = {
//          'direction': 'in',
//          'endpoint': 1,
//          'length': 64
//        };
//
//          chrome.usb.bulkTransfer(my.handle, ti, function(info) {
//            if (info.resultCode !== 0) {
//              console.error("Cannot receive data from the dongle");
//            } else {
//              var ack = new Uint8Array(info.data);
//
//              packetSendCb(ack[0]!==0, ack.subarray(1).buffer);
//            }
//          });
//      }
//    });
//  };
//
