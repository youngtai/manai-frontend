import * as React from 'react';
import {Button, Container, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import FileUpload from './FileUpload.js';
import {styled} from "@mui/material/styles";
import Service from './BackendServices.js';

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

const SERVICES = new Service();

function TrainPage() {

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
      <Container>
        <Typography variant='h5'>
          Train a fine-tune model
        </Typography>
        <Typography variant='h6'>
          Upload your images
        </Typography>
        <Grid container direction='row' alignItems='center'>
          <Grid item>
            <FileUpload onChange={handleChange} allowedExtensions={['.jpg', '.jpeg', '.png']} maxNumFiles={50}/>
          </Grid>
        </Grid>
        <Button 
          onClick={handleImageUpload}
          variant="outlined"
          >
          Upload images for training
        </Button>
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

export default TrainPage;
