//function to play audio from the keyboard
window.addEventListener('keydown',function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if (!audio) return; // stop the function
    audio.currentTime = 0; // rewind to the start if spamming the key
    audio.play();
    key.classList.add('playing');
});

// function to remove the "playing" class
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip if it is not a transform
    this.classList.remove('playing');
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => 
    {
        key.addEventListener('transitionend', removeTransition);
        
        let newButton = document.createElement("button");
        newButton.innerText = "Change Keybind";
        newButton.classList.add('changeKeybind') // class to style the buttons created in css
        newButton.addEventListener("click", e => 
            {
                clickedButton = e.target;

                let tempFunc = e => 
                {
                    ChangeKeyBind(e.keyCode, e.key);
                    window.removeEventListener("keyup", tempFunc);
                };

                window.addEventListener("keyup", tempFunc);
            });
        
        key.appendChild(newButton);

    }
);

let clickedButton;
function ChangeKeyBind(newKeyCode, newKeyName){
    let currentKey = clickedButton.parentNode;
    let currentAudio = document.querySelector(`audio[data-key="${currentKey.getAttribute("data-key")}"]`);

    currentKey.setAttribute("data-key", newKeyCode);
    currentKey.children[0].innerText = newKeyName.toUpperCase();

    currentAudio.setAttribute("data-key", newKeyCode);

}
