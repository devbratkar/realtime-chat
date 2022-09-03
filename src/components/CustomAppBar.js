import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
// import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Logout'];

const CustomAppBar = ({ login }) => {
     const navigate = useNavigate()
     const [anchorElNav, setAnchorElNav] = React.useState(null);
     const [anchorElUser, setAnchorElUser] = React.useState(null);

     const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
     };
     const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
     };

     const handleCloseNavMenu = () => {
          setAnchorElNav(null);
     };

     const handleCloseUserMenu = (e) => {
          if (e.target.getAttribute('name') === 'Logout') {
               login(false)
               sessionStorage.removeItem('user')
               navigate('/', { replace: true })
          }
          setAnchorElUser(null);
     };

     return (
          <AppBar position="static" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Container maxWidth="xl">
                    <Toolbar disableGutters>
                         <Typography
                              variant="h6"
                              noWrap
                              component="p"
                              sx={{
                                   mr: 2,
                                   display: 'flex',
                                   flex: '20',
                                   fontFamily: 'monospace',
                                   fontWeight: 700,
                                   letterSpacing: '.3rem',
                                   color: 'inherit',
                                   textDecoration: 'none',
                              }}
                         >
                              MyChat
                         </Typography>
                         <Typography
                              varient="h1"
                              sx={{
                                   mr: 4,
                              }}
                         >
                              {JSON.parse(sessionStorage.getItem('user')).name}
                         </Typography>
                         <Box sx={{ flexGrow: 0, flex: '1', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                   <Avatar />
                              </IconButton>

                              <Menu
                                   sx={{ mt: '45px' }}
                                   id="menu-appbar"
                                   anchorEl={anchorElUser}
                                   anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                   }}
                                   keepMounted
                                   transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                   }}
                                   open={Boolean(anchorElUser)}
                                   onClose={handleCloseUserMenu}
                              >
                                   {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                             <Typography name={setting} textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                   ))}
                              </Menu>
                         </Box>
                    </Toolbar>
               </Container>
          </AppBar >
     );
};
export default CustomAppBar;