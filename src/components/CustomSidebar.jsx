import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


function CustomSidebar({ users }) {
     console.log('users :>> ', users);
     return (
          <Box sx={{ display: 'flex', width: '100%' }}>
               <List>
                    <ListItem >
                         <ListItemText
                              disableTypography
                              sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                              primary={'All Users'}
                         />
                    </ListItem>
                    {users.map((item, i) => (
                         <ListItem key={i} sx={{ width: '100%' }}>
                              <div className='userImage'>
                                   <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' alt='profile' />
                              </div>
                              <div className='usernameList'>
                                   <ListItemText disableTypography primary={item.name} className={'usernameList_name'} />
                                   <ListItemText disableTypography primary={item.email} className='usernameList_email' />
                                   <ListItemText disableTypography primary={item.tel} className='usernameList_email' />

                              </div>
                         </ListItem>
                    ))}
               </List>
          </Box >
     );
}

export default CustomSidebar;
