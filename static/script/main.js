class PomodoroTimer {
    constructor(timers) {
        this.timers = timers.map(time => {
            let [minutes, seconds] = time.split(':');
            return parseInt(minutes) * 60 + parseInt(seconds);
        });
        this.sessions = this.timers.length;
        this.time = document.getElementById('time');
        this.session = document.getElementById('session');
        this.next_time = document.getElementsByClassName('next_time')[0];
        this.current_session = 1;
        this.current_time = new Date().getTime();
        let seconds = parseInt(this.timers[0]);
        this.moment = this.current_time + seconds * 1000;
        this.pause = document.getElementById('break');
    }

    setTimer() {
        let diff = this.moment - this.current_time;
        let minutes = Math.floor(diff / 1000 / 60);
        let seconds = Math.floor((diff / 1000) % 60);
        let formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        this.time.innerText = formattedTime;

        let nextTimeInSeconds = this.timers[1];
        let nextMinutes = Math.floor(nextTimeInSeconds / 60);
        let nextSeconds = nextTimeInSeconds % 60;
        if (isNaN(nextSeconds)) {
            this.next_time.innerText = '00:00';
        } else {
            this.next_time.innerText = (nextMinutes < 10 ? "0" : "") + nextMinutes + ":" + (nextSeconds < 10 ? "0" : "") + nextSeconds;
        }
        this.session.innerText = 'Session: 1/' + this.sessions;
    }

    run() {
        const timer_work = setInterval(() => {
            this.current_time = new Date().getTime();
            let diff = this.moment - this.current_time;
            if (this.pause.innerText == '▶️') {
                this.moment += 100;
            }
            if (diff <= 0) {
                //converted from 'https://www.youtube.com/watch?v=6UvimAzSkZY' to mp3 file and put on discord
                let audio = new Audio('https://cdn.discordapp.com/attachments/1071460452460138619/1074315498893869056/Y2Mate.is_-_FNAF_-_6_AM_sound-6UvimAzSkZY-160k-1659893170028.mp3');
                audio.play();
                this.current_session++;
                if (this.current_session > this.sessions) {
                    this.time.innerText = "Time's up";
                    this.time.style.fontSize = '4rem';
                    this.time.style.paddingTop = '2rem';
                    this.time.style.paddingBottom = '1rem';
                    clearInterval(timer_work);
                    return;
                } else {
                    let seconds = parseInt(this.timers[this.current_session - 1]);
                    this.moment = this.current_time + seconds * 1000;

                    let nextTimeInSeconds = this.timers[this.current_session];
                    let nextMinutes = Math.floor(nextTimeInSeconds / 60);
                    let nextSeconds = nextTimeInSeconds % 60;
                    if (isNaN(nextSeconds)) {
                        this.next_time.innerText = '00:00';
                    } else {
                        this.next_time.innerText = (nextMinutes < 10 ? "0" : "") + nextMinutes + ":" + (nextSeconds < 10 ? "0" : "") + nextSeconds;
                    }
                    this.session.innerText = 'Session: ' + this.current_session + '/' + this.sessions;
                }
            } else {
                let minutes = Math.floor(diff / 1000 / 60);
                let seconds = Math.floor((diff / 1000) % 60);
                let formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                this.time.innerText = formattedTime;
            }
        }, 100);
    }
}

window.addEventListener('load', function () {

    const pause = this.document.getElementById('break');

    pause.addEventListener('click', function () {
        if(pause.innerText == '⏸️') {
            pause.innerText = '▶️';
        } else {
            pause.innerText = '⏸️';
        }
    });

    try {
    const link = this.window.location.href.split('#pomodoro')[1].split(';');
    let timer = new PomodoroTimer(link);
    timer.setTimer();
    timer.run();
    } catch(e){
        this.document.getElementById('time').innerText = "Error";
    }
});