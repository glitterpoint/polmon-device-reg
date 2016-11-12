Step 1: Create Device Identity. this step needs to be run for every single device.

    Set a unique id as device Id on line #11.  ex: device.deviceId = '170F0DB3-BF1C-44D6-8CC2-1A09D65F7D81';
    Run following command  npm createDeviceIdentity.js
       Above command will return Device Key which looks something like this:pAHk2hRA16goXcJ2+UlJ8SGc9PNv4EveR/0KOFVzsIU=
       Store this key in secure place as this is going to be needed in steps below.

Step 2: Simulate Device.

    Update connection string with
        deviceid = <GUID assigned in step 1>
        and SharedAccessKey = <Device key objtained in step 1>
    Run npm SimulatedDevice.js


Step 3 (Optional) : Read the data submitted by this device.




