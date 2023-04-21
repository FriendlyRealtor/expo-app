import { StyleSheet } from 'react-native';
import { Colors } from '../../config';

export const TemplateScreenStyles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottieView: {
    width: 200,
    height: 200,
    backgroundColor: Colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 600,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.color1,
  },
  buttonClose: {
    backgroundColor: Colors.color2,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    background: Colors.red,
    color: Colors.white,
    top: 10,
    right: 10,
  },
});
