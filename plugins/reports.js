
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
                // All asynchronous requests have completed at this point
    
                // Now you can proceed with creating the table and downloading CSV
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
                downloadCSV(csv);
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