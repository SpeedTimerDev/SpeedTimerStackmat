// Main Vars

var advance;

var timer = document.querySelector(".digits");

var timing = false;
var time = 0;
var running = 0;

window.addEventListener('keydown', function (e) {
	if (e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}
});

function reset() {
	running = 0;
	time = 0;
	timer.innerHTML = "00:00.00";
}

function increment(start) {
	advance = setInterval(function () {
		timer.style.color = "white";
		if (running == 1) {
			time = performance.now() - start;
			var mins = Math.floor(time / 1000 / 60);
			if (mins <= 9) {
				mins = "0" + mins;
			}
			var secs = Math.floor(time / 1000 % 60);
			if (secs <= 9) {
				secs = "0" + secs;
			}

			var hundredths = Math.round(time % 1000 / 10);
			if (hundredths <= 9) {
				hundredths = "0" + hundredths;
			}

			timer.innerHTML = mins + ":" + secs + "." + hundredths;
		} else clearInterval(advance);
	});
}

var clear = ['Escape'];

document.onkeydown = function (e) {
	if (localStorage.getItem("inputType") == "timer") {
		if (e.key == clear[0]) {
			timer.innerHTML = "00:00.00";
		}
	}
}

// timer.on

document.querySelector(".digits").disabled = false;

let timerValue = 0;
let interval;
let isTouchGood = false;

const mousePress = () => {
	if (running == 0) {
		if (innerWidth < 1300) {
			if (localStorage.getItem("inputType") == "timer") {
				if (timer.nodeName == "BUTTON") {
					interval = setInterval(() => {
						timerValue++;
						
						if(timerValue === 2) {
							timer.style.color = "orange";
						}
					
						if(timerValue === 5) {
							timer.style.color = "lightgreen";
							isTouchGood = true;
						}
					}, 100);
				}
			}
		}
	} else {
		running = 0;
		getTime();
		generateScramble(sType);

		isTouchGood = false;

		timer.style.color = "white";
	}
}

const mouseRelease = () => {
	if(isTouchGood) {
		start();
	}

	clearInterval(interval);
	timerValue = 0;

	isTouchGood = false;
	
	timer.style.color = "white";
}

timer.addEventListener("touchstart", mousePress, { passive: true });
timer.addEventListener("touchend", mouseRelease);

var timerDoTime = 0;
var timerCheck;
var timerPressed = false;

var et = new Event('keydown');
et.keyCode = 32
et.which = et.keyCode;
document.dispatchEvent(et);

document.body.onkeydown = function (e) {
	if (e.keyCode == 32) {
		if (running == 0) {
			timerPressed = true;
			if (timerDoTime == 0) {
				timerDoTime = Math.floor(performance.now());
				timerCheck = window.setInterval(checkSecF, 100);
				timerCheck = window.setInterval(checkSec, 300);
			}
		}
	}
}

document.body.onkeyup = function (e) {
	if (localStorage.getItem("inputType") == "timer") {
		if (timer.nodeName == "BUTTON") {
			timer.style.color = "white";
			if (e.keyCode == 32 && running == 0) {
				timerPressed = false;
				var newTime = Math.floor(performance.now()) - timerDoTime;
				timerDoTime = 0;
				if (newTime > 400) {
                    start();
                    clearInterval(timerCheck);
				} else {
					timer.style.color = "white";
					timerDoTime = 0;
					timerPressed = false;
					newTime = 0;
					clearInterval(timerCheck);
				}
			} else if (running == 1) {
				running = 0;
				getTime();
				timer.style.color = "white";
			}
		}
	}
}

function checkSecF() {
	if (timerPressed) {
		if (timer.style.color == "white") {
			timer.style.color = "orange";
		}
	}
}

function checkSec() {
	if (timerPressed) {
		if (timer.style.color == "orange") {
			timer.style.color = "lightgreen";
		}
	}
}

function start() {
	reset();
	running = 1;
	increment(performance.now());
}

// if(JSON.parse(localStorage.stackmat)) {
// 	localStorage.setItem("inputType", "stackmat");
// }

// Stackmat

// var stackmatRunning = false;
// var on = false;

// // if(JSON.parse(localStorage.stackmat)) {
// // 	runStackmat();
// // }

// function runStackmat() {  
// 	stackmat.setCallBack(SMCallback);

//     function SMCallback(state) {
//         if(state.running) {
// 			var tempMins = Math.floor(state.time_milli / 60000);

//             var tempTime = (state.time_milli - (tempMins * 60000)).toString();
//             timer.innerHTML = stackmatFormat(tempTime.slice(0, tempTime.length - 1), tempMins); // + tempTime.slice(tempTime.length - 1, tempTime.length);

//             stackmatRunning = true;
//         } else {
//             if(state.time_milli > 0 && stackmatRunning == true) {
// 				var tempMins = Math.floor(state.time_milli / 60000);

// 				var tempTime = (state.time_milli - (tempMins * 60000)).toString();
// 				var newTempTime = tempTime.slice(0, tempTime.length - 1);
// 				var tempSubmit = stackmatSubmitFormat(tempMins.toString() + newTempTime);
//                 stackmatRunning = false;

// 				sessions[currentSessionIdx].times.unshift(tempSubmit);
// 				if (localStorage.getItem("scrambleTemp") != "Other") {
// 					sessions[currentSessionIdx].scrambles.unshift(JSON.parse(localStorage.getItem("scrambleTemp")));
// 				} else {
// 					sessions[currentSessionIdx].scrambles.unshift(localStorage.getItem("scrambleTemp"));
// 				}
// 				localStorage.setItem("speedtimer", JSON.stringify(sessions));

// 				generateTimes();
// 				generateStats();

// 				generateScramble(sType);
// 			}
//         }

//         if(state.time_milli == 0) {
//             timer.innerHTML = "00:00.00";
//         }

// 		if(!state.on) {
// 			timer.innerHTML = "---------";
// 			on = false;
// 		} else {
// 			if(!state.running && !state.time_milli > 0 && !on) {
// 				on = true;
// 				timer.innerHTML = "00:00.00";
// 			}
// 		}
//     }
// }