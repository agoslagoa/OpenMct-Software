class boatsystem {
    constructor() {
    this.alerts = [];
    this.audio = new Audio('/assets/alertSound.mp3');
    this.isPlaying = false;
    }
    
    
    playAlertSound() {
        if (!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
        }
    }
    
    stopAlertSound() {
        if (this.isPlaying) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
        }
    }
    
    //ADD ALERT
    addAlert(alert) {
        this.editTelemetry("2px solid red");
        if (!this.checkAlert(alert)) {
            this.alerts.push(alert);
        }
    }
    //CREATE ALERT
    createAlert() {
        // Create a notification container in the DOM
        let toastContainer = this.createToastContainer();
        document.body.appendChild(toastContainer);
    
        let toast = this.createToast();
        toastContainer.appendChild(toast);
        toast.insertBefore(this.createIcon(), toast.firstChild);
        
        this.playAlertSound();
        
        // Show the toast
        setTimeout(function () {
            toast.classList.add('active');
        }, 250);
        
        // Hide the toast after some time (e.g., 3 seconds)
        setTimeout(function () {
            toast.remove();
        }, 1000);
    }
    
    // Method to create the toast container
    createToastContainer() {
        var toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        return toastContainer;
    }
    
    // Method to create the toast element
    createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');
        toast.classList.add('error');
        toast.innerText = this.getAlerts();
        return toast;
    }
    
    // Method to create the alert icon
    createIcon() {
        var icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-exclamation-triangle');
        return icon;
    }
    //CHECK IF ALERT ALREADY EXISISTS
    checkAlert(alert) {
        return this.alerts.includes(alert);
    }
    //REMOVE ALERT
    removeAlert(alert) {
        this.editTelemetry("");
        if (this.checkAlert(alert)) {
            this.alerts.splice(this.alerts.indexOf(alert), 1);
        }
    }
    getAlertsAmount() {
        return this.alerts.length;
    }
    //GET string 
    getAlerts() {
        return "Erorrs in: " + this.alerts.join(' ');
    }
    // Function to check if an element is in the HTML collection
    elementIsInCollection(element, collection) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].innerText === element) {
                return i;
            }
        }
        return -1;
    }

    
    //Edit telemetry with alert
    editTelemetry(borderColor) {   

        let telemetry_collection = document.getElementsByClassName("plot-series-name");
        this.alerts.forEach(element => {
            let index = this.elementIsInCollection(element, telemetry_collection);
            if (index != -1) {
                let telemetryDiv = document.getElementsByClassName("js-style-receiver")[index/2];
                telemetryDiv.style.border = borderColor;
            }
        });
    }
}