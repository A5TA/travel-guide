import React, {useState, useEffect, createRef} from 'react'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, Select, FormControl} from '@mui/material'
import { styled } from '@mui/material/styles'
import PlaceInfo from '../PlaceInfo/PlaceInfo'


const ListContainer = styled('div')(({ theme }) => ({
  padding: '25px',
  marginTop: theme.spacing(1),
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1), 
  minWidth: 120, 
  marginBottom: '15px',
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  marginTop: '8px',
  height: '35px'
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: '75vh',
  overflow: 'auto',
  marginTop: 10
})) 

const LoadingDiv = styled('div')(({ theme }) => ({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})) 

function List({places, childClicked, isLoading, type, setType, rating, setRating}) {
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, index) => refs[index] || createRef()))
  },[places])
  return (
    <ListContainer>
      <Typography variant='h5'>
        Places to visit near you
      </Typography>
      {isLoading ? (
        <LoadingDiv>
          <CircularProgress size='4rem' />
        </LoadingDiv>
      ) : (
        <>
          <StyledFormControl>
            <InputLabel>Type</InputLabel>
            <StyledSelect value={type} onChange={(e) => setType(e.target.value)} label='Type'>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </StyledSelect>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel>Rating</InputLabel>
            <StyledSelect value={rating} onChange={(e) => setRating(e.target.value)} label='Rating'>
              <MenuItem value={0}>Any</MenuItem>
              <MenuItem value={3}>3.0+</MenuItem>
              <MenuItem value={4}>4.0+</MenuItem>
              <MenuItem value={4.5}>4.5+</MenuItem>
            </StyledSelect>
          </StyledFormControl>
          <StyledGrid container spacing={3}>
            {places?.map((place, index) => (
              <Grid ref={elRefs[index]} item key={index} xs={12}>
                <PlaceInfo 
                  place={place} 
                  selected={Number(childClicked) === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </StyledGrid>
        </>
      )}
    </ListContainer>
  )
}

export default List