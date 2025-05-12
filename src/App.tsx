import { useEffect, useRef, useState } from 'react';

import './App.css';
import CssBaseline from '@mui/joy/CssBaseline';
import Grid from '@mui/joy/Grid';
import Header from './components/Header';
import { ListItem } from '@mui/joy';
import List from './components/List';
import Map from './components/Map';
import { getPlacesData } from './api';
import { LoadScript } from '@react-google-maps/api';
import { debounce } from '@mui/material';


function App() {
  const [places, setPlaces] = useState<any>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<{ ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null>(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, []);

  const fetchPlacesDebounced = useRef(
    debounce(async (bounds: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null, setPlaces: (places: any[]) => void, setIsLoading: (isLoading: boolean) => void) => {
      try {
        setIsLoading(true);
        if (bounds?.sw && bounds?.ne) {
          getPlacesData(bounds?.sw, bounds?.ne).then((data) => {
            setPlaces(data);
          });
        }
      } catch (error) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    fetchPlacesDebounced(bounds, setPlaces, setIsLoading);
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <div style={{}}></div>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid xs={12} md={4}>
          <ListItem>
            <List
              places={places}
              childClicked={childClicked}
              isLoading={isLoading}
            />
          </ListItem>
        </Grid>
        <Grid xs={12} md={8}>
          <ListItem>
            <LoadScript googleMapsApiKey="AIzaSyDwzAHY5bklLQhInPc_mDIa-_QZFo3rmWs">
              <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                bounds={bounds}
                places={places}
                setChildClicked={setChildClicked}
              />
            </LoadScript>
          </ListItem>
        </Grid>
      </Grid>
    </>
  )
}

export default App
