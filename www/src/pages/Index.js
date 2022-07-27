// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function Index() {
  // const theme = useTheme();

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
