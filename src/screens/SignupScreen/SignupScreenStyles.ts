import { StyleSheet } from 'react-native';
import { Colors } from '../../config';

export const SignupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingHorizontal: 12,
  },
  logo: { width: 175, height: 175 },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'Ubuntu',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
    fontFamily: 'Ubuntu',
  },
  borderlessButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
