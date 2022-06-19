const secToDays = seconds => {

    let days = Math.floor(seconds / (86400));
    seconds -= days * (86400);
    days = (days < 10) ? "0" + days : days.toString()
    let hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    hours = (hours < 10) ? "0" + hours : hours.toString()
    let minutes = Math.floor(seconds / (60));
    seconds -= minutes * (60);
    minutes = (minutes < 10) ? "0" + minutes : minutes.toString()
    seconds = (seconds < 10) ? "0" + seconds : seconds.toString()

    return { days, hours, minutes, seconds }
}

export default secToDays