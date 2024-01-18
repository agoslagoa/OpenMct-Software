
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
        //disable the button
        button.disabled = true;
        button.classList.add('disabled');
        text.innerText = 'Creating Report...';

        let startDate = new Date();
        startDate.setHours(0,0,0,0);
        let endDate = new Date();
        let reportData={}

        let promises = [];

        http.get('/ros2dictionary.json')
            .then(function (result) {
                result.data.measurements.forEach(element => {
                    let url = '/history/' +
                        element.key +
                        '?start=' + startDate.getTime() +
                        '&end=' + endDate.getTime();
                    let promise = http.get(url)
                        .then(function (resp) {
                            reportData[element.key] = resp.data;
                        });
    
                    promises.push(promise);
                });
    
                // Wait for all promises to resolve before further processing
                return Promise.all(promises);
            })
            .then(function () {

                let csv = 'Boat Report,Date: ' + endDate + '\n';
                csv += ',Maximun value, Minimun Value, Avarage Value, Error Time\n';
                Object.keys(reportData).forEach(key => {
                    let dataArray = reportData[key];
                    let max, min, avg, errorTime;

                    if (dataArray.length === 0) {
                        max = min = avg = errorTime = 0;
                    } else {
                        let values = dataArray.map(item => item.value).filter(value => value !== undefined);
                        console.log(values)
                        max = Math.max(...values);
                        min = Math.min(...values);
                        avg = values.reduce((a, b) => a + b, 0) / values.length;
                        errorTime = values.filter(x => x < 0).length;
                    }

                    csv += `${key},${max},${min},${avg},${errorTime}\n`;
                });
                //create a toast to show the report was created
                let toast = document.createElement('div');
                toast.classList.add('toast');   
                toast.classList.add('success');
                
                let icon = document.createElement('i');
                icon.classList.add('fa-solid');
                icon.classList.add('fa-file-arrow-down');
                
                let text = document.createElement('p');
                text.innerText = 'Report Created';
                
                document.body.appendChild(toast);
                toast.appendChild(icon);
                toast.appendChild(text);
                
                setTimeout(  function () {
                                    toast.classList.add('active');
                                    //downloadCSV(csv);
                },200);
                setTimeout(function () {
                    toast.remove();
                    button.disabled = false;
                    button.classList.remove('disabled');
                    text.innerText = 'Create Report';
                }, 3000);
            })
            .catch(function (error) {
                console.error('Error:', error);
            });

    });


}
function downloadCSV(csv) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'boat_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}