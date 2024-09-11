import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Header() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex',justifyContent:'space-between'}} >
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for anything..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: '40%' }}
      />
      

      <Stack direction="row" spacing={2} alignItems="center" >
        <CalendarTodayIcon />
        <ChatIcon  />
        <NotificationsNoneIcon sx={{ color: 'black' }} />
        <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
      
        <div className='me-3'>
          George Allen
          <div style={{ fontSize: '12px' }}>Rajasthan, India</div>
        </div>
      </Stack>
    </div>
  );
}
