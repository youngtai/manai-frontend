import * as React from 'react';
import {AppBar, Button, Container, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import FileUpload from './FileUpload.js';
import {styled} from "@mui/material/styles";
import Service from './BackendServices.js';

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
}));

const SERVICES = new Service();

function App() {

  const [files, setFiles] = React.useState([]);
  const [imagesUploaded, setImagesUploaded] = React.useState(false);

  const handleChange = (files) => {
    setFiles(files);
  };;
  const handleImageUpload = async () => {
    const response = await SERVICES.uploadFiles(files);
    if (response && response.ok) {
      console.log(response);
      setImagesUploaded(true);
    }
  };

  return (
    <RootContainer>
      <AppBar>
        <Typography variant='h3'>MANAI</Typography>
      </AppBar>
      <Container>
        <Typography variant='h4'>
          Upload your images
        </Typography>
        <Grid container direction='row' alignItems='center'>
          <Grid item>
            <FileUpload onChange={handleChange} allowedExtensions={['.jpg', '.jpeg', '.png']} maxNumFiles={50}/>
          </Grid>
        </Grid>
        <Button onClick={handleImageUpload}>Upload images for training</Button>
        <div hidden={!imagesUploaded}>
          <Typography>Images were uploaded</Typography>
        </div>
        <ImageList cols={3}>
          {files.map((file, idx) => (
            <ImageListItem key={`image-${idx}`}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </RootContainer>
  );
}

export default App;
