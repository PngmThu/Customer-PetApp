import React, { Component } from 'react';
import { Button, Text, View, StyleSheet} from 'react-native';
import Notification from './Notification';
export default class Notifications extends React.Component {
  render() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Notification/>
  </View>
  );
  }
}

