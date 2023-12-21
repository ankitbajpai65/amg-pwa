import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import { errorAlert } from "@/components/appComponents/appAlert";



const PwaMap = () => {
  const [userPos, setUserPos] = useState({ lat: 51.505, lng: -0.09 });
  const [locAcc, setLocAcc] = useState<number>(0);

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
      console.log(acc);
    }

    function error(err:{code:number}) {
      console.log(error);
      if (err.code === 1) {
        errorAlert(3000, "Please Allow access");
      } else {
        console.log("Cant access Current location");
      }
    }
  }, []);

  const RecenterAutomatically = (props:{lat: number, lng: number}) => {
    const map = useMap();
    useEffect(() => {
      map.setView([props.lat, props.lng]);
    }, [props.lat, props.lng]);
    return null;
  };

  return (
    <div id="map">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "100wh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <LocationMarker/> */}
        <Marker position={userPos}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Circle center={[userPos.lat, userPos.lng]} radius={locAcc} />
        <RecenterAutomatically lat={userPos.lat} lng={userPos.lng} />
      </MapContainer>
    </div>
  );
};
export default PwaMap;
