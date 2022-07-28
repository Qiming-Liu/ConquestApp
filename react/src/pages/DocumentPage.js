// @mui
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
import ListDocument from '../components/Card/ListDocument';
// ----------------------------------------------------------------------

export default function DocumentPage() {

  return (
    <Page title="DocumentPage">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Here you can list all the documents in a request.
        </Typography>

        <Grid container spacing={3}>
          <ListDocument />
        </Grid>
      </Container>
    </Page>
  );
}
