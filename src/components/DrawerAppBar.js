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
import { Switch } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

const drawerWidth = 240;
const navItems = ['', 'train', 'create', 'explore'];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function ListItemLink(props) {
  const {primary, to} = props;
  const theme = useTheme();
  return (
    <ListItem component={React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps}/>)}>
      <ListItemText primary={primary.toUpperCase()} sx={{
        color: '#fff',
        backgroundColor: theme.palette.primary.main, 
        textDecoration: 'none' }}/>
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
  const { window, onThemeChange } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        component={React.forwardRef((itemProps, ref) => <Link to={'/'} ref={ref} {...itemProps}/>)}
        variant="h6" 
        sx={{ my: 2, color: theme.palette.primary.main, textDecoration: 'none' }}>
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
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#fff', textDecoration: 'none' }}
            >
                manai project
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => <ButtonLink key={`buttonLink-${index}`} to={`/${item}`} primary={item}/>)}      
            </Box>
            <MaterialUISwitch
              checked={checked}
              onChange={event => {
                const switchState = event.target.checked;
                onThemeChange(switchState);
                setChecked(switchState);
              }}
            />
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
