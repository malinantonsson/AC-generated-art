var binaryClock = {
	runBinaryClock: function() {
		var self = this;

		var currentTime = new Date();
		var hours = currentTime.getHours().toString(2);
		var minutes = currentTime.getMinutes().toString(2);
		var seconds = currentTime.getSeconds().toString(2);

		var binaryH = this.addZero(6,hours);
		var binaryM = this.addZero(6,minutes);
		var binaryS = this.addZero(6,seconds);

		this.setStatus(binaryH, 'hours');
		this.setStatus(binaryM, 'minutes');
		this.setStatus(binaryS, 'seconds');

		window.setTimeout(function() {
			self.runBinaryClock();
		}, 1000);  
	},
 	setStatus: function(binaryVal, rowPrefix) {
		for (var i = 0; i < 6; i++) {
			var val = binaryVal.substr(i,1);
			var currentEl = document.getElementById(rowPrefix + '-' + i);
			if (currentEl) {
			  if (val == 0) {
		  		currentEl.className = 'binaryOff';
		  	  } else {
				currentEl.className = 'binaryOn';	
			  }
			}
		}
	},
	addZero: function(len, str) {
		for (var i = str.length; str.length < len; i++) {
			str = '0' + str;
		}
		return str;
	}
}

var tide = {
	//16 lines
	lines:[
	    {
	      sx: 0, //start x
	      sy: 300, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800,
	      ey: 500
	    },
	    {
	      sx: 0, //start x
	      sy: 340, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800,
	      ey: 450
	    },
	    {
	      sx: 0, //start x
	      sy: 380, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800,
	      ey: 400
	    },
	    {
	      sx: 0, //start x
	      sy: 400, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800, 
	      ey: 380
	    },
	    {
	      sx: 0, //start x
	      sy: 410, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800, 
	      ey: 370
	    },
	    {
	      sx: 0, //start x
	      sy: 430, //start y
	      cx: 300, //control point x
	      cy: 400, //control point y
	      ex: 800, 
	      ey: 360
	    }
	],

	initCanvas: function() {
		var canvas = document.getElementById('canvas');
	    var clientW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	    canvas.style.width = clientW - 5 + 'px';
	    canvas.style.height = clientH - 5 + 'px';
	    this.draw();
	},
	settings: {
		isLeft: true
	},

	draw: function() {
		if (canvas.getContext) {  
			//console.log(this);  
		    var ctx = canvas.getContext('2d');

		    ctx.save();
		    ctx.clearRect(0,0,800,600); // clear canvas
		    ctx.save();
		    // Quadratric curves example
		      
		    for(var i = 0; i < tide.lines.length; i++) {
		    	//console.log(this);
		        ctx.beginPath();
		        ctx.moveTo(tide.lines[i].sx,tide.lines[i].sy); //starting point
		        ctx.quadraticCurveTo(tide.lines[i].cx,tide.lines[i].cy,tide.lines[i].ex,tide.lines[i].ey);
		         ctx.strokeStyle = '#ffffff';
		        ctx.stroke();

		        if(tide.settings.isLeft) {
		          if(tide.lines[i].cx < 100) {
		            tide.settings.isLeft = false;
		          }
		          tide.lines[i].cx = tide.lines[i].cx - 1;
		        } else {
		          if(tide.lines[i].cx > 600) {
		            tide.settings.isLeft = true;
		          }
		          tide.lines[i].cx = tide.lines[i].cx + 1;
		        }    
		    }

	      	ctx.restore();
			window.requestAnimationFrame(tide.draw);
		}
	}
}


var art = {
	init: function() {
		binaryClock.runBinaryClock();
		this.getWeather(); 
		window.setInterval(this.getWeather, 600000); //600000 = 10 minutes
		tide.initCanvas();
	},

	ui: {
		body: document.getElementsByTagName('body')[0],
		office: document.getElementsByClassName('icon--plus')[0]
	}, 

	settings: {
		newWeatherAPi: 'http://api.wunderground.com/api/807d2301f79ea0f4/conditions/q/UK/London.json',
		weatherApiKey: '807d2301f79ea0f4',
		callWeatherAPI: false,
		exampleData: '../new-example.json',
		londonId: '2643743',
		weatherApi: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=807d2301f79ea0f4',
		marineApiKey: '643896879b28b84c3dcaa9e95e7ee645732ee4f4',
		LATmin: 51.4817,
		LATmax: 51.51184,
		LONmin: -0.13578,
		LONmax: -0.05373,
		marineApi: 'http://services.marinetraffic.com/api/exportvessels/643896879b28b84c3dcaa9e95e7ee645732ee4f4/MINLAT:51.4817/MAXLAT:51.51184/MINLON:-0.13578/MAXLON:-0.05373/timespan:10/protocol:json' 
	},

	moveOffice: function(x, y, speed) {
		var top, left;
		var office = this.ui.office;
		var loc = office.getBoundingClientRect();

		top = loc.top;
		left = loc.left;

		office.style.top = top + (speed * x); 
		office.style.left = left + (speed * y); 

		office.classList += ' has-moved';

	},

	setWind: function(deg, speed) {
		var x, y;
		
		if (deg <= 90) { 
			console.log('is ne');
			x = -10;
			y = 10;
		} else if(deg <= 180) { 
			console.log('is se');
			x = 10;
			y = 10;
		} else if(deg <= 270) {
			console.log('is sw');
			x = 10;
			y= -10;
		} else if(deg <= 360) {
			console.log('is nw');
			x = -10;
			y = -10;
		}

		this.moveOffice(x, y, speed);
	},

	setColour: function(temp) {
		this.ui.body.className = 'temp-' + temp;
	},

	getWeather: function() {
		var self = art;
		console.log(this);
		if(self.settings.callWeatherAPI) {
			if(window.fetch) {
				fetch(self.settings.weatherApi, {
					method: 'get'
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(weather) {
					console.log(weather);
					var temp = Math.round(weather.main.temp);
					self.setColour(temp);

					var windDeg = weather.wind.deg;
					var windSpeed = weather.wind.speed;
					self.setWind(windDeg, windSpeed);
				});	

			} else { //if fetch is not supported, fallback to Ajax
				$.ajax(self.settings.weatherApi)
				.done(function(response) {
				  	var temp = Math.round(response.main.temp);
					self.setColour(temp);

					var windDeg = response.wind.deg;
					var windSpeed = response.wind.speed;
					self.setWind(windDeg, windSpeed);
					//TODO: wind
				});
			}
		} else {
			if(window.fetch) {
				fetch(self.settings.exampleData, {
					method: 'get'
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(weather) {
					console.log(weather);
					var current_observation = weather.current_observation;
					var temp = Math.round(current_observation.temp_c);
					self.setColour(temp);

					var windDeg = current_observation.wind_degrees;
					var windSpeed = current_observation.wind_mph;
					self.setWind(windDeg, windSpeed);
				});	

			} else { //if fetch is not supported, fallback to Ajax
				$.ajax(self.settings.exampleData)
				.done(function(response) {
				  	var current_observation = weather.current_observation;
					var temp = Math.round(current_observation.temp_c);
					self.setColour(temp);

					var windDeg = current_observation.wind_degrees;
					var windSpeed = current_observation.wind_mph;
					self.setWind(windDeg, windSpeed);
				});
			}

		}
	}
}


$( document ).ready(function() {
  art.init();
});
