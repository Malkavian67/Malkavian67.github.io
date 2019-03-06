let accelerometer;
let gravity;
let gyroscope;

let lastReadingTimestamp;
  
let duration=0;
let min=-1;
let max=-1;
let count=0;
let sum=0;
let avg = 0;

let Values = [];
let Label = [];

$(function() 
{
    $("#askButton").click( function()
    {
        if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) 
        {
            document.getElementById('moApi').innerHTML = 'Generic Sensor API';

            accelerometer = new LinearAccelerationSensor()

            //acceleration
            //let accelerometer = new LinearAccelerationSensor();
            accelerometer.addEventListener('reading', e => {
                if (lastReadingTimestamp) {
                intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
                }
                lastReadingTimestamp = accelerometer.timestamp
                accelerationHandler(accelerometer, 'moAccel');
            });
            accelerometer.start();

            if ('GravitySensor' in window) {
                gravity = new GravitySensor()
                gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
                gravity.start();
            }

            gyroscope = new Gyroscope()
            gyroscope.addEventListener('reading', e => rotationHandler({
            alpha: gyroscope.x,
            beta: gyroscope.y,
            gamma: gyroscope.z
            }));
            gyroscope.start();

        } 
        else if ('DeviceMotionEvent' in window) {
            document.getElementById('moApi').innerHTML = 'Device Motion API';

            var onDeviceMotion = function (eventData) {
                accelerationHandler(eventData.acceleration, 'moAccel');
                intervalHandler(eventData.interval);}
            window.addEventListener('devicemotion', onDeviceMotion, false);
        } else {
            document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
        }
  
    })
});
  
  
  function accelerationHandler(acceleration, targetId) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    document.getElementById(targetId).innerHTML = info;
    
    //alert(info);

    var length = Math.sqrt(acceleration.x * acceleration.x + acceleration.y * acceleration.y + acceleration.z * acceleration.z );

    //alert(length);

    Values.push(length);
    Label.push("");
    
    sum += length;
    avg = sum / ++count;
    document.getElementById("avg").innerHTML = avg;

    if(min == -1 || min > length){
      min = length;
      document.getElementById("min").innerHTML = min;
    }
    if(max == -1 || max < length){
      max = length;
      document.getElementById("max").innerHTML = max;
    }  
  }
  
  
    function rotationHandler(rotation) {
        var info, xyz = "[X, Y, Z]";
    
        info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
        info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
        info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
        document.getElementById("moRotation").innerHTML = info;
    }

    function intervalHandler(interval) {
        duration += interval;
        document.getElementById("moInterval").innerHTML = interval;
        if(duration > 30000){

            accelerometer.stop();
            
            alert(Values);
            alert(Label);

            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                labels: Label,
                datasets: [
                    { 
                        data: Values,
                        label: "Distance move",
                        borderColor: "#3e95cd",
                        fill: false
                    }
                ]
                },
                options: {
                title: {
                    display: true,
                    text: 'Motion (in seconds)'
                }
                }
            });
            
            gravity.stop(); 
            gyroscope.stop();
        }
    }
  
