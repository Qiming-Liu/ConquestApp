import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    // <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />
    <Box component="img" src="https://github.com/Qiming-Liu/ConquestApp/raw/main/react/public/static/img/conquestlogo.png" sx={{ width: 142, height: 32, ...sx }} />
    
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
