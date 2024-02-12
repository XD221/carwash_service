import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="h1">
                  404
                </Typography>
                <Typography variant="h6">
                    Esta página no se encuentra disponible.
                </Typography>
                <Button variant="contained" onClick={()=>navigate('/')} >Volver al Inicio</Button>
              </Grid>
              <Grid xs={6}>
                <img
                  src="/images/error-404.jpg"
                  alt="ERROR 404: Página no encontrada"
                  width={500} height={250}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      );
}

export default PageNotFound