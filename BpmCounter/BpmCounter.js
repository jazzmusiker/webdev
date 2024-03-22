let time_last_click = 0;
let avg_diff = [0,0,0,0,0];
let avg_diff_index = 0;
let avg_num_valid_diff = 0;
function resetBpmView()
{
    const d = new Date();
    time_last_click=d.getTime();
    const bpm_view_sel = document.querySelector(".bpm_view");
    bpm_view_sel.innerText = "---.-";
    avg_diff = [0,0,0,0,0];
    avg_diff_index = 0;
    avg_num_valid_diff = 0;
}

function validTappDiff(time_difference)
{
    avg_diff[avg_diff_index] = time_difference;
    avg_diff_index++;
    if (avg_diff_index>4) {
        avg_diff_index = 0;
    };

    if (avg_num_valid_diff<5){avg_num_valid_diff++;};

    let sum = 0;

    for(i=0;i<(avg_num_valid_diff);i++){
        sum += avg_diff[i];
    }

    bpm = 60000.0 / (sum / avg_num_valid_diff);

    const bpm_view_sel = document.querySelector(".bpm_view");
    bpm_view_sel.innerText = (Math.round(bpm*10) / 10);
}
function tapped()
{
    const d = new Date();

    if (time_last_click==0){
        resetBpmView();
    }
    else{
        current_time = d.getTime();
        time_difference = current_time-time_last_click;

        if (time_difference<1500){
            validTappDiff(time_difference);
            time_last_click = current_time;
        }
        else
        {
            resetBpmView();
        }
    }
}

function Init()
{
    const tap_sel = document.querySelector(".TAP");
    tap_sel.addEventListener('click', function handleCLick(event){
    });

    tap_sel.addEventListener('mousedown', function handleCLick(event){
        event.target.id="tapped";
        tapped();

    });

    tap_sel.addEventListener('mouseup', function handleCLick(event){
        event.target.id="";
    });


    const metronom_sel = document.querySelector(".Metronom");
    metronom_sel.addEventListener('click', function handleCLick(event){

        const bpm_view_sel = document.querySelector(".bpm_view");

        let num = parseInt(bpm_view_sel.innerText);

        if (!isNaN(num)){
          window.location.href="../Metronom/Metronom.html?BPM="+bpm_view_sel.innerText;
        }
    });
}

Init();
