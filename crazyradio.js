var usb = require('usb');
var crazyIDs = {
    "vendorId": 6421,
    "productId": 30583
};
function Crazyradio(){}

usb.setDebugLevel(4);

module.exports = Crazyradio;

Crazyradio.listAll = function () {
    return usb.getDeviceList();
};

Crazyradio.find = function() {

    return usb.findByIds(crazyIDs.vendorId, crazyIDs.productId);
};

Crazyradio.open = function(device, cb) {
    device.open();
    return cb();
};

Crazyradio.setChannel = function(device, channel, cb) {
    console.log('setting channel', channel);

    channel = Number(channel) || 80;

    if ((channel < 0) || (channel > 125)) {
      return cb(false, 'Error: cannot set a channel outside of [0 125]');
    } else {
        device.controlTransfer(0x01, channel, new ArrayBuffer(10), new ArrayBuffer(10), new Buffer(10), cb);
        //return cb(true, 'Channel:' + channel + ' set.');
    }

};


    //
    //if (typeof openedCb  !== "function") {
    //    openedCb = noop;
    //}
    //
    //if (state !== "closed") {
    //    console.warn("Trying to re-open already openned radio, ignoring");
    //    openedCb(false);
    //    return;
    //}
    //console.log(chrome.usb);
    //chrome.usb.getDevices({
    //    "vendorId": 6421,
    //    "productId": 30583
    //}, function(found_devices) {
    //    if (chrome.runtime.lastError !== undefined) {
    //        console.warn('chrome.usb.getDevices error: ' +
    //            chrome.runtime.lastError.message);
    //        openedCb(false);
    //        return;
    //    }
    //
    //    if (found_devices.length > 0) {
    //        var device = found_devices[0];
    //        console.log("Opening Crazyradio dongle");
    //        chrome.usb.openDevice(device, function(handle) {
    //            console.log('device handle', handle);
    //
    //            chrome.usb.claimInterface(handle, 0, function() {
    //
    //                if (chrome.runtime.lastError !== undefined) {
    //                    console.warn('chrome.usb.claimInterface error: ' +
    //                        chrome.runtime.lastError.message);
    //                    openedCb(false);
    //                    return;
    //                }
    //
    //                my.handle = handle;
    //                state = "opened";
    //                openedCb(true);
    //            });
    //        });
    //    } else {
    //        console.error("Cannot find Crazyradio dongle!");
    //        openedCb(false);
    //    }
    //});


//
//  "use strict";
//  var state = "closed";
//  console.debug('whoaha');
//
//  var noop = function(state, data) {
//    return;
//  };
//
//  // Generic helper function to implement the radio control transfer
//  function controlTransfer(request, value, data, callback) {
//    var transfer = {
//      direction: "out",
//      recipient: "device",
//      requestType: "vendor",
//      request: request,
//      index: 0,
//      value: value,
//      data: data
//    };
//
//    console.debug('controlTransfer', transfer, my.handle);
//
//    chrome.usb.controlTransfer(my.handle, transfer, function(info) {
//      console.debug('controlTransfer cb info', info);
//      if (!info || info.resultCode !== 0) {
//        console.error("Error executing control channel");
//        callback(false);
//      } else {
//        console.debug('controlTransfer cb', info);
//        callback(true);
//      }
//    });
//  }
//
//  // Public methods and states
//  var my = {handle: undefined};
//
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
//  my.setChannel = function(channel, callback) {
//
//    channel = Number(channel) || 80;
//
//    console.debug('setChannel', channel);
//
//    if ((channel < 0) || (channel > 125)) {
//      callback(false);
//      my.error = "Error: cannot set a channel outside of [0 125]";
//    }
//
//    controlTransfer(0x01, channel, new ArrayBuffer(0), callback);
//  };
//
//  my.setDatarate = function(datarate_str, callback) {
//    var datarate;
//    if (datarate_str === "250Kbps") datarate = 0;
//    else if (datarate_str === "1Mbps") datarate = 1;
//    else if (datarate_str === "2Mbps") datarate = 2;
//    else {
//      my.error = "Error: Wrong value, not a datarate: " + datarate_str;
//      callback(false);
//      console.error(my.error);
//      return;
//    }
//
//    controlTransfer(0x03, datarate, new ArrayBuffer(0), callback);
//  };
//
//  my.close = function() {
//    if (state !== "opened") {
//      return;
//    }
//
//    state = "closing";
//
//    chrome.usb.releaseInterface(my.handle, 0, function() {
//      chrome.usb.closeDevice(my.handle, noop);
//      state = "closed";
//    });
//  };
//
//  my.packetSent = noop;
//
//  return my;
//}());
