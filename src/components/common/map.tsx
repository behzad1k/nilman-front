import {useState, useEffect} from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
// @ts-ignore
import {OpenStreetMapProvider, GeoSearchControl} from 'leaflet-geosearch';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';

type Position = {
  lat: number;
  lng: number;
} | null;

type Props = {
  position: Position;
  setPosition: (val: Position) => void;
};

// Search Bar component
function SearchField() {
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  // @ts-ignore
  const searchControl = new GeoSearchControl({ provider, showMarker: false, searchLabel: 'جستجو ...', style: 'bar', });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl) as unknown as void;
  }, []);

  return null;
}

// Add Marker Component on click
function LocationMarker({position, setPosition}: Props) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
        if (permissionStatus.state === 'denied') {
          alert('Please allow location access.');
          window.location.href = "app-settings:location";
        } else {
          navigator.geolocation.getCurrentPosition((e) => {
            setPosition({
              lat: e.coords.latitude,
              lng: e.coords.longitude
            });
            map.flyTo({
              lat: e.coords.latitude,
              lng: e.coords.longitude
            }, map.getZoom());
          }, (e) => console.log('errror', e),{timeout:10000});
        }
      });
    } else {
      alert('Geolocation is not supported in your browser.');
    }
  }, []);
  const map = useMapEvents({
    locationfound(e: any) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    click(e: any) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      map.locate();
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// Leaflet Map Component
export function Map({position, setPosition}: Props) {
  return (
    <MapContainer
      center={[position?.lat, position?.lng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker position={position} setPosition={setPosition} />
      <SearchField />
    </MapContainer>
  );
}

export function MapView({position}: {position: Position}) {
  if (position.lng === 0 && position.lat === 0) {
    return (
      <div>
        مختصاتی دریافت نشد
      </div>
    )
  }
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={14}
      style={{ width: '100%', height: '100%'}}
      scrollWheelZoom={false}

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {position == null ? null : (
        <Marker position={position} draggable={false} interactive={false} >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
