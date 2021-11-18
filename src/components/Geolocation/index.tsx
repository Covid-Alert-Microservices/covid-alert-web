import React from "react";
import { useEffect } from "react";

const MILLIS_GEO_TRACKING = 1000 * 60 * 5;

const options = { enableHighAccuracy: true, maximumAge: MILLIS_GEO_TRACKING };

const handlePosition = (e: GeolocationPosition) => {
  console.log(e.coords, e.timestamp);
};

const handleError = (e: GeolocationPositionError) => {
  console.warn(e);
};

const Geolocation = () => {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      options
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return null;
};

export default React.memo(Geolocation);
