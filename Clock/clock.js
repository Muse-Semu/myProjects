setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

const showHour= document.querySelector('[show-hour]')
const showMinute= document.querySelector('[show-minute]')
const showSecond= document.querySelector('[show-second]')

function setClock() {

    const currentDate = new Date()

    const secondRatio = currentDate.getSeconds() / 60
    const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minuteRatio + currentDate.getHours()) / 12

    setRotation(secondHand, secondRatio)
    setRotation(minuteHand, minuteRatio)
    setRotation(hourHand, hoursRatio)
    displayTime((hoursRatio * 12) ,minuteRatio * 60,secondRatio * 60 )
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotate', rotationRatio*360)
}

function displayTime(hour,minute,second){
    showHour.innerHTML = parseInt(hour) + ' :'
    showMinute.innerHTML = parseInt(minute) + ' : '
    showSecond.innerHTML = parseInt(second)
}
setClock()