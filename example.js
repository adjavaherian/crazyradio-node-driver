var crazyradio = require('./index');

var config = {
    channel: 80,
    dataRate: '250K',
    radioPower : '-18'
};

var radio = crazyradio.find();

if (typeof radio !== 'undefined') {
    console.log('found crazyradio: ', radio.deviceAddress);
    crazyradio.open(radio, function(message){
        console.log(message);
        crazyradio.setChannel(radio, config.channel, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('setChannel :', config.channel + ' success');
            }
        });
        crazyradio.setDataRate(radio, config.dataRate, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('setDataRate :', config.dataRate + ' success');
            }
        });
        crazyradio.setContinuousCarrier(radio, true, function(err, data){
            if (err) {
                throw err;
            } else {
                console.log('dongle is in continuous carrier mode');
            }
        });
        setTimeout(function(){
            console.log('waiting for a second');
            crazyradio.setContinuousCarrier(radio, false, function(err, data){
                if (err) {
                    throw err;
                } else {
                    console.log('dongle is in normal transfer mode');

                    crazyradio.setAddress(radio, null, function(err, data){
                       console.log(err, data);
                    });

                    crazyradio.setRadioPower(radio, config.radioPower, function(err, data){
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