
let timer_id = 0;
let timer = "stopped";
let bIsemphasisOn = false;
let emphasisValue = 4;
let tick_cnt = 1;

var duration = 50; // milliseconds
var sampleRate = 44100; // Sample rate in Hz
var numOfSamples = sampleRate * duration / 1000; // Number of samples
var clickToneHigh = 1800; // Hz
var clickToneLow = 440; // Hz

var audioContextHigh = new (window.AudioContext || window.webkitAudioContext)();
var audioBufferClickHigh = audioContextHigh.createBuffer(1, numOfSamples, sampleRate);
var audioBufferDataClickHigh =  audioBufferClickHigh.getChannelData(0);

var audioContextLow= new (window.AudioContext || window.webkitAudioContext)();
var audioBufferClickLow = audioContextLow.createBuffer(1, numOfSamples, sampleRate);
var audioBufferDataClickLow =  audioBufferClickLow.getChannelData(0);

function UpdateClickSignal() {

    for (var i = 0; i < numOfSamples; i++) {
        audioBufferDataClickHigh[i] = Math.sin(2 * Math.PI * clickToneHigh * i / sampleRate);
    };

    for (var i = 0; i < numOfSamples; i++) {
        audioBufferDataClickLow[i] = Math.sin(2 * Math.PI * clickToneLow * i / sampleRate);
    };

}

function playLowClickSignal(){
    audioSourceLow = audioContextLow.createBufferSource();
    audioSourceLow.buffer = audioBufferClickLow;
    audioSourceLow.connect(audioContextLow.destination);
    audioSourceLow.start();
}

function playHighClickSignal(){
    audioSourceHigh = audioContextHigh.createBufferSource();
    audioSourceHigh.buffer = audioBufferClickHigh;
    audioSourceHigh.connect(audioContextHigh.destination);
    audioSourceHigh.start();
}

UpdateClickSignal();

function AddBpmStepHandler()
{
     const step_plus_sel = document.querySelector("#step_plus");

     step_plus_sel.addEventListener('click', function handleCLick(event){
        steps_view = document.querySelector("#bpm_number");
        steps_num = parseInt(steps_view.innerText);
        steps_view.innerText=(steps_num+1);
     });

     const step_minus_sel = document.querySelector("#step_minus");

     step_minus_sel.addEventListener('click', function handleCLick(event){
        steps_view = document.querySelector("#bpm_number");
        steps_num = parseInt(steps_view.innerText);
        steps_view.innerText=(steps_num-1);
     });
}

function NumberClicked(num){
    steps_view = document.querySelector("#bpm_number");

    if ((steps_view.innerHTML)==="&nbsp;&nbsp;&nbsp;") {

        steps_view.innerHTML = num;
    }
    else
    if (steps_view.innerText.length<3) {
        steps_view.innerText += num;
    };
}
function ClearClicked(){
    console.log("löschen");
    steps_view = document.querySelector("#bpm_number");
    steps_view.innerHTML="&nbsp;&nbsp;&nbsp;";
}

function AddKeyBoardHandler()
{
    const keyboard_sel = document.querySelector(".keyboard");
    keyboard_sel.addEventListener('click', function handleCLick(event){

        switch (event.target.innerText){
            case "CLR" : ClearClicked();break;
            default: NumberClicked(event.target.innerText);
        }
    });

    document.querySelector("#dummy_key").style.visibility = "hidden";
}

function setIndicator(indicator,isOn)
{
    if (isOn){
        indicator.className = "tick_on";
    }
    else{
        indicator.className = "tick_off";
    }
}
function setLeftTickIndicator(isOn){
    tick_sel = document.querySelector("#tick_indicator_left");
    setIndicator(tick_sel,isOn);
}

function setRightTickIndicator(isOn){
    tick_sel = document.querySelector("#tick_indicator_right");
    setIndicator(tick_sel,isOn);
}

function click(){
   if (timer == "stopped"){
       timer = "tick";
   }
   else if (timer== "tick"){
       timer = "tack";

   }
   else{
       timer = "tick";
   }

   if(timer == "tick"){
       setLeftTickIndicator(true);
       setRightTickIndicator(false);
   }
   else{
       setLeftTickIndicator(false);
       setRightTickIndicator(true);
   }

   if (!bIsemphasisOn){
       playLowClickSignal();
   }
   else{
       if (tick_cnt==1){
           playHighClickSignal();
       }
       else {
           playLowClickSignal();
       }
       tick_cnt++;

       if (tick_cnt>emphasisValue){
           tick_cnt=1;
       }
   }

}

function start_click(){
    steps_view = document.querySelector("#bpm_number");
    bpm_num = parseInt(steps_view.innerText);

    beatlength_ms = 60000 / bpm_num;
    console.log("beatlength: "+beatlength_ms);
    timer_id = setInterval(click,beatlength_ms);
    console.log("Start click");
}
function stop_click(){
    clearInterval(timer_id);
    setLeftTickIndicator(false);
    setRightTickIndicator(false);
    console.log("Stop click");
}

function AddStartHandler(){
    const start_sel = document.querySelector(".start");
    start_sel.addEventListener('click', function handleCLick(event) {
        if (start_sel.innerText=="Start"){
            start_sel.innerText = "Stop";
            start_sel.className = "bpm_start_running";
            start_click();
        }
        else{
            start_sel.innerText = "Start";
            start_sel.className = "bpm_start_stoppped";
            stop_click();
        }
    });
}


function AddEphasisHandler(){
    const emph_sel = document.querySelector("#EmphasisEnable");

    emph_sel.addEventListener('click', function handleCLick(event) {
        console.log(event.target.checked);
        bIsemphasisOn = event.target.checked;
    });

    const select_sel = document.querySelector("#emphasis_value");

    select_sel.addEventListener('change', function handleCLick(event) {
        console.log(event.target.value);
        emphasisValue = parseInt(event.target.value);
    });

    bIsemphasisOn = emph_sel.checked;
    emphasisValue = select_sel.value;
}

function InitSetup()
{
    const flbox_sel =  document.querySelector(".flbox");
    const setup_box_sel = document.querySelector("#setup_box");
    const frequency_high_sel = document.querySelector("#frequency_high");
    const frequency_low_sel = document.querySelector("#frequency_low");
    const duration_sel = document.querySelector("#duration");
    const button_sel = document.querySelector("#set_button");
    const config_icon_sel = document.querySelector("#config_icon");

    button_sel.addEventListener('click', function handleCLick(event) {
        setup_box_sel.style.visibility = "hidden";
        flbox_sel.style.opacity = 1;
        clickToneHigh = frequency_high_sel.value;
        clickToneLow = frequency_low_sel.value;
        duration = duration_sel.value;
        UpdateClickSignal();
    });

    config_icon_sel.addEventListener('click', function handleCLick(event) {
        setup_box_sel.style.visibility = "visible";
        flbox_sel.style.opacity = 0.3;
    });

    frequency_high_sel.value = clickToneHigh;
    frequency_low_sel.value = clickToneLow;
    duration_sel.value = duration;

    setup_box_sel.style.visibility = "hidden";

}

function Init()
{
    AddBpmStepHandler();
    AddKeyBoardHandler();
    AddStartHandler();
    AddEphasisHandler();

    InitSetup();


}

Init();



