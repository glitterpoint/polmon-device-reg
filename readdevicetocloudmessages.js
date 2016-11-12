/**
 * Created by surya on 10/5/16.
 */
'use strict';

var EventHubClient = require('azure-event-hubs').Client;
//var connectionString = 'HostName=gpsIoTHub1.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FL1lDdg1xbxdnQMYZxxp08WWRwFIkyOYzZd1ttYK1lQ=';
var connectionString = 'HostName=AirPolluMonIoTHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=AnWdQQOdBbYsQiOsUfAhYEVBFK4cgqXo6PhT9mMjQ1w=';

var printError = function (err) {
    console.log(err.message);
};

var printMessage = function (message) {
    console.log('Message received: ');
    console.log(JSON.stringify(message.body));
    console.log('');
};


var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {

        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);