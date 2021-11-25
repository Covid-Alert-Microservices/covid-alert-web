import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { geolocationApi } from "../../store/api/geolocation";
import { isPositionEnabled } from "../../store/api/position";

const MILLIS_GEO_MAX_INTERVAL = 1000 * 10;  // 20 seconds (ensure that position are sent maximum every 20 seconds)
const MILLIS_GEO_CACHE = 1000 * 3;          // 3 seconds (cache position for 3 seconds)
const MILLIS_GEO_TIMEOUT = 1000 * 5;        // 5 seconds (time to get position before throwing error)

const options = { enableHighAccuracy: true, maximumAge: MILLIS_GEO_CACHE, timeout: MILLIS_GEO_TIMEOUT };

const handleError = (e: GeolocationPositionError) => console.warn(e);

const Geolocation = () => {
  const active = useSelector(isPositionEnabled);
  const [sendPosition] = geolocationApi.useSendPositionMutation()

  const [watchId, setWatchId] = useState<null | number>(null);
  const [interval, setInter] = useState<null | NodeJS.Timeout>(null);
  const [lastCallTimestamp, setLastCallTimestamp] = useState(0);

  const handlePosition = (e: GeolocationPosition) => {
    const currentTimestamp = Date.now()
    if (currentTimestamp - lastCallTimestamp < MILLIS_GEO_MAX_INTERVAL) return;
    sendPosition({ timestamp: e.timestamp, latitude: e.coords.latitude, longitude: e.coords.longitude });
    setLastCallTimestamp(currentTimestamp);
    console.log(e);
  }



  useEffect(() => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    if (interval) clearInterval(interval);
    if (active) {
      const _watchId = navigator.geolocation.watchPosition(handlePosition, handleError, options);
      const _interval = setInterval(() => navigator.geolocation.getCurrentPosition(handlePosition, handleError, options), MILLIS_GEO_MAX_INTERVAL);
      setWatchId(_watchId);
      setInter(_interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return null;
};

export default Geolocation;
