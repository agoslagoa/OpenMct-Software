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
        if (!this.checkAlert(alert)) {
            this.alerts.push(alert);
        }
    }
    //CHECK IF ALERT ALREADY EXISISTS
    checkAlert(alert) {
        return this.alerts.includes(alert);
    }
    //REMOVE ALERT
    removeAlert(alert) {
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
}
