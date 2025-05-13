import { Grid } from "@mui/joy";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { createRef, useEffect, useMemo, useState } from "react"
import PlaceDetails from "./PlaceDetails";

type ListProps = {
    childClicked: any;
    places: any;
    isLoading: Boolean;
    type: string;
    setType: (value: string) => void;
    rating: string;
    setRating: (value: string) => void;
};

const List: React.FC<ListProps> = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) =>
          Array(places?.length)
            .fill(null)
            .map((_, i) => refs[i] || createRef())
        );
      }, [places]);
    
    return (
        <div className="mt-[4.2rem] p-[25px]">
            <Typography variant="h4" fontSize={20}>Returants, Hotels & Attractions around you</Typography>
            {isLoading ? (
                <div className="flex justify-center mt-4">
                    <CircularProgress size="30px" />
                </div>
            ) :
                <>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <FormControl className="w-full">
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select name="type" value={type} onChange={(e) => setType(e.target.value)} label="Type" labelId="type-label">
                                <MenuItem value="restaurants">Restaurants</MenuItem>
                                <MenuItem value="hotels">Hotels</MenuItem>
                                <MenuItem value="attractions">Attractions</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="w-full">
                            <InputLabel id="demo-select-small-label">Rating</InputLabel>
                            <Select value={rating} onChange={(e) => setRating(e.target.value)} labelId="demo-select-small-label" label="Rating">
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 5.0</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Grid container spacing={3} className="h-[75vh] overflow-auto" sx={{ marginTop: '20px' }}>
                        {places?.map((place: { name: string }, i: number) => (
                            <Grid ref={elRefs[i]} key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={childClicked === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </div>
    )
}

export default List