import { Paper, Rating, Typography, useMediaQuery } from "@mui/material";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useRef } from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import mapStlyes from "./mapStyle";

interface MapProps {
    setCoordinates: (coords: { lat: number; lng: number }) => void;
    setBounds: (bounds: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } }) => void;
    coordinates: { lat: number; lng: number };
    bounds: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null;
    places: any[],
    setChildClicked: any,
    weatherData: any,
}

const Map: React.FC<MapProps> = ({ setCoordinates, setBounds, coordinates, bounds, places, setChildClicked, weatherData }) => {
    const isDesktop = useMediaQuery("(min-width: 600px)");
    const containerStyle = {
        width: "100%",
        height: "55vh",
    };

    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const onIdle = () => {
        if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            const newBounds = mapRef.current.getBounds();

            if (newCenter && newBounds) {
                const newCoords = {
                    lat: newCenter.lat(),
                    lng: newCenter.lng(),
                };

                const ne = newBounds.getNorthEast();
                const sw = newBounds.getSouthWest();
                const formattedBounds = {
                    ne: { lat: ne.lat(), lng: ne.lng() },
                    sw: { lat: sw.lat(), lng: sw.lng() },
                };

                // if (newCoords.lat !== coordinates.lat || newCoords.lng !== coordinates.lng) {
                //     setCoordinates(newCoords);
                // }

                // if (!boundsEqual(formattedBounds, bounds)) {
                //     setBounds(formattedBounds);
                // }

                if (!coordsEqual(newCoords, coordinates)) {
                    setCoordinates(newCoords);
                }

                if (!boundsEqual(formattedBounds, bounds)) {
                    setBounds(formattedBounds);
                }
            }
        }
    };

    const coordsEqual = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
        const epsilon = 0.0001; // tolerance for float comparison
        return Math.abs(a.lat - b.lat) < epsilon && Math.abs(a.lng - b.lng) < epsilon;
    };

    const boundsEqual = (
        b1: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } },
        b2: typeof b1 | null
    ) => {
        if (!b2) return false;
        return (
            // b1.ne.lat === b2.ne.lat &&
            // b1.ne.lng === b2.ne.lng &&
            // b1.sw.lat === b2.sw.lat &&
            // b1.sw.lng === b2.sw.lng
            coordsEqual(b1.ne, b2.ne) &&
            coordsEqual(b1.sw, b2.sw)
        );
    };

    const onChildClick = (i: number) => {
        setChildClicked(i);
    }

    return (
        <div className="h-[55vh] w-full mt-[4.2rem]">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={14}
                onLoad={onLoad}
                onIdle={onIdle}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: mapStlyes,
                }}
            >
                {Array.isArray(places) && places?.map((place, i) => (
                    <Marker
                        key={i}
                        position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                    >
                        {isDesktop && (
                            <OverlayView
                                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <Paper elevation={3} sx={{zIndex: 0}} className="p-2.5 flex flex-col relative z-0 justify-center w-[100px] shrink transition-all duration-300 ease-in-out transform hover:scale-[1.1] hover:z-[1000] hover:shadow-xl">
                                    <Typography variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className="cursor-pointer"
                                        src={place.photo ? place.photo.images.large.url : '/images/place_placeholder.jpeg'}
                                        alt={place.name}
                                        onClick={() => onChildClick(i)}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            </OverlayView>
                        )}
                    </Marker>
                ))}
                {/* {weatherData?.list?.map((data: any, i: number) => (
                    <Marker key={i} position={{ lat: data.coord.lat, lng: data.coord.lon }}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather-icon" />
                    </Marker>
                ))} */}
            </GoogleMap>
        </div>
    );
};

export default Map;