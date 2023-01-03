import * as React from 'react';
import {Container, ImageList, ImageListItem, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

function CreatePage() {
  const [prompt, setPrompt] = React.useState('');
  const [createdImages, setCreatedImages] = React.useState([1, 2, 3, 4]);

  return (
    <RootContainer>
      <Container>
        <Typography variant='h5'>
          Create images from a text prompt
        </Typography>
        <TextField
          required
          label='Some cool prompt ...'
          onChange={e => setPrompt(e.target.value)}
          fullWidth
          sx={{marginY: 2}}
        />
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
