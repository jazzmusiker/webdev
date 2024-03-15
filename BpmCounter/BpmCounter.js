let time_last_click = 0;


function Init()
{
    const tap_sel = document.querySelector(".TAP");
    tap_sel.addEventListener('click', function handleCLick(event){
        console.log("clicked");
    });

    tap_sel.addEventListener('mousedown', function handleCLick(event){
        const d = new Date();

        console.log("mousedown");
        event.target.id="tapped";

        if (time_last_click==0){
            console.log("first click");
            time_last_click=d.getTime();
        }
        else{
            current_time = d.getTime();
            time_difference = current_time-time_last_click;

            if (time_difference<1500){
                bpm = 60000.0 / time_difference;
                console.log("time difference "+time_difference)
                console.log("Bpm: "+bpm);
                time_last_click = current_time;

                const bpm_view_sel = document.querySelector(".bpm_view");
                bpm_view_sel.innerText = (Math.round(bpm*10) / 10);
            }
            else
            {
                const bpm_view_sel = document.querySelector(".bpm_view");
                bpm_view_sel.innerText = "---.-";
                time_last_click=d.getTime();
            }
        }

    });

    tap_sel.addEventListener('mouseup', function handleCLick(event){
        console.log("mouseup");
        event.target.id="";
    });
}

Init();
