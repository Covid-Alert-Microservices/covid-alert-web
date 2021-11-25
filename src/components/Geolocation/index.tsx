import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { geolocationApi } from "../../store/api/geolocation";
import { isPositionEnabled } from "../../store/api/position";

const MILLIS_GEO_TRACKING = 1000 * 30;

const options = { enableHighAccuracy: true, maximumAge: MILLIS_GEO_TRACKING };

const handleError = (e: GeolocationPositionError) => console.warn(e);

const Geolocation = () => {
  const active = useSelector(isPositionEnabled);
  const [sendPosition] = geolocationApi.useSendPositionMutation()


  useEffect(() => {
    if (!active) return;
    const handlePosition = (e: GeolocationPosition) => { sendPosition({ timestamp: e.timestamp, latitude: e.coords.latitude, longitude: e.coords.longitude }); window.alert("Position sent"); }
    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      options
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [active, sendPosition]);

  return null;
};

export default React.memo(Geolocation);
