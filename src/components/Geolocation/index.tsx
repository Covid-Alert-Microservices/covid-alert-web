
const MILLIS_GEO_TRACKING = 1000 * 60 * 5;

const options = { enableHighAccuracy: true, maximumAge: MILLIS_GEO_TRACKING }

const handlePosition = (e: GeolocationPosition) => { console.log(e) }

const handleError = (e: GeolocationPositionError) => { console.warn(e) }

const Geolocation = () => {

    const getGeolocation = () => navigator.geolocation.getCurrentPosition(handlePosition, handleError, options) // Return 2 promise-position

    if (navigator.geolocation) setInterval(getGeolocation, 5000)

    return <></>
}

export default Geolocation;