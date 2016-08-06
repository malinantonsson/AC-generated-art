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


var art = {
	init: function() {
		binaryClock.runBinaryClock();
		this.getWeather();
	},

	ui: {
		body: document.getElementsByTagName('body')[0],
		office: document.getElementsByClassName('icon--plus')[0]
	}, 

	settings: {
		weatherApiKey: '18b3eeda7e71d2d3946ccfbfeea86742',
		londonId: '2643743',
		weatherApi: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=18b3eeda7e71d2d3946ccfbfeea86742' 
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
		var self = this;

		if(window.fetch) {
			fetch(this.settings.weatherApi, {
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
			$.ajax(this.settings.weatherApi)
			.done(function(response) {
			  	var temp = Math.round(response.main.temp);
				self.setColour(temp);

				var windDeg = response.wind.deg;
				var windSpeed = response.wind.speed;
				self.setWind(windDeg, windSpeed);
				//TODO: wind
			});
		}
	}
}


$( document ).ready(function() {
  art.init();
});
