import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { geolocationApi } from "../../store/api/geolocation";
import { isPositionEnabled } from "../../store/api/position";

const MILLIS_GEO_TRACKING = 1000 * 60 * 5;

const options = { enableHighAccuracy: true, maximumAge: MILLIS_GEO_TRACKING };

const handlePosition = (e: GeolocationPosition) =>
  geolocationApi.endpoints.sendPosition.initiate({ timestamp: e.timestamp, latitude: e.coords.latitude, longitude: e.coords.longitude })

const handleError = (e: GeolocationPositionError) => console.warn(e);

const Geolocation = () => {
  const active = useSelector(isPositionEnabled);
  useEffect(() => {
    if (!active) return;
    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      options
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [active]);

  return null;
};

export default React.memo(Geolocation);
