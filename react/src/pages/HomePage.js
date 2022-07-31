// @mui
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../theme/MinimalComponent/Page';
import CreateRequestCard from '../components/Card/CreateRequestCard';
import ImageAttachCard from '../components/Card/ImageAttachCard';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="HomePage">
      <Container maxWidth="xl">
        <Typography variant="subtitle1" sx={{ mx: 2, mt: 3 }}>
          Hi, Welcome to ConquestApp!
        </Typography>
        <Typography variant="subtitle1" sx={{ mx: 2, my: 3 }}>
          Here you can create a request or attach a image to the request.
        </Typography>

        <Grid container spacing={3}>
          <CreateRequestCard />
          <ImageAttachCard />
        </Grid>

        <Typography variant="subtitle1" sx={{ mx: 2, my: 3 }}>
          In the Navbar on the left, you can view all documents of a request.
        </Typography>
      </Container>
    </Page>
  );
}
