function ComandConsole(){
    const commands =['w','s','a','d','x']
    // now i need to hear  if they press a key that is in the commands or its uppercase variation
    // i need to eliminate this element  <div class="l-pane l-pane--vertical-handle-before"> and their childs
    const lPane = document.querySelector('.l-pane.l-pane--vertical-handle-before');
    lPane.remove();
    //add the button to a div with this class l-multipane l-multipane--vertical
    const lMultipane = document.querySelector('.l-multipane.l-multipane--vertical');
    lMultipane.appendChild(button);
    
    const button = document.createElement('button');
    button.classList.add('console-button');
    button.innerHTML = 'Open Console';
    let open = false
    button.addEventListener('click', function(){
        if(!open){
            button.innerHTML = 'Open Console';
        }else{
            open=true;
            button.innerHTML = 'Close Console';
        }
    })

    
    document.addEventListener('keydown', function(event){
        if(commands.includes(event.key.toLowerCase())){
            // i need to send this to a websocket server 
            // i need to create a websocket connectio
            const socket = new WebSocket('ws://localhost:3000');
            // i need to send the key to the server
            socket.send(event.key.toLowerCase());

        }
        
    })
}