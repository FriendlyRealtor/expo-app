import { Modal, View, Text } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Bugsnag from '@bugsnag/expo';

export const BusinessCard = (props) => {
  const vCardData = `BEGIN:VCARD
											VERSION:3.0
											FN:${props.route.params.currentUser.name}
											EMAIL:${props.route.params.currentUser.emailAddress || props.route.params.user.email}
											TEL:${props.route.params.currentUser.phone || ''}
											TITLE:Real Estate Agent
											END:VCARD`;
  return (
    <Modal isOpen={props.openBusinessCard} onClose={() => props.setOpenBusinessCard(false)}>
      <Modal.Content style={styles.modalContent}>
        <Modal.CloseButton />
        <Modal.Header style={styles.modalHeader}>Business Card</Modal.Header>
        <Modal.Body>
          <View style={styles.cardContainer}>
            {props.route.params.currentUser.photo && (
              <Image
                source={{ uri: props.route.params.currentUser.photo }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 999,
                  borderColor: 'lightgray',
                  borderWidth: 2,
                  overflow: 'hidden',
                  marginBottom: 24,
                }}
              />
            )}
            <View>
              {props.route.params.currentUser.name && (
                <Text
                  style={styles.nameText}
                >{`Name: ${props.route.params.currentUser.name}`}</Text>
              )}
              {(props.route.params.currentUser.emailAddress || props.route.params.user.email) && (
                <Text style={styles.contactText}>{`Email: ${
                  props.route.params.currentUser.emailAddress || props.route.params.user.email
                }`}</Text>
              )}
              {props.route.params.currentUser.phone && (
                <Text
                  style={styles.contactText}
                >{`Phone: ${props.route.params.currentUser.phone}`}</Text>
              )}
              <Text style={styles.contactText}>Title: Real Estate Agent</Text>
            </View>
            <View style={styles.qrCodeContainer}>
              <QRCode value={vCardData} size={200} onError={(error) => Bugsnag.notify(error)} />
            </View>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  modalHeader: {
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
    color: 'white',
  },
  contactText: {
    fontSize: 18,
    marginBottom: 12,
    color: 'white',
  },
  qrCodeContainer: {
    padding: 12,
    marginTop: 96,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
  },
});
