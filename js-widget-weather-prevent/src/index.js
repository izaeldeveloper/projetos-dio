import style from './style.css'

const API_KEY = 'a6fb6f7fd04ead24132b96dd2cf9d264'

class WidgetWeather extends HTMLElement{
    /*
    connectedCallback() {console.log("Elemento entrou no Dom")}
    disconnectedCallback(){console.log("Elemento saiu do Dom")}
    attributeChangedCallback(propName, oldValue, value){console.log('propridade', propName, oldValue, value)}
    static get observedAttributes(){return ['exemplo']}
    */

    connectedCallback() {

        this.shadow = this.attachShadow({ mode: 'open' })

        this.shadow.innerHTML = 
        `
            <style>${style}</style>
            <div class='app'>
                <h1 id="temp-main">0°</h1>
                <h2 id="condition">Desconhecida</h2>
            </div>
        `

        this.getLocation()
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                data => this.getWeather(data),
                err => console.log(err),
                { timeout: 20000}
            )
        } else {
            alert("Your browser haven't geolocation.")
        }
    }

    getWeather(data) {
        const { coords: { latitude, longitude }} = data
       const urlBase = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
    
        fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const temp = Math.floor(data.main.temp)
            const condition = data.weather[0].description

            const h1 = this.shadow.querySelector('#temp-main')
            const h2 = this.shadow.querySelector("#condition")

            h1.innerHTML = `${temp}°`
            h2.innerHTML = condition

        })
    }

}

customElements.define( 'widget-wheater', WidgetWeather)