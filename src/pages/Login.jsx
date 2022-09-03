import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'


export default function Login({ login, user }) {
     const [loginCom, setLoginCom] = useState(true)
     const navigate = useNavigate()
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [name, setName] = useState('')
     const [tel, setTel] = useState('')

     const nameChangeHandler = (e) => {
          setName(e.target.value)
     }
     const telChangeHandler = (e) => {
          setTel(e.target.value)
     }
     const usernameChangeHandler = (e) => {
          setUsername(e.target.value)
     }

     const passwordChangeHandler = (e) => {
          setPassword(e.target.value)
     }

     const loginSubmit = (event) => {
          event.preventDefault();
          axios.post(process.env.REACT_APP_LOGIN, {
               username,
               password
          }).then(res => {
               if (res.data.token) {
                    const { name, email, tel, token } = res.data
                    sessionStorage.setItem('user', JSON.stringify({
                         name, email, tel, token
                    }))
                    login(true)
                    user(name)
                    setTimeout(() => {
                         // navigate('/chat', { replace: true })
                         navigate('/userChat', { replace: true })

                    }, 500)
               } else {
                    alert('Wrong Username/ Password')
               }
          }).catch(err => console.log(err))
     };

     const SignupSubmit = (event) => {
          event.preventDefault();
          console.log({
               name,
               tel,
               email: username,
               password
          });
          axios.post(process.env.REACT_APP_SIGNUP, {
               name,
               tel,
               email: username,
               password
          }).then(res => {
               console.log(res);
          }).catch(err => console.log(err))
     };

     return (
          <Container component="main" maxWidth="xs">
               <Box
                    sx={{
                         marginTop: 8,
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                    }}
               >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                         {loginCom ? 'Sign in' : 'Sign Up'}
                    </Typography>
                    {loginCom && <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Email/ Phone No."
                              name="username"
                              autoComplete="email"
                              value={username}
                              onChange={usernameChangeHandler}
                              autoFocus
                         />
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={password}
                              onChange={passwordChangeHandler}
                         />
                         <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                         >
                              Sign In
                         </Button>
                         <Grid container>
                              {/* CREATE A FORGOT PASSWORD PAGE */}
                              {/* <Grid item xs>
                                   <Link href="#" variant="body2">
                                        Forgot password?
                                   </Link>
                              </Grid> */}
                              <Grid item>
                                   <p className='togglePage' onClick={() => setLoginCom(p => !p)}>
                                        {"Don't have an account? Sign Up"}
                                   </p>
                              </Grid>
                         </Grid>
                    </Box>}

                    {!loginCom && <Box Box component="form" onSubmit={SignupSubmit} noValidate sx={{ mt: 1 }}>
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="name"
                              label="Name"
                              name="name"
                              autoComplete="name"
                              value={name}
                              onChange={nameChangeHandler}
                              autoFocus
                         />
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="tel"
                              label="Phone No."
                              name="tel"
                              autoComplete="tel"
                              value={tel}
                              onChange={telChangeHandler}
                              autoFocus
                         />
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Email/ Phone No."
                              name="username"
                              autoComplete="email"
                              value={username}
                              onChange={usernameChangeHandler}
                              autoFocus
                         />
                         <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={password}
                              onChange={passwordChangeHandler}
                         />
                         <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                         >
                              Sign Up
                         </Button>
                         <Grid container>
                              {/* CREATE A FORGOT PASSWORD PAGE */}
                              {/* <Grid item xs>
                                   <Link href="#" variant="body2">
                                        Forgot password?
                                   </Link>
                              </Grid> */}
                              <Grid item>
                                   <p className='togglePage' onClick={() => setLoginCom(p => !p)}>
                                        {"Have an account? Sign In"}
                                   </p>
                              </Grid>
                         </Grid>
                    </Box>
                    }
               </Box>
          </Container >
     );
}

