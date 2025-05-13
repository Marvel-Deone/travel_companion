import { useEffect, useRef, useState } from 'react';

import './App.css';
import CssBaseline from '@mui/joy/CssBaseline';
import Grid from '@mui/joy/Grid';
import Header from './components/Header';
// import { ListItem } from '@mui/joy';
import List from './components/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';
import { LoadScript } from '@react-google-maps/api';
import { debounce, ListItem } from '@mui/material';


function App() {
  const [places, setPlaces] = useState<any>([]);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<{ ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null>(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, []);

  const fetchPlacesDebounced = useRef(
    debounce(async (type: string, bounds: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null, setPlaces: (places: any[]) => void, setIsLoading: (isLoading: boolean) => void) => {
      try {
        if (bounds?.sw && bounds?.ne) {

          // getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
          //   console.log('weather', data);
          //   setWeatherData(data);
          // });
          setIsLoading(true);

          getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
            setPlaces(data?.filter((place: { name: string; num_reviews: number }) => place.name));
            setFilteredPlaces([]);
            setIsLoading(false);
            console.log('dd', data);
          });
        }
      } catch (error) {
        console.log('error');
        setIsLoading(false)
      } finally {
        setIsLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    const filteredPlaces = places.filter((place: any) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    // setIsLoading(true);
    fetchPlacesDebounced(type, bounds, setPlaces, setIsLoading);
  // }, [type, coordinates, bounds]);
  }, [type, bounds]);

  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY} libraries={['places']}>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <div style={{}}></div>
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid xs={12} md={4}>
            <ListItem>
              <List
                places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
              />
            </ListItem>
          </Grid>
          <Grid xs={12} md={8}>
            <ListItem>
              <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                bounds={bounds}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData={weatherData}
              />
            </ListItem>
          </Grid>
        </Grid>
      </LoadScript>
    </>
  )
}

export default App