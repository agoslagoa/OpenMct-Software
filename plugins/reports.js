function Reports() {
    let headSection = document.querySelector('.l-shell__head-section.l-shell__indicators');
    let button = document.createElement('button');
    
    button.classList.add('report-button');
    
    let icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-table');
    
    let text = document.createElement('span');
    text.innerText = 'Create Report';

    button.appendChild(icon);
    button.appendChild(text);

    headSection.appendChild(button);
}