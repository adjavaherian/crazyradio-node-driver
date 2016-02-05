/**
 * Created by 4m1r on 1/18/16.
 */

var Crazyradio = require('./index');
var assert = require('assert');
var radio, device;

describe('CrazyRadio tests', function(){

    describe('Device tests', function(){

        beforeEach(function(){
            radio = new Crazyradio();
            radio.debugLevel(4);
            device = radio.find();
        });

        it('should set Crazyradio driver debug level', function(done){
            console.log('radio debugLevel', radio.debugLevel(4));
            assert.ok(radio.debugLevel(5) === false);
            assert.ok(radio.debugLevel(-1) === false);

            assert.ok(radio.debugLevel(4) === true);
            assert.ok(radio.debugLevel(3) === true);
            assert.ok(radio.debugLevel(2) === true);
            assert.ok(radio.debugLevel(1) === true);
            assert.ok(radio.debugLevel(0) === true);
            done();
        });

        it('should instantiate new Crazyradio driver', function(done){
            //console.log('radio', typeof radio);
            assert.ok(typeof radio === 'object');
            done();
        });

        it('should list all usb devices', function(done){
            //console.log(typeof radio.listAll());
            assert.ok(typeof radio.listAll() === 'object');
            done();
        });

        it('should find a crazy radio device', function(done){
            //console.log(typeof radio.find());
            assert.ok(typeof radio.find() === 'object');
            done();
        });

        it('should open a crazy radio device', function(done){
            //console.log(typeof radio.open(device, function(err, data){}));
            radio.open(radio.find(), function(err, data){
                assert.ok(err === false);
                done();
            });

        });

        it('should close a crazy radio device', function(done){
            //console.log(typeof radio.open(device, function(err, data){}));
            var device = radio.find();

            radio.open(device, function(err, data){
                assert.ok(err === false);

            });
            radio.close(device, function(err, data){
                assert.ok(err === false);
                done();
            });

        });

        it('should have at least one device interface', function(done) {

            radio.open(device, function(){

                console.log('interfaces', device.interfaces);

                assert.ok(device.interfaces.length >= 0);
                radio.close(device, function(){
                    done();
                });
            });

        });

        it('should return one interface', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('device.interface[0]', iface);

                assert.ok(typeof iface !== 'undefined');
                radio.close(device, function(){
                    done();
                });
            });

        });

        //it('should reset a crazy radio device', function(done){
        //
        //    var device = radio.find();
        //
        //    radio.open(device, function(){
        //        device.reset(function(err, data){
        //
        //            assert(typeof err === 'undefined');
        //            radio.close(device, function(){
        //                done();
        //            })
        //        });
        //
        //
        //    });
        //
        //});

    });

    describe('Configuration tests', function(){

        beforeEach(function(){
            radio = new Crazyradio();
            radio.debugLevel(4);
            device = radio.find();
        });

        it('should set a radio channel', function(done){

            radio.open(device, function(){
                radio.setChannel(device, null, function(err, data){
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set a radio address', function(done){

            radio.open(device, function(){
                radio.setAddress(device, null, function(err, data){
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set a data rate', function(done){

            radio.open(device, function(){
                radio.setDataRate(device, null, function(err, data){
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set a radio power', function(done){

            radio.open(device, function(){
                radio.setRadioPower(device, null, function(err, data){
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set a radio ARD', function(done){

            radio.open(device, function(){
                radio.setRadioARD(device, null, function(err, data){
                    console.log(err);
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set a radio ARC', function(done){

            radio.open(device, function(){
                radio.setRadioARC(device, null, function(err, data){
                    console.log(err);
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should toggle auto ACK', function(done){

            radio.open(device, function(){
                radio.ACKEnable(device, null, function(err, data){
                    console.log(err);
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });
        });

        it('should set continuous carrier mode', function(done){

            radio.open(device, function(){
                radio.setContinuousCarrier(device, 1, function(err, data){
                    console.log(err);
                    assert.ok(err === undefined);
                    setTimeout(function(){
                        radio.setContinuousCarrier(device, null, function(err, data){
                            console.log(err);
                            assert.ok(err === undefined);
                            radio.close(device, function(){
                                done();
                            })
                        });
                    }, 1000);

                });

            });
        });

        //it('should start scanning channels', function(done){
        //
        //    radio.open(device, function(){
        //
        //        radio.startScanChannels(device, null, null, function(err, data){
        //            console.log('cb', err, data);
        //            assert.ok(err === undefined);
        //            radio.close(device, function(){
        //                done();
        //            });
        //
        //        });
        //
        //    });
        //});

        it('should get scanned channels with acks', function(done){

            radio.open(device, function(){
                radio.getScanChannels(device, function(err, data){
                    console.log('cb', err, data.toString('utf8'));
                    assert.ok(err === undefined);
                    radio.close(device, function(){
                        done();
                    });

                });
            });

        });

        //it('should launch boot loader', function(done){
        //
        //    radio.open(device, function(){
        //        radio.launchBootloader(device, function(err, data){
        //            console.log('cb', err, data);
        //            assert.ok(err === undefined);
        //            radio.close(device, function(){
        //                done();
        //            });
        //
        //        });
        //    });
        //
        //});

    });

    describe('Interface tests', function() {

        beforeEach(function(){
            radio = new Crazyradio();
            radio.debugLevel(4);
            device = radio.find();
        });

        it('interface should have two endpoints', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('iface.endpoints', iface.endpoints);

                assert.ok(iface.endpoints.length === 2);
                radio.close(device, function(){
                    done();
                });
            });

        });

        it('interface should return an endpoint for 1, 129 only', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('iface.endpoint(1)', iface.endpoint(1), iface.altSetting);

                assert.ok(typeof iface.endpoint(1) !== 'undefined');
                assert.ok(typeof iface.endpoint(129) !== 'undefined');
                assert.ok(typeof iface.endpoint(130) === 'undefined');
                radio.close(device, function(){
                    done();
                });
            });

        });

        it('should claim an interface', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                iface.claim();

                radio.close(device, function(){
                    done();
                });
            });

        });

        //it('should release an interface', function(done) {
        //    radio.open(device, function(){
        //
        //        var iface = device.interface(0);
        //        iface.release(true, function(err){
        //            console.log('err', err);
        //        });
        //
        //        radio.close(device, function(){
        //            done();
        //        });
        //    });
        //
        //});

        it('should have inactive kernel driver', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                var isActive = iface.isKernelDriverActive();
                console.log('active', isActive);
                assert(isActive === false);

                radio.close(device, function(){
                    done();
                });
            });

        });

        it('should have an interface descriptor', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);

                console.log('active', iface.descriptor);
                assert(typeof iface.descriptor !== 'undefined');

                radio.close(device, function(){
                    done();
                });
            });

        });

    });

    describe('Endpoint tests', function() {

        beforeEach(function(){
            radio = new Crazyradio();
            radio.debugLevel(4);
            device = radio.find();
        });

        it('Endpoint 1 should have out direction', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('iface.endpoint(1)', iface.endpoint(1).direction);

                assert.ok(iface.endpoint(1).direction === 'out');
                radio.close(device, function(){
                    done();
                });
            });

        });

        it('Endpoint 129 should have in direction', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('iface.endpoint(1)', iface.endpoint(129).direction);

                assert.ok(iface.endpoint(129).direction === 'in');
                radio.close(device, function(){
                    done();
                });
            });

        });

        it('Endpoints should have right transferType', function(done) {
            radio.open(device, function(){

                var iface = device.interface(0);
                console.log('iface.endpoint(1)', iface.endpoint(1).transferType);
                console.log('iface.endpoint(1)', iface.endpoint(129).transferType);

                assert.ok(iface.endpoint(1).transferType === 2);
                assert.ok(iface.endpoint(129).transferType === 2);

                radio.close(device, function(){
                    done();
                });
            });

        });


    });

    describe('Packet tests', function() {

        before(function() {
            radio = new Crazyradio();
            radio.debugLevel(4);
            device = radio.find();
        });


        afterEach(function(done){
            var iface = device.interfaces[0];
            iface.release(true, function(err){ console.log(err) });
            done();

        });

        it.only('should read a packet', function(done){

            console.log('opening', device);
            device.open();
            console.log('open', device.interfaces[0]);

            var iface = device.interfaces[0];
                iface.claim();

            console.log('endpoints[0]', iface.endpoints[0]);

            var radioIn = iface.endpoints[0];
            var radioOut = iface.endpoints[1];

            console.log('radioOut', radioOut.direction, radioOut.transferType, radioOut.descriptor.bEndpointAddress);
            console.log('radioIn', radioIn.direction, radioIn.transferType, radioIn.descriptor.bEndpointAddress);

            radioOut.transfer([1], function(err){
                console.log('out cb', err);

                assert.equal(radioIn, iface.endpoint(0x81));

                radioIn.transfer(64, function(err, data){
                    console.log('in err / data', err, data);
                    done();
                });

            });

        });

        it('should send a packet', function(){


            radio.open(device, function(){
                console.log('opening');

                iface = device.interface(0);
                iface.claim();

                var radioOut = iface.endpoints[1];

                console.log('radioOut', radioOut.direction, radioOut.transferType, radioOut.descriptor);

                //Preparing commander packet
                var packet = new ArrayBuffer(15);
                var dv = new DataView(packet);

                dv.setUint8(0, 0x30, true);      // CRTP header
                dv.setFloat32(1, 0.0, true);    // Roll
                dv.setFloat32(5, 0.0, true);   // Pitch
                dv.setFloat32(9, 0.0, true);     // Yaw
                dv.setUint16(13, 0.0, true);  // Thrust

                radioOut.transfer(packet, function(error){
                    console.log('out transfer callback', error);
                    done();
                });


            });

        });
    });

});