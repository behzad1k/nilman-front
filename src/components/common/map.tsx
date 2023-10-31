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
  const map = useMapEvents({
    // locationfound(e: any) {
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
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
      center={[35.80693981523168, 51.42884194850922]}
      zoom={14}
      scrollWheelZoom={false}
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
