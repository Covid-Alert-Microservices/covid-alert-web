import { useEffect, useState } from 'react';



const useGeolocation = (options : PositionOptions ) => {

  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(setPosition, (e) => {console.log(e)}, options)
    return () => {
      setPosition(null)
    }
  }, [options])

  return position;
}

export default useGeolocation;