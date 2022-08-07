import React from 'react'
import {Box, Button, Typography, Card, CardMedia, CardActions, Chip, CardContent, Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const StyledChip = styled(Chip)(({theme}) => ({
  margin: '5px 5px 5px 0',
}))

const StyledTypography = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
}))

const StyledAccordion = styled(Accordion)(({theme}) => ({
  width: 300,
  padding: 0,
  margin: 2,
  '&:before': {
    display: 'none',
  },
  borderTop: '1px solid #2196f3',
}))

function PlaceInfo({place, selected, refProp}) {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
    {place.name &&
      <Card elevation={6}>
        
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography gutterBottom variant='h6'>
                {place.name}
              </Typography>
              <Box display='flex' justifyContent='left' gap={1} alignItems='center'>
                <Rating name='read-only' size='small' value={Number(place.rating)} readOnly />
                <Typography gutterBottom variant='subtitle2'>{place.num_reviews}</Typography>
              </Box>
              <Box display='flex' justifyContent='left' gap={1} alignItems='center'>
                <Typography variant='subtitle1'>Price</Typography>
                <Typography gutterBottom variant='subtitle2'>{place.price_level}</Typography>
              </Box>
              <Box display='flex' justifyContent='left' gap={1} alignItems='center'>
                <Typography variant='subtitle1'>Ranking</Typography>
                <Typography gutterBottom variant='subtitle2'>{place.ranking}</Typography>
              </Box>
              {place?.awards.length > 0 && 
                  <StyledAccordion elevation={0} disableGutters>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon fontSize='small'/>}
                    >
                    <Typography variant='subtitle2'>Awards</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {
                        place?.awards?.map((award) => (
                          <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
                            <img src={award.images.small} alt={award.display_name}/>
                            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                          </Box>
                        ))
                      }
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
                }
              </Box>
            <CardMedia 
            style={{height: 150, width: 200, borderRadius: 15}}
            image={place.photo ? place.photo.images.large.url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}
            title={place.name}
            />
          </Box>
          {place?.cuisine?.map(({name}) => (
            <StyledChip key={name} size='small' label={name} color='primary' variant='outlined'/>
          ))}
          {place?.address && (
            <StyledTypography gutterBottom variant='body2' color='textSecondary'>
              <LocationOnIcon color='primary'/> {place.address}
            </StyledTypography>
          )}
          {place?.phone && (
            <StyledTypography gutterBottom variant='body2' color='textSecondary'>
              <PhoneIcon color='primary' /> {place.phone}
            </StyledTypography>
          )}
          <CardActions>
            <Button size='small' color='primary' variant= 'outlined' onClick={() => window.open(place?.website, '_blank')}>
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    }
    </>
  )
}

export default PlaceInfo