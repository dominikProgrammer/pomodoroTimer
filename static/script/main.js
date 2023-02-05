class PomodoroTimer {
    constructor(timers,sessions) {
        this.timers = timers.map(time => {
            let [minutes, seconds] = time.split(':');
            return parseInt(minutes) * 60 + parseInt(seconds);
            });
        this.sessions = sessions;
        this.time = document.getElementById('time');
        this.session = document.getElementById('session');
        this.next_time = document.getElementsByClassName('next_time')[0];
        this.current_session = 1;
        this.current_time = new Date().getTime();
        let seconds = parseInt(this.timers[0]);
        this.moment = this.current_time + seconds * 1000;
        console.log(this.timers);
    }

    setTimer() {
        let diff = this.moment - this.current_time;
        let minutes = Math.floor(diff / 1000 / 60);
        let seconds = Math.floor((diff / 1000) % 60);
        let formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        this.time.innerText = formattedTime;
        
        let nextTimeInSeconds = this.timers[1];
        let nextMinutes = Math.floor(nextTimeInSeconds / 60);
        let nextSeconds = nextTimeInSeconds % 60;
        this.next_time.innerText = + (nextMinutes < 10 ? "0" : "") + nextMinutes + ":" + (nextSeconds < 10 ? "0" : "") + nextSeconds;        this.session.innerText = 'Session: 1/' + this.sessions;
    }

    run() {
    setInterval(() => {
        this.current_time = new Date().getTime();
        let diff = this.moment - this.current_time;
        if (diff <= 0) {
            this.current_session++;
            if (this.current_session >= this.sessions) {
                this.time.innerText = "Time's up";
                this.time.style.fontSize = '100px';
                return;
            }
        }
        
        let minutes = Math.floor(diff / 1000 / 60);
        let seconds = Math.floor((diff / 1000) % 60);
        let formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        this.time.innerText = formattedTime;
    }, 1000);
}
}

window.addEventListener('load', function() {
    let timer = new PomodoroTimer(['00:05','5:00','5:00','10:00','40:00'],1);
    timer.setTimer();
    timer.run();

});