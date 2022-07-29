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
        <Typography variant="h4" sx={{ mx: 1, mt: 3 }}>
          Hi, Welcome to ConquestApp!
        </Typography>
        <Typography variant="h4" sx={{ mx: 1, mt: 3 }}>
          Here you can create a request or attach a image to the request.
        </Typography>
        <Typography variant="h4" sx={{ mx: 1, mt: 1, mb: 3 }}>
          In the navbar on the left, you can view all documents of a request.
        </Typography>

        <Grid container spacing={3}>
          <CreateRequestCard />
          <ImageAttachCard />
        </Grid>
      </Container>
    </Page>
  );
}
