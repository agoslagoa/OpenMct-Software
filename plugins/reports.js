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

    //oon click  i want to get the two dates the one ate the beggining of the day and the current date

    button.addEventListener('click', function() {
        let startDate = new Date();
        startDate.setHours(0,0,0,0);
        let endDate = new Date();
        
        http.get('/ros2dictionary.json')
        .then(function (result) {
            result.data.measurements
            .forEach(element => {
                let url = '/history/' +
                    element.key +
                    '?start=' + startDate.getTime() +
                    '&end=' + endDate.getTime() ;

                http.get(url)
                    .then(function (resp) {
                        console.log(resp);
                    });
            });
        });
        //get the dictionary json

    });


}