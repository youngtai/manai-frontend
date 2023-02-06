import {useState} from 'react';
import {Button, Container, Grid, ImageList, ImageListItem, Skeleton, Stack, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Service from '../BackendServices';

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

const SERVICES = new Service();

const skeleton = (
  <Container>
    <Grid container direction='row' spacing={2} justifyContent='center'>
      <Grid item>
        <Stack spacing={1}>
          <Skeleton variant='rectangular' width={256} height={256}/>
          <Skeleton variant='rectangular' width={256} height={256}/>
          <Skeleton variant='rectangular' width={256} height={256}/>
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={1}>
          <Skeleton variant='rectangular' width={256} height={256}/>
          <Skeleton variant='rectangular' width={256} height={256}/>
          <Skeleton variant='rectangular' width={256} height={256}/>
        </Stack>
      </Grid>
    </Grid>
  </Container>
);

function ImagesDisplay({createdImages}) {
  return (
    <ImageList>
      {
        createdImages.map((blob, idx) => (
          <ImageListItem key={`image-${idx}`}>
            <img
              src={URL.createObjectURL(blob)}
              loading="lazy"
              alt='title'
            />
          </ImageListItem>
        ))
      }
    </ImageList>
  );
}

function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('dreamshaper');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [samples, setSamples] = useState(1);
  const [sampler, setSampler] = useState('euler');
  const [seed, setSeed] = useState('');
  
  const [createdImages, setCreatedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = {
    ckpt: model,
    w: width,
    h: height,
    samples: samples,
    sampler: sampler,
    seed: seed
  };
   
  async function handleCreateImages() {
    setLoading(true);
    const {imageBlobs, imageDetails} = await SERVICES.doInference(prompt, params);
    setCreatedImages(imageBlobs);
    setLoading(false);
  }

  return (
    <RootContainer>
      <Typography variant='h5'>
        Describe your image with words
      </Typography>
      <TextField
        required
        label='A cool idea ...'
        onChange={e => setPrompt(e.target.value)}
        fullWidth
        sx={{marginY: 1}}
      />
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Grid container direction='row' alignItems='center' spacing={1} justifyContent='align-left'>
            <Grid item>
              <TextField label='Model' onChange={e => setModel(e.target.value)} value={model}/>
            </Grid>
            <Grid item>
              <TextField label='Width' onChange={e => setWidth(e.target.value)} value={width}/>
            </Grid>
            <Grid item>
              <TextField label='Height' onChange={e => setHeight(e.target.value)} value={height}/>
            </Grid>
            <Grid item>
              <TextField label='# of Images to Create' onChange={e => setSamples(e.target.value)} value={samples}/>
            </Grid>
            <Grid item>
              <TextField label='Sampler' onChange={e => setSampler(e.target.value)} value={sampler}/>
            </Grid>
            <Grid item>
              <TextField label='Seed' onChange={e => setSeed(e.target.value)} value={seed}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={handleCreateImages}>
            Create
          </Button>
        </Grid>
      </Grid>
      <Typography variant='h6' hidden={prompt === '' && createdImages.length > 0}>
        {createdImages.length === 0 ? null : `Images for: "${prompt}"`}
      </Typography>
      {loading ? skeleton : <ImagesDisplay createdImages={createdImages}/>}
    </RootContainer>
  );
}

export default CreatePage;
