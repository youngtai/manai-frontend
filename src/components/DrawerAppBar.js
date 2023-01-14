import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {Link, Outlet} from "react-router-dom";

const drawerWidth = 240;
const navItems = ['', 'train', 'create', 'explore'];

function ListItemLink(props) {
  const {primary, to} = props;
  return (
    <ListItem component={React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps}/>)}>
      <ListItemText primary={primary.toUpperCase()}/>
    </ListItem>
  )
}

function ButtonLink(props) {
  const {primary, to} = props;
  return (
    <Button 
      component={React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps}/>)}
      sx={{ color: '#fff' }}>
      {primary}
    </Button>
  )
}

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        component={React.forwardRef((itemProps, ref) => <Link to={'/'} ref={ref} {...itemProps}/>)}
        variant="h6" 
        sx={{ my: 2 }}>
        manai project
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => <ListItemLink key={`listItemLink-${index}`} to={`/${item}`} primary={item}/>)}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h5"
                component={React.forwardRef((itemProps, ref) => <Link to={'/'} ref={ref} {...itemProps}/>)}
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                manai project
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => <ButtonLink key={`buttonLink-${index}`} to={`/${item}`} primary={item}/>)}      
            </Box>
            </Toolbar>
        </AppBar>    
        <Box component="nav">
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </Box>
      </Box>
      <Outlet/>
    </>
  );
}

export default DrawerAppBar;
