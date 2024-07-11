import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        mode: 'dark', // Ensure dark mode is enabled
        primary: {
          main: '#004d00', // Dark green color
        },
        background: {
          default: '#004d00', // Dark green background
          paper: '#004d00', // Dark green background for paper components
        },
        text: {
          primary: '#ffffff', // White text color
        },
      },
      typography: {
        // You can customize your typography here
      },
});

export default customTheme;