import {StyleSheet} from 'react-native';
import {Colors} from '../src/config';

export const HomeScreenStyles = StyleSheet.create({
	layout: { flex: 1 },
	layoutContainer: { 	paddingHorizontal: 16,
		paddingVertical: 32,
		borderRadius: 12 },
	layoutCrm: {
		paddingHorizontal: 16,
		paddingVertical: 32,
		borderRadius: 12,
		marginTop: 20,
	},
	keyboard: { paddingHorizontal: 16 },
	card: {
		flex: 1,
		margin: 2,
	},
	crmHeader: { marginTop: 16 },
	search: { color: Colors.primary },
	textArea: {  marginVertical: 15 },
	estimatedValue: {
		textAlign: 'left',
		fontWeight: 'bold',
		padding: 8,
	},
	formattedValue: {
		textAlign: 'left',
		fontWeight: 'bold',
		paddingHorizontal: 8,
	},
	icon: { marginRight: 8 },
	iconFlex: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	hintText: { margin: 2 },
	comparables: { textAlign: 'center' },
	estimateContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	footerContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 8,
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	buttonText: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: '700',
	},
});
