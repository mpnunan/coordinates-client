import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <Paper
      elevation={22}
      sx={{
        display: 'flex',
        height: '90vh',
        margin: '5vh 5vw',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          height: '80%',
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
            height: '80%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              height: '80%',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" component="h1">Coordinates</Typography>
            <Button onClick={signIn}>Sign In</Button>
          </Paper>
        </Paper>
      </Paper>
    </Paper>
  );
}

export default Signin;
