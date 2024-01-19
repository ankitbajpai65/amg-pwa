
import { useEffect, useState } from "react";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useJsApiLoader, GoogleMap, MarkerF, CircleF } from "@react-google-maps/api";

const PwaMap = () => {
  const [userPos, setUserPos] = useState({ lat: 51.505, lng: -0.09 });
  const [locAcc, setLocAcc] = useState<number>(0);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(success, error);
    //!type error couldnt resolve.
    // @ts-expect-error position type should be Position but not working.
    function success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const acc = position.coords.accuracy;
      setUserPos({ lat: lat, lng: lng });
      setLocAcc(acc as number);
    }

    function error(err: { code: number }) {
      console.log(error);
      if (err.code === 1) {
        errorAlert(3000, "Please Allow access");
      } else {
        console.log("Cant access Current location");
      }
    }
  }, []);



  return (
    <div id="map" className="w-full h-full flex flex-col">
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Map</p>
        <p>Use the map to locate each landmark and destination.</p>
      </div>
      {isLoaded ? (
        <div className="grow">
          <GoogleMap
            center={userPos}
            zoom={11}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <MarkerF position={userPos} />
            <CircleF center={userPos} radius={locAcc} />
          </GoogleMap>
        </div>
      ) : (
        <div>Map Did not get Loaded</div>
      )}
    </div>
  );
};
export default PwaMap;
