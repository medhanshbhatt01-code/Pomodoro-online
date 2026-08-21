// const { jsx } = require("react/jsx-runtime")

const start = document.querySelector('.start')
const timer = document.querySelector('.timer2')
const selector = document.querySelector('.selector')
const focuss = document.querySelector('.focus')
const shortbreak = document.querySelector('.shortbreak')
const longbreak = document.querySelector('.longbreak')
const body = document.body
const darkmodebutton = document.querySelector('.darkmode')
const music = document.querySelector('.music')
const musicpanel = document.querySelector('.musicpanel')
const disclaimer = document.querySelector('.disclaimer')
const info =  document.querySelector('.info')
const text = document.querySelector('.text')
const switcher = document.querySelector('.switch')
const pause = document.querySelector('.pause')
const switchercancel = document.querySelector('.cancel')
const switcherconfirm = document.querySelector('.confirm')
const stopp = document.querySelector('.stop')
const modes = {
    focus:{
        selector:'focus',
        start:'focus',
        timer:'focus',
        pause:'focus'
    },

    shortbreak:{
        selector:'shortbreak',
        start:'shortbreak',
        timer:'shortbreak',
        pause: 'shortbreak'
    },
    longbreak:{
        selector:'longbreak',
        start:'longbreak',
        timer:'longbreak',
        pause:'longbreak'
    }

}





function loadTheme(){

    if(localStorage.getItem("theme") === "dark"){

        body.classList.add("dark");
       


    }

}

function toggleTheme(){

    body.classList.toggle("dark");

    const theme = body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);

}

darkmodebutton.addEventListener('click',toggleTheme)

function setupPanel(btnSelector, panelSelector) {
    const btn = document.querySelector(btnSelector);
    const panel = document.querySelector(panelSelector);

    btn.addEventListener('click', () => panel.classList.toggle('open'));

    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !btn.contains(e.target) ){
           setTimeout(() => {
            panel.classList.remove('open')
           }, 10);}
})}

let lastClick = ""

if(selector.classList.contains('focus')){
    lastClick = "focus"
}else if(selector.classList.contains('shortbreak')){
    lastClick = "shortbreak"
}else if(selector.classList.contains('longbreak')){
    lastClick = "longbreak"
}

document.addEventListener('click',()=>{
    if(selector.classList.contains('focus')){
    lastClick = "focus"
}else if(selector.classList.contains('shortbreak')){
    lastClick = "shortbreak"
}else if(selector.classList.contains('longbreak')){
    lastClick = "longbreak"
}
    // console.log(lastClick)
})

timeforfocus = 1500
timeforshortbreak = 300
timeforlongbreak = 900
let clock = null

document.addEventListener('DOMContentLoaded', () => {
    selector.classList.add('focus')
    selector.classList.remove('shortbreak','longbreak')
    timer.classList.add('focus')
    timer.classList.remove('shortbreak','longbreak')
    start.classList.add('focus')
    start.classList.remove('shortbreak','longbreak')
    text.textContent = `${Math.floor(timeforfocus/60)}:${'00'}`
});


// this is for focuss

focuss.addEventListener('click',()=>{
    if (selector.classList.contains('focus')) return;
    if(timeforfocus==1500 && timeforshortbreak==300 && timeforlongbreak==900){
        timeforfocus = 1500
        selector.classList.add('focus')
        selector.classList.remove('shortbreak','longbreak')
        timer.classList.add('focus')
        timer.classList.remove('shortbreak','longbreak')
        start.classList.add('focus')
        start.classList.remove('shortbreak','longbreak')
        text.textContent = `${Math.floor(timeforfocus/60)}:${'00'}`
    }else{
        clearInterval(clock)
        switcher.classList.add('open');
         if (lastClick === "shortbreak" || lastClick === "longbreak"){
         disclaimer.textContent = "Skip this break?"
         info.textContent = "Rest is what keeps you going day after day — the next session starts right away."
        }
}})




// this is for shortbreak


shortbreak.addEventListener('click',()=>{
    if (selector.classList.contains('shortbreak')) return;
     if(timeforfocus==1500 && timeforshortbreak==300 && timeforlongbreak==900){
        timeforshortbreak=300
        selector.classList.add('shortbreak')
        selector.classList.remove('focus','longbreak')
        timer.classList.add('shortbreak')
        timer.classList.remove('focus','longbreak')
        start.classList.add('shortbreak')
        start.classList.remove('focus','longbreak')
        text.textContent = `${Math.floor(timeforshortbreak/60)}:${'00'}`
    }else{
        clearInterval(clock)
        switcher.classList.add('open');
        if(lastClick == "focus"){
         disclaimer.textContent = "Abandon this focus session?"
         info.textContent = "This pomodoro won't count as a session, but your focused minutes are saved — your break starts right away.."
        }if(lastClick == "longbreak"){
         disclaimer.textContent = "Change your break?"
         info.textContent = "Your current break restarts at the new length."
        }if(lastClick == "shortbreak"){
            
        }
}})


// this is for longbreak


longbreak.addEventListener('click',()=>{
    if (selector.classList.contains('longbreak')) return;
     if(timeforfocus==1500 && timeforshortbreak==300 && timeforlongbreak==900){
        timeforlongbreak=900
        selector.classList.add('longbreak')
        selector.classList.remove('shortbreak','focus')
        timer.classList.add('longbreak')
        timer.classList.remove('shortbreak','focus')
        start.classList.add('longbreak')
        start.classList.remove('shortbreak','focus')
        text.textContent = `${Math.floor(timeforlongbreak/60)}:${'00'}`

    }else{
        clearInterval(clock)
        switcher.classList.add('open');
         if(lastClick == "focus"){
         disclaimer.textContent = "Abandon this focus session?"
         info.textContent = "This pomodoro won't count as a session, but your focused minutes are saved — your break starts right away.."
        }if(lastClick == "shortbreak"){
         disclaimer.textContent = "Change your break?"
         info.textContent = "Your current break restarts at the new length."
        }if(lastClick == "longbreak"){

        }
}})


// this is for start 
start.addEventListener('click',()=>{
    if(start.classList.contains('focus')){
        start.classList.remove('shortbreak','longbreak','focus')
        pause.classList.add('focus')
        pause.classList.remove('shortbreak','longbreak')
        clearInterval(clock)
        clock = setInterval(() => {
        timeforfocus--
        mins = Math.floor(timeforfocus/60)
        secs = timeforfocus%60
        timer.style.strokeDashoffset = 942 - (timeforfocus/1500)*942
        text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`
    },1000)
}else if(start.classList.contains('shortbreak')){
        start.classList.remove('focus','longbreak','shortbreak')
        pause.classList.add('shortbreak')
        pause.classList.remove('focus','longbreak')
        clearInterval(clock)
        clock = setInterval(() => {
        timeforshortbreak--
        mins = Math.floor(timeforshortbreak/60)
        secs = timeforshortbreak%60
        timer.style.strokeDashoffset = 942 - (timeforshortbreak/300)*942
        text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`
            
        }, 1000);
}else if(start.classList.contains('longbreak')){
    start.classList.remove('shortbreak','focus','longbreak')
    pause.classList.add('longbreak')
    pause.classList.remove('shortbreak','focus')
    clearInterval(clock)
    clock = setInterval(() => {
    timeforlongbreak--
    mins = Math.floor(timeforlongbreak/60)
    secs = timeforlongbreak%60
    timer.style.strokeDashoffset = 942 - (timeforlongbreak/900)*942
    text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`
        
    }, 1000);
}
})

// this is for pause
pause.addEventListener('click',()=>{
    if(pause.classList.contains('focus')){
        clearInterval(clock)
        pause.classList.remove('focus','longbreak','shortbreak')
        start.classList.add('focus')
        start.classList.remove('shortbreak','longbreak')
    }else if(pause.classList.contains('shortbreak')){
        pause.classList.remove('focus','longbreak','shortbreak')
        clearInterval(clock)
        start.classList.add('shortbreak')
         start.classList.remove('focus','longbreak')
    }else if(pause.classList.contains('longbreak')){
        pause.classList.remove('focus','longbreak','shortbreak')
        clearInterval(clock)
        start.classList.add('longbreak')
        start.classList.remove('shortbreak','focus')
    }

})

pause.addEventListener('click',()=>{
    if (!pause.classList.contains('focus') && 
    !pause.classList.contains('shortbreak') && 
    !pause.classList.contains('longbreak')) {
      stopp.classList.remove('open')
}
})

// this is for switchercancel
switchercancel.addEventListener('click',()=>{
    switcher.classList.remove('open')
    if(timer.classList.contains('focus')){
        pause.classList.remove('focus')
        start.classList.add('focus')
    }else if(timer.classList.contains('shortbreak')){
        pause.classList.remove('shortbreak')
        start.classList.add('shortbreak')
    }else if(timer.classList.contains('longbreak')){
        pause.classList.remove('longbreak')
        start.classList.add('longbreak')
    }
})

switchercancel.addEventListener('click',()=>{
    stopp.classList.remove('open')
})

// this if for switcherconfirm
let lastClicked = ""
document.addEventListener('click',(e)=>{
   
    if(e.target.closest('.focus')){
    lastClicked = "focus"
    }else if (e.target.closest('.shortbreak')){
     lastClicked = "shortbreak"
    }else if (e.target.closest('.longbreak')){
        lastClicked = "longbreak"
    } console.log(lastClicked)
})
   switcherconfirm.addEventListener('click', () => {
    if (lastClicked.includes('focus')) {
        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        selector.classList.add('focus');
        switcher.classList.remove('open')
        selector.classList.remove('shortbreak', 'longbreak');
        timer.classList.add('focus');
        timer.classList.remove('shortbreak', 'longbreak');
        start.classList.add('focus');
        start.classList.remove('shortbreak', 'longbreak');
        text.textContent = `${Math.floor(timeforfocus / 60)}:00`;
        

    } else if (lastClicked.includes('shortbreak')) {
        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        selector.classList.add('shortbreak');
        switcher.classList.remove('open')
        selector.classList.remove('focus', 'longbreak');
        timer.classList.add('shortbreak');
        timer.classList.remove('focus', 'longbreak');
        start.classList.add('shortbreak');
        start.classList.remove('focus', 'longbreak');
        text.textContent = `${Math.floor(timeforshortbreak / 60)}:00`;
        

    } else if (lastClicked.includes('longbreak')) {
        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        selector.classList.add('longbreak');
        switcher.classList.remove('open')
        selector.classList.remove('focus', 'shortbreak');
        timer.classList.add('longbreak');
        timer.classList.remove('focus', 'shortbreak');
        start.classList.add('longbreak');
        start.classList.remove('focus', 'shortbreak');
        text.textContent = `${Math.floor(timeforlongbreak / 60)}:00`;
    
    }
});



switcherconfirm.addEventListener('click',()=>{
    pause.classList.remove('focus','shortbreak','longbreak')
    stopp.classList.remove('open')
})

// this is to    make  stop open
start.addEventListener('click',()=>{if(pause.classList.contains('focus') || 
    pause.classList.contains('shortbreak') || 
    pause.classList.contains('longbreak')) {
    stopp.classList.add('open');
}else{
    stopp.classList.remove('open')
}
})


// this if for stop
stopp.addEventListener('click',()=>{
    if(pause.classList.contains('focus')){
    text.textContent = `${(1500/60)}:${'00'}`
    clearInterval(clock)
    pause.classList.remove('focus','shortbreak','longbreak')
    start.classList.add('focus')
    stopp.classList.remove('open')

    }
    else if(pause.classList.contains('shortbreak')){
    text.textContent = `${(300/60)}:${'00'}`
    pause.classList.remove('focus','shortbreak','longbreak')
    start.classList.add('shortbreak')
    clearInterval(clock)  
    stopp.classList.remove('open')

    }
    else if(pause.classList.contains('longbreak')){
    text.textContent = `${(900/60)}:${'00'}` 
    clearInterval(clock)    
    pause.classList.remove('focus','shortbreak','longbreak')
    start.classList.add('longbreak')
    stopp.classList.remove('open')
    }
})

stopp.addEventListener('click',()=>{
    if(pause.classList.contains('focus')){
        
        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        clock = setInterval(() => {
        timeforfocus--
        mins = Math.floor(timeforfocus/60)
        secs = timeforfocus%60
        timer.style.strokeDashoffset = 942 - (timeforfocus/1500)*942
        text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`})

    }else if(pause.classList.contains('shortbreak')){

        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        clock = setInterval(() => {
        timeforshortbreak--
        mins = Math.floor(timeforshortbreak/60)
        secs = timeforshortbreak%60
        timer.style.strokeDashoffset = 942 - (timeforshortbreak/300)*942
        text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`
    })
    }else if(pause.classList.contains('longbreak')){

        timeforfocus = 1500
        timeforshortbreak = 300
        timeforlongbreak = 900
        clock = setInterval(() => {
        timeforlongbreak--
        mins = Math.floor(timeforlongbreak/60)
        secs = timeforlongbreak%60
        timer.style.strokeDashoffset = 942 - (timeforlongbreak/900)*942
        text.textContent = `${mins}:${secs<10 ? '0':''}${secs}`
    })
    }
})

// this is for music 

const musicButtons = document.querySelectorAll(".music-play-button");
const trackItems = document.querySelectorAll(".track-item");
const audioTracks = document.querySelectorAll("audio");

let activeAudio = null;
let activeButton = null;

function getAudio(button) {
    const audioId = button.dataset.audio;
    return document.getElementById(audioId);
}

function stopAudio(audio, button) {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    if (button) {
        button.querySelector(".toggle")?.classList.remove("open");
    }

    if (activeAudio === audio) {
        activeAudio = null;
        activeButton = null;
    }
}

function stopAllExcept(audio) {
    musicButtons.forEach(button => {
        const currentAudio = getAudio(button);

        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            button.querySelector(".toggle")?.classList.remove("open");
        }
    });
}

function playAudio(button) {
    const audio = getAudio(button);

    if (!audio) return;

    stopAllExcept(audio);

    audio.play();

    button.querySelector(".toggle")?.classList.add("open");

    activeAudio = audio;
    activeButton = button;
}

function toggleAudio(button) {
    const audio = getAudio(button);

    if (!audio) return;

    if (audio === activeAudio && !audio.paused) {
        stopAudio(audio, button);
    } else {
        playAudio(button);
    }
}

musicButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();
        toggleAudio(button);
    });
});

trackItems.forEach(item => {
    item.addEventListener("click", event => {
        if (event.target.closest(".music-play-button")) return;

        const button = item.querySelector(".music-play-button");

        if (button) {
            toggleAudio(button);
        }
    });
});

audioTracks.forEach(audio => {
    audio.addEventListener("play", () => {
        const button = document.querySelector(
            `.music-play-button[data-audio="${audio.id}"]`
        );

        if (!button) return;

        stopAllExcept(audio);

        button.querySelector(".toggle")?.classList.add("open");

        activeAudio = audio;
        activeButton = button;
    });

    audio.addEventListener("pause", () => {
        const button = document.querySelector(
            `.music-play-button[data-audio="${audio.id}"]`
        );

        if (button) {
            button.querySelector(".toggle")?.classList.remove("open");
        }

        if (activeAudio === audio) {
            activeAudio = null;
            activeButton = null;
        }
    });

   
});




// this is for quote

const quotes = [
    "Stop waiting for motivation. Start building discipline.",
    "You don't need to feel ready. You need to start.",
    "Lock in. The version of you you're building is watching.",
    "Small progress every day becomes something massive.",
    "Discipline is choosing what you want most over what you want now.",
    "Nobody is coming to do it for you. Get it done.",
    "Focus on the work. Let the results make the noise.",
    "You said you wanted it. Now prove it with your actions.",
    "One focused hour can change the direction of your entire day.",
    "Don't break the streak. Keep going."
];

function randomquote(){
    const quote = document.querySelector('.quote')
    const randomindex = Math.floor(Math.random() * quotes.length)
    quote.textContent = quotes[randomindex]
}







randomquote()
setInterval(() => {
    randomquote()
}, 1*60*1000);
setupPanel('.music', '.musicpanel');


loadTheme();




// this is for streak 

const streakcount = document.querySelector('.streakcount')
document.addEventListener("DOMContentLoaded", () => {

    const date = new Date();

    const today = date.toISOString().split("T")[0];

    const lastActiveDate = localStorage.getItem("time");

    if (lastActiveDate === null) {
        localStorage.setItem("time", today);
        localStorage.setItem("streak", "1");
        streakcount.textContent = "1";
        return;
    }

    if (today === lastActiveDate) {
        const streak = JSON.parse(localStorage.getItem("streak")) || 0;
        streakcount.textContent = streak;
        return;
    }

    if (today > lastActiveDate) {
        const lastStreak = JSON.parse(localStorage.getItem("streak")) || 0;
        const todayStreak = lastStreak + 1;

        localStorage.setItem("streak", JSON.stringify(todayStreak));
        localStorage.setItem("time", today);

        streakcount.textContent = todayStreak;
    }

});         
