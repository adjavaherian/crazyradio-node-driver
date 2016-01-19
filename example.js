var Crazyradio = require('./index');

var config = {
    channel: 80,
    dataRate: '250K',
    radioPower : '-18'
};
var radio = new Crazyradio();
var device = radio.find();

if (typeof radio !== 'undefined') {
    console.log('found crazyradio: ', radio.deviceAddress);
    radio.open(device, function(message){
        console.log(message);
        radio.setChannel(device, config.channel, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('setChannel :', config.channel + ' success');
            }
        });
        radio.setDataRate(device, config.dataRate, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('setDataRate :', config.dataRate + ' success');
            }
        });
        radio.setContinuousCarrier(device, true, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('dongle is in continuous carrier mode');
            }
        });
        setTimeout(function(){
            console.log('waiting for a second');
            radio.setContinuousCarrier(device, false, function(err, data){
                if (err) {
                    throw err;
                } else {
                    console.log('dongle is in normal transfer mode');

                    radio.setAddress(device, null, function(err, data){
                       console.log(err, data);
                    });

                    radio.setRadioPower(device, config.radioPower, function(err, data){
                        console.log(err, data);
                    });

                    //radio.interface(0).claim();
                    //crazyradio.startScanChannels(radio, 0, 1, function(err, data){
                    //    if (err) {
                    //        crazyradio.close(radio, function(message){
                    //            console.log(message);
                    //        });
                    //        console.log('Error: scanning channels');
                    //        throw err;
                    //    } else {
                    //        console.log('scanning channels...');
                    //    }
                    //});
                }
            });
        }, 1000);


    });

} else {
    console.log('couldn\'t find crazyradio');
}