import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

export default function HomePage() {
  return (
    <RootContainer>
      <Container>
        <Typography>
          Humans + AI = !!!
        </Typography>
      </Container>
    </RootContainer>
  )
}