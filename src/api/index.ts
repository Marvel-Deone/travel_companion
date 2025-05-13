import axios from 'axios';

export const getPlacesData = async (type: string, sw: { lat: number, lng: number }, ne: { lat: number, lng: number }) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Failed to fetch places data'); // Or use a custom error handling strategy
    }
}

// export const getWeatherData = async (lat: number, lng: number) => {
//     try {
//         const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
//             params: { lat: lat, lon: lng},
//             headers: {
//                 'x-rapidapi-key': 'cfd92894a1msh9fd18796bc9aa84p102e4cjsn3515e304fc4d',
//                 'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
//             }
//         });
//         return data;
//     } catch (err) {
//         console.error('Error fetching weather data:', err);
//         throw new Error('Failed to fetch weather data'); // Or use a custom error handling strategy
//     }
// }