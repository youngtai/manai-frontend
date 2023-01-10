import * as React from 'react';
import {Button, Container, Grid, ImageList, ImageListItem, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Service from '../BackendServices';

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

const SERVICES = new Service();

function CreatePage() {
  const [prompt, setPrompt] = React.useState('');
  const [createdImages, setCreatedImages] = React.useState([1, 2, 3, 4]);

  const createImages = async () => {
    const response = await SERVICES.do_inference(prompt);
  };

  return (
    <RootContainer>
      <Container>
        <Typography variant='h5'>
          Describe your image with words
        </Typography>
        <Grid container direction='row' alignItems='center' spacing={3}>
          <Grid item xs={10}>
            <TextField
              required
              label='A cool idea ...'
              onChange={e => setPrompt(e.target.value)}
              fullWidth
              sx={{marginY: 2}}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant='outlined' onClick={createImages}>
              Create Images
            </Button>
          </Grid>
        </Grid>
        <Typography variant='h6' hidden={prompt === '' && createdImages.length > 0}>
          {`Images from "${prompt}"`}
        </Typography>
        <ImageList>
          {createdImages.map((file, idx) => (
            <ImageListItem key={`image-${idx}`}>
              <img
                src={null}
                alt={`Dummy image`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </RootContainer>
  );
}

export default CreatePage;
