function ComandConsole(){
    const commands =['w','s','a','d','x']
    // now i need to hear  if they press a key that is in the commands or its uppercase variation
    const button = document.createElement('button');
    button.classList.add('console-button')
    // i need to eliminate this element  <div class="l-pane l-pane--vertical-handle-before"> and their childs
    const lPane = document.querySelector('.l-pane.l-pane--vertical-handle-before');
    lPane.remove();
    //add the button to a div with this class l-multipane l-multipane--vertical
    const lMultipane = document.querySelector('.l-multipane.l-multipane--vertical');
    lMultipane.appendChild(button);
    
    let icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-gamepad');
    
    let text = document.createElement('span');
    text.innerHTML = 'Open Console';

    button.appendChild(icon);
    button.appendChild(text);
    
    let open = false;
    button.addEventListener('click', function() {
        if (open) {
            open = false;
            text.innerHTML = 'Open Console';
        } else {
            open = true;
            text.innerHTML = 'Close Console';
        }
    });

    
    document.addEventListener('keydown', function(event){
        if(commands.includes(event.key.toLowerCase())){
            // i need to send this to a websocket server 
            // i need to create a websocket connectio
            const socket = new WebSocket('ws://localhost:3000');
            // i need to send the key to the server
            socket.send(event.key.toLowerCase());

        }
        
    })

    //i ned to a div to this l-pane l-pane--reacts l-shell__pane-main
    const lShell = document.querySelector('.l-pane.l-pane--reacts.l-shell__pane-main');
    const console = document.createElement('div');
    console.classList.add('console-container');
    lShell.appendChild(console);
    //for each element in the commands array i need to create a button
    commands.forEach(command => {
        let button = document.createElement('button');
        button.classList.add('command-button');
        button.innerHTML = command;
        console.appendChild(button);
    });
}