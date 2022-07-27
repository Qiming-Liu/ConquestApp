// @mui
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import CreateRequestCard from '../components/Card/CreateRequestCard';
import ImageAttachCard from '../components/Card/ImageAttachCard';

// ----------------------------------------------------------------------

export default function Index() {

  return (
    <Page title="Index">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to ConquestApp!
        </Typography>

        <Grid container spacing={3}>
          <CreateRequestCard />
          <ImageAttachCard />
        </Grid>
      </Container>
    </Page>
  );
}
