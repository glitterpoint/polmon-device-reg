/**
 * Created by surya on 10/5/16.
 */
var iothub = require('azure-iothub');
//var connectionString = //'HostName=gpsIoTHub1.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FL1lDdg1xbxdnQMYZxxp08WWRwFIkyOYzZd1ttYK1lQ=';
  var connectionString =  'HostName=AirPolluMonIoTHub.azure-devices.net;SharedAccessKeyName=registryReadWrite;SharedAccessKey=EmgcYIIJxaoylibtH2pzD0/rv/9V6+7lv1lJjS89bjs=';

var registry = iothub.Registry.fromConnectionString(connectionString);
var device = new iothub.Device(null);

device.deviceId = '170F0DB3-BF1C-44D6-8CC2-1A09D65F7D81';

registry.create(device, function(err, deviceInfo, res) {
    if (err) {
        registry.get(device.deviceId, printDeviceInfo);
    }
    if (deviceInfo) {
        printDeviceInfo(err, deviceInfo, res)
    }
});

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device id: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
    }
}
