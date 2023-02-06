// import {useState} from "react";
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import TitlebarBelowImageList from "../components/ImagesList";


const RootContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
}));

export default function ExplorePage() {
  
  return (
    <RootContainer>
      <Typography>See images created by others</Typography>
      <TitlebarBelowImageList/>
    </RootContainer>
  );
}
