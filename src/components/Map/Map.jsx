import React from 'react'
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import mapStyles from './mapStyles'

const MapContainer = styled('div')(({ theme }) => ({
  height: '85vh',
  width: '100%',
}))

const MarkerContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': { zIndex: 2 },
  
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
  background: '#c3d8ec'
}))


const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
  const isMobile = useMediaQuery('(min-width:600px)')
  return (
    <MapContainer>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <MarkerContainer 
            lat={Number(place.latitude)} 
            lng={Number(place.longitude)}
            key={index}
          >
            {
              !isMobile ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large' />
              ) : (
                <StyledPaper elevation={3} >
                  <Typography variant='subtitle2' gutterBottom> {place.name}</Typography>
                  <img
                    style={{cursor: 'pointer'}}  
                    src={place.photo ? place.photo.images.large.url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}
                    alt={place.name}
                  />

                  <Rating name='read-only' size='small' value={Number(place.rating)} readOnly />
                </StyledPaper>
              )

            }
          </MarkerContainer>
        ))}

      </GoogleMapReact>
    </MapContainer>
  )
}

export default Map
