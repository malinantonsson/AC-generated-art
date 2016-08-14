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
	      sy: 250, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800,
	      ey: 450
	    },
	    {
	      sx: 0, //start x
	      sy: 280, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800,
	      ey: 400
	    },
	    {
	      sx: 0, //start x
	      sy: 300, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800,
	      ey: 350
	    },
	    {
	      sx: 0, //start x
	      sy: 340, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800,
	      ey: 300
	    },
	    {
	      sx: 0, //start x
	      sy: 380, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800,
	      ey: 260
	    },
	    {
	      sx: 0, //start x
	      sy: 400, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 220
	    },
	    {
	      sx: 0, //start x
	      sy: 410, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 190
	    },
	    {
	      sx: 0, //start x
	      sy: 430, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 160
	    },
	    {
	      sx: 0, //start x
	      sy: 450, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 140
	    },
	    {
	      sx: 0, //start x
	      sy: 450, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 120
	    },
	    {
	      sx: 0, //start x
	      sy: 470, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 90
	    },
	    {
	      sx: 0, //start x
	      sy: 490, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 60
	    },
	    {
	      sx: 0, //start x
	      sy: 520, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 30
	    },
	    {
	      sx: 0, //start x
	      sy: 550, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 800, 
	      ey: 10
	    },
	    {
	      sx: 0, //start x
	      sy: 580, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 790, 
	      ey: 0
	    },
	    {
	      sx: 0, //start x
	      sy: 600, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 770, 
	      ey: 0
	    },
	    {
	      sx: 30, //start x
	      sy: 600, //start y
	      cx: 300, //control point x
	      cy: 500, //control point y
	      ex: 750, 
	      ey: 0
	    }
	],

	initCanvas: function() {
	    var clientW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	    art.ui.canvas.style.width = clientW - 5 + 'px';
	    art.ui.canvas.style.height = clientH - 5 + 'px';
	    this.draw();
	},
	settings: {
		isLeft: true
	},

	draw: function() {
		if (art.ui.canvas.getContext) {  
			//console.log(this);  
		    var ctx = art.ui.canvas.getContext('2d');

		    //ctx.save();
		    ctx.clearRect(0,0,800,600); // clear canvas
		    //flights.draw();
		    //ctx.save();
		    // Quadratric curves example
		      
		    for(var i = 0; i < tide.lines.length; i++) {
		    	//console.log(this);
		        ctx.beginPath();
		        ctx.moveTo(tide.lines[i].sx,tide.lines[i].sy); //starting point
		        ctx.quadraticCurveTo(tide.lines[i].cx,tide.lines[i].cy,tide.lines[i].ex,tide.lines[i].ey);
		        ctx.strokeStyle = 'rgba(255,255,255, 0.5)';
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

	      	//ctx.restore();
			window.requestAnimationFrame(tide.draw);
		}
	}
}

var flights = {
	flights: [
		{
			locX: 200,
			locY: 400,
			height: 2000
		},
		{
			locX: 600,
			locY: 600,
			height: 5000
		}
	],
	draw: function() {
		var canvas = art.ui.canvas;
		if (canvas.getContext) {  
		    var ctx = canvas.getContext('2d');

		    ctx.clearRect(0,0,800,600); // clear canvas

		    for(var i = 0; i < this.flights.length; i++) {
		    	var h = this.flights[i].height / 10;
		    	var yPos = h / 2;
		    	//console.log(yPos);
		    	//console.log(h);
			    ctx.beginPath();
			    ctx.moveTo(h,0);
			    ctx.lineTo(yPos,0);
			    ctx.lineTo(this.flights[i].locX,this.flights[i].locY);
			    ctx.fillStyle = "rgba(255,0,255,0.5)";
			    ctx.fill();
			    this.flights[i].height -= 1;
			    this.flights[i].locX -= 0.4;
			    this.flights[i].locY -= 0.4;
			}
		
		}
	}

	
}

var marines = {
	grid: {
		LATmin: 51.4817,
		LATmax: 51.51184,
		LONmin: -0.13578,
		LONmax: -0.05373,
		height: 51.51184 - 51.4817,
		width: -0.13578 - -0.05373
	},
	currentDisplayedShips: [],
	newShips: [],

	setPosition: function(ship) {
		var lat = this.grid.LATmax - ship.y;
		var lon = this.grid.LONmin - ship.x;

		var y = (lat / this.grid.height) * 100;
		var x = (lon / this.grid.width) * 100;
		
		if(ship.isNew) {

			var wrapper = document.createElement('div');
			wrapper.id = ship.id + '-wrapper';
			wrapper.className = 'ship--wrapper';
			art.ui.shipsWrapper.appendChild(wrapper);
			

			wrapper.style.top = y + '%';
			wrapper.style.left = x + '%';

		} else {
			var wrapper = document.getElementById(ship.id + '-wrapper');
			if(wrapper != null || wrapper != undefined) {
				wrapper.style.top = y + '%';
				wrapper.style.left = x + '%';
			}

		}
		
		$(wrapper).append();
		$(wrapper).html(ship.svg + '<span id="' + ship.id + '-info" class="ship--info">'+ ship.y + '/'+ ship.x + '/'+ ship.speed + '/' + ship.dir + ' </span>');
	
	},

	handleShips: function(data) {
		var self = marines;
		//console.log('number of ships: ' + data.length);
		var newShips = [];		
		
		for(var i = 0; i < data.length; i++) {
			var id = data[i][0];
			var y = data[i][1];
			var x = data[i][2];
			var speed = data[i][3];
			var dir = data[i][5];
			var ship = {
				id: id,
				y: y,
				x: x,
				speed: speed,
				dir: dir,
				svg: '<svg id="' + id + '" version="1.1" class="icon icon--ship" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.889 182.111" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"><polygon points="137.111,0.018 -0.111,182.111 284.889,182.111 "/></svg>'
			};

			newShips.push(id);

			if(self.currentDisplayedShips.indexOf(id) == -1) { //if it is a new ship, add to the list of current ships
				self.currentDisplayedShips.push(id);
				ship.isNew = true;
			} else {
				ship.isNew = false;
			}

			self.setPosition(ship);
		}

		var shipsToBeRemoved = [];

		if(newShips.length > 0 ) {
			//check if the currently listed ships exsists in the new data (ie they are within the grid)
			for (var i = 0; i < self.currentDisplayedShips.length; i++) {
				if(newShips.indexOf(self.currentDisplayedShips[i]) === -1) {
					shipsToBeRemoved.push(i);				
				}
			}

			if(shipsToBeRemoved.length > 0) { //remove ships that are no longer within the grid
				for(var r = shipsToBeRemoved.length - 1; r >= 0; r--) { //count downwards to not mess with index
					$('#' + self.currentDisplayedShips[shipsToBeRemoved[r]] + '-wrapper').remove();
					self.currentDisplayedShips.splice(shipsToBeRemoved[r], 1);
				}
			}
			//console.log('current ships after: ' + self.currentDisplayedShips.length);
		}
	},

	getInfo: function() {
		var self = marines;

		//var self = art;
		if(!art.settings.isDev) {
			if(window.fetch) {
				fetch(art.settings.marineApi, {
					method: 'get'
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(weather) {
					
				});	

			} else { //if fetch is not supported, fallback to Ajax
				$.ajax(art.settings.marineApi)
				.done(function(response) {
					console.log(response);
				  
				});
			}
		} else {
			if(window.fetch) {
				fetch('../marine-example-' + art.settings.marineIndex + '.json', {
					method: 'get'
				})
				.then(function(response) {
					return response.json();
				})
				.then(self.handleShips);	

			} else { //if fetch is not supported, fallback to Ajax
				console.log('using ajax');
				$.ajax('../marine-example-' + art.settings.marineIndex + '.json')
				.done(self.handleShips);
			}
			
			art.settings.marineIndex === 3 ? art.settings.marineIndex = 1 : art.settings.marineIndex++;

		}
	}
}


var art = {
	init: function() {
		binaryClock.runBinaryClock();
		this.getWeather(); 
		marines.getInfo();
		if(!this.settings.isDev) {
			window.setInterval(this.getWeather, 600000); //600000 = 10 minutes

		}
		if(this.settings.isDev) {
			window.setInterval(marines.getInfo, 5000);
		}

		this.moveOffice();
		window.setInterval(this.moveOffice, 5000);

		
		
		//tide.initCanvas();
		//flights.draw();
	},

	ui: {
		body: document.getElementsByTagName('body')[0],
		office: document.getElementsByClassName('icon--plus')[0],
		canvas: document.getElementById('canvas'),
		shipsWrapper: document.getElementsByClassName('ships')[0]
	}, 

	settings: {
		marineIndex: 1, //dev tool
		isDev: true,
		isChangeColour: false,
		newWeatherAPi: 'http://api.wunderground.com/api/807d2301f79ea0f4/conditions/q/UK/London.json',
		weatherApiKey: '807d2301f79ea0f4',
		callWeatherAPI: false,
		exampleData: '../new-example.json',
		londonId: '2643743',
		weatherApi: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=807d2301f79ea0f4',
		marineApiKey: '643896879b28b84c3dcaa9e95e7ee645732ee4f4',
		marineApi: 'http://services.marinetraffic.com/api/exportvessels/bff9c39f0b3c02e0a1fcdcac0882b8a41b0724ed/MINLAT:51.4817/MAXLAT:51.51184/MINLON:-0.13578/MAXLON:-0.05373/timespan:10/protocol:json',
		temp: 0,
		isDown: true,
		exampleMarineData: '../marine-example-1.json' 
	},

	devWeather: function() {

		if(!art.settings.isDev) return;

		if(art.settings.isDown) {
          if(art.settings.temp <= -10) {
            art.settings.isDown = false;
            art.settings.temp = art.settings.temp + 1;
          } else {
          	art.settings.temp = art.settings.temp - 1;
          }
        } else {
          if(art.settings.temp > 41) {
            art.settings.isDown = true;
            art.settings.temp = art.settings.temp - 1;
          } else {
          	art.settings.temp = art.settings.temp + 1;
          }
        } 

        art.setColour(art.settings.temp);

	},

	moveOffice: function(x, y, speed) {
		var office = art.ui.office;

		function getRandomInt(min, max) {
	      return Math.floor(Math.random() * (max - min)) + min;
	    }

	    office.style.transform = 'scale(' + getRandomInt(0.5, 3.5) + ')';
		office.style.opacity = Math.random();
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
		if(!self.settings.isDev) {
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
					
					if(self.settings.isChangeColour){
						window.setInterval(self.devWeather, 2000);
					}
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

					self.devWeather(temp);
					if(self.settings.isChangeColour){
						window.setInterval(self.devWeather, 2000);
					}
				});
			}

		}
	}
}


$( document ).ready(function() {
  art.init();
});
