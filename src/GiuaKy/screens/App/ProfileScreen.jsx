import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Button,
  Avatar,
  useTheme,
  Appbar,
  Card, // Card is imported but not used, consider removing if not planned
  Divider,
  MD3Colors, // Import MD3Colors for more color options if needed
} from 'react-native-paper';
import {AuthContext} from '../../contexts/AuthContext';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation}) => {
  const theme = useTheme();
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      // Optionally navigate to Auth stack
      // navigation.navigate('Auth'); 
    } catch (error) {
      console.error('Logout error: ', error);
      // It's good practice to inform the user with an Alert
      // Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
      console.warn('Failed to logout.');
    }
  };

  if (!user) {
    return (
      <View style={[styles.loaderContainer, {backgroundColor: theme.colors.background}]}>
        <Text style={{color: theme.colors.onSurface}}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header style={{backgroundColor: theme.colors.surface}}>
        <Appbar.Content title="My Profile" color={theme.colors.onSurface} />
      </Appbar.Header>
      <View style={styles.content}>
        <Avatar.Text
          size={100}
          label={
            user.displayName
              ? user.displayName.substring(0, 2).toUpperCase()
              : user.email
              ? user.email.substring(0, 2).toUpperCase()
              : '??'
          }
          style={[styles.avatar, {backgroundColor: theme.colors.primaryContainer}]}
          labelStyle={{color: theme.colors.onPrimaryContainer, fontSize: 36}}
        />
        <Text variant="headlineSmall" style={[styles.displayName, {color: theme.colors.onSurface}]}>
          {user.displayName || 'Anonymous User'}
        </Text>
        <Text variant="titleMedium" style={[styles.email, {color: theme.colors.onSurfaceVariant}]}>
          {user.email}
        </Text>
        <Text variant="bodySmall" style={[styles.uidText, {color: theme.colors.outline}]}>
          UID: {user.uid}
        </Text>
        <Divider style={[styles.divider, {backgroundColor: theme.colors.outlineVariant}]} />

        {/* Consider adding more profile information or settings here */}
        {/* 
        <Card style={[styles.infoCard, {backgroundColor: theme.colors.surfaceVariant}]}>
          <Card.Title title="Account Settings" titleStyle={{color: theme.colors.onSurfaceVariant}}/>
          <Card.Content>
            <Button onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
            <Button onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
          </Card.Content>
        </Card>
        */}

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, {backgroundColor: theme.colors.errorContainer}]}
          labelStyle={{color: theme.colors.onErrorContainer}}
          icon="logout"
          // color prop on Button is deprecated for mode="contained", use style for backgroundColor
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30, // Keep some top padding
  },
  avatar: {
    marginBottom: 20,
    elevation: 4, // Add some elevation for a subtle shadow
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: 8, // Increased margin
  },
  email: {
    // color: '#555', // Replaced with theme color
    marginBottom: 15,
  },
  uidText: {
    // color: '#777', // Replaced with theme color
    fontSize: 12,
    marginBottom: 25, // Increased margin
  },
  divider: {
    width: '90%', // Make divider slightly wider
    marginVertical: 25, // Increased margin
    height: 1, // Ensure divider is visible
  },
  infoCard: { // Style for the optional Card example
    width: '100%',
    marginBottom: 20,
    elevation: 2,
  },
  logoutButton: {
    marginTop: 30,
    width: '90%', // Make button slightly wider
    paddingVertical: 10, // Increased padding
    borderRadius: 8, // Add border radius
  },
});

export default ProfileScreen;