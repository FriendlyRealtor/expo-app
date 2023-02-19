export default function IMGoogleSignInButton({ containerStyle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image
        source={require('../../assets/icons/googlebutton.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}
