import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw: { lat: number, lng: number }, ne: { lat: number, lng: number }) => {
    try {
        const { data: { data } } = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                'x-rapidapi-key': 'cfd92894a1msh9fd18796bc9aa84p102e4cjsn3515e304fc4d',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Failed to fetch places data'); // Or use a custom error handling strategy
    }
}