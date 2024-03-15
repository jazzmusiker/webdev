
const aChromaticNotes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','H'];
let pressedNote = '';
var pressedNoteSpan ="Hello";

function AddChromaticNoteButtons()
{
    const tonart_sel = document.querySelector(".tonart");
    
    for (i=0;i<aChromaticNotes.length;i++){
        let new_span = document.createElement("span");
        new_span.innerText = aChromaticNotes[i];
        tonart_sel.appendChild(new_span);
    }
    
    tonart_sel.addEventListener('click', function handleCLick(event){
   
        pressedNote = event.target.innerText;
        console.log(event.target.innerText);
   
        if (pressedNoteSpan!= undefined)
        {
            pressedNoteSpan.id = '';
        }

        pressedNoteSpan = event.target;
        pressedNoteSpan.id = 'tonartclicked';
        
    });
  
}

function AddHalbtonSchrittHandler()
{
     const step_plus_sel = document.querySelector("#step_plus");

     step_plus_sel.addEventListener('click', function handleCLick(event){
        steps_view = document.querySelector(".view_steps");
        steps_num = parseInt(steps_view.innerText);
        steps_view.innerText=(steps_num+1);
     });

     const step_minus_sel = document.querySelector("#step_minus");

     step_minus_sel.addEventListener('click', function handleCLick(event){
        steps_view = document.querySelector(".view_steps");
        steps_num = parseInt(steps_view.innerText);
        steps_view.innerText=(steps_num-1);
     });

}

function Init()
{
    AddChromaticNoteButtons();
    AddHalbtonSchrittHandler();
}

Init();
