import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const NearestScreen = () => {

  return <SafeAreaView style={styles.alignment}>
    <Text style={styles.textStyle}>
      Nearest Screen</Text>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  alignment: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default NearestScreen;
