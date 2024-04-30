import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}>
      <CircularProgress />
    </Grid>
  );
}
