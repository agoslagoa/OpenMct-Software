function ComandConsole(){
    const commands =['w','a','s','d','x']
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
    
    const lShell = document.querySelector('.l-pane.l-pane--reacts.l-shell__pane-main');
    const consola = document.createElement('div');
    consola.classList.add('console-container');
    lShell.appendChild(consola);

    let open = false;
    button.addEventListener('click', function() {
        if (open) {
            open = false;
            text.innerHTML = 'Open Console';
            button.classList.remove('open-console-button');
            consola.classList.remove('open-console');
            icon.classList.remove('fa-circle-xmark');
            icon.classList.add('fa-gamepad');
            // Cierra la conexión WebSocket cuando la consola se cierra
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        } else {
            open = true;
            text.innerHTML = 'Close Console';
            icon.classList.remove('fa-gamepad');
            icon.classList.add('fa-circle-xmark');
            button.classList.add('open-console-button');  
            consola.classList.add('open-console');
            // Establece la conexión WebSocket cuando la consola se abre
            socket = new WebSocket('ws://localhost:8080/realtime/commands');
            socket.onopen = function(event) {
                window.addEventListener('keypress', function(event) {
                    // Verifica si la tecla está en el array de comandos
                    if (commands.includes(event.key.toLowerCase())) {
                        socket.send(event.key);
                    }
                });
            };
        }
    });
    
    //for each element in the commands array i need to create a button
    commands.forEach(command => {
        let button = document.createElement('button');
        button.classList.add('command-button');
        button.innerHTML = command;
        consola.appendChild(button);
    });
}