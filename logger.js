var Client = require('node-rest-client').Client;
var pm2 = require('pm2');
pm2.launchBus(function(err, bus){
        /*bus.on('process:exception', function(data) {});*/

        bus.on('log:out', function(dat) {
        	if(dat.process.name=='bingadsapicron'){
        		var client = new Client();
             	var Header = {
	                headers: {"Content-Type": "application/json"},
	                data: {'subject': dat.process.name, 'message':dat.data,'date': new Date().toISOString()}//
	              };
	            return new Promise((resolve, reject) => {            
	              client.post('https://nbhsystems.herokuapp.com/subscribe', Header, (data, response)=>{
	                resolve(data);
	              });
	            });	
        	}
        });
        	

        bus.on('log:err', function(dat) {
              var client = new Client();
              var Header = {
                headers: {"Content-Type": "application/json"},
                data: {'subject': dat.process.name, 'message':dat.data}
              };
            return new Promise((resolve, reject) => {            
              client.post('https://script.google.com/macros/s/AKfycbwViLZlxDYNCptGq7WawNp_mLkEXeG4bgvMW2HD8J1xpBqqAHfl/exec', Header, (data, response)=>{
                resolve(data);
                pm2.restart(dat.process.name,function(err,proc){});
              });
            });
  });

  /*bus.on('reconnect attempt', function() {});

  bus.on('close', function() {});*/
});
