/**
 * Created by surya on 10/5/16.
 */

'use strict';

var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

//var connectionString = 'HostName=gpsIoTHub1.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKey=F4I7y3c0aRJDaPxp8SBi/pAXxfjUC6mkfWUbC9Hn60Y=';

var connectionString = 'HostName=AirPolluMonIoTHub.azure-devices.net;DeviceId=170F0DB3-BF1C-44D6-8CC2-1A09D65F7D81;SharedAccessKey=pAHk2hRA16goXcJ2+UlJ8SGc9PNv4EveR/0KOFVzsIU=';
var client = clientFromConnectionString(connectionString);


function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var connectCallback = function (err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function(){
            var windSpeed = 10 + (Math.random() * 4);
            var o3 = getRandomArbitrary(0,0.5);
            var so2 = getRandomArbitrary(0,10);
            var co2 = getRandomArbitrary(0,200);

            var data = JSON.stringify({ deviceId: '170F0DB3-BF1C-44D6-8CC2-1A09D65F7D81', name:'co2', value:co2,sensorId:1, eventTypeId:0, description:'test data' });
            var message = new Message(data);
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

client.open(connectCallback);