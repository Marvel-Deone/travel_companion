// import { AutocompleteOption, ListItemContent, ListItemDecorator } from '@mui/joy';
import { Autocomplete, Box, TextField, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';

const Header = () => {
    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
    ];

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
                    <Autocomplete className='hidden md:flex' style={{ cursor: 'pointer' }}
                        options={options}
                        renderInput={(params) => (
                            <>
                                <TextField {...params}
                                    size='small'
                                    placeholder='Search...'
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <SearchIcon sx={{ color: 'white', marginLeft: 1 }} />
                                        ),
                                        sx: {
                                            color: 'white',
                                            '& input': { color: 'white' },
                                        },
                                    }}
                                />
                            </>
                        )
                        }
                        sx={{
                            width: 250, backgroundColor: '#ffffff40', border: 0, '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none'
                                },
                            },
                        }}
                    />
                    <div className="flex md:hidden">
                        <SearchIcon />
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
