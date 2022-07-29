// @mui
import React from 'react';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../theme/component/Page';
import ListDocumentCard from '../components/Card/ListDocumentCard';
// ----------------------------------------------------------------------

export default function DocumentPage() {
  return (
    <Page title="DocumentPage">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mx: 1, mb: 3 }}>
          Here you can list all the documents in a request.
        </Typography>

        <Grid container spacing={3}>
          <ListDocumentCard />
        </Grid>
      </Container>
    </Page>
  );
}
