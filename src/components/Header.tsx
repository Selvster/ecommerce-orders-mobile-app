import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PRIMARY_COLOR, TEXT_COLOR } from '../constants';

interface HeaderProps {
  title: string; 
  logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>

       <Image
          source={require('../../assets/logo.png')}
          style={styles.headerLogo}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10,  
    marginBottom: 15,
    elevation: 2, 

  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold', 
    flexShrink: 1,
    marginRight: 10, 
    color : PRIMARY_COLOR
  },
  headerLogo: {
    width: 40, 
    height: 40, 
    borderRadius: 20,
    resizeMode: 'contain', 
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 10,
    color: TEXT_COLOR,
  },
});

export default Header;
