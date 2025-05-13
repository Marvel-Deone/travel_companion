// import { AutocompleteOption, ListItemContent, ListItemDecorator } from '@mui/joy';
import { Box, InputBase, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const Header = ({ setCoordinates }: { setCoordinates: (coords: { lat: number; lng: number }) => void }) => {
    const [autoComplete, setAutocomplete] = useState<any>(null);

    const onLoad = (autoC: any) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        if (autoComplete) {
            const lat = autoComplete.getPlace().geometry.location.lat();
            const lng = autoComplete.getPlace().geometry.location.lng();
            setCoordinates({ lat, lng });
        }
    }

    return (
        <AppBar>
            <Toolbar className='flex justify-between'>
                <Typography variant='h5' fontSize='20px' className='text-[12px] md:text-[20px]'>
                    Travel Companion
                </Typography>
                <Box display="flex" alignItems='center' gap='10px'>
                    <Typography variant='h6' fontSize='17px' className='hidden md:flex'>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className='border-0'>
                        <div className='flex gap-1 px-2 py-1.5 relative rounded-lg bg-[#ffffff40] text-white hover:bg-[#ffffff64] mr-2 ml-0 w-full z-0'>
                            <div className='mt-0.5'>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." sx={{ color: 'white' }} />
                        </div>
                    </Autocomplete>
                    <div className="flex md:hidden">
                        <SearchIcon />
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
