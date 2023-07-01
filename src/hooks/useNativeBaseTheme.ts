import { extendTheme } from 'native-base';

export const useNativeBaseTheme = () => {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#02FDAA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      amber: {
        400: '#d97706',
      },
    },
    components: {
      Input: {
        defaultProps: {
          borderColor: 'black',
        },
      },
      TextArea: {
        defaultProps: {
          borderColor: 'black',
        },
      },
    },
  });

  return { theme };
};
