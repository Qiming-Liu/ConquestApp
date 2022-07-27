/* eslint-disable no-undef */
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Index() {
  console.log(process.env.REACT_APP_CONQUEST_TOKEN);

  return (
    <Page title="Index">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to ConquestApp!
        </Typography>

        <Grid container spacing={3}>
          
        </Grid>
      </Container>
    </Page>
  );
}
