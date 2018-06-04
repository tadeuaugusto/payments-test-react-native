/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'; 
// import { PaymentRequest } from 'react-native-payments';

global.PaymentRequest = require('react-native-payments').PaymentRequest;
import api from './utilities/api';

export default class App extends Component {
  constructor() {
        super();
        this.state = {
            myValue: null
        }
    }

    handlePress() {
      api.getPaymentRequest().show().then(paymentResponse => {
        console.log('LOG DE VERIFICACAO: api.getPaymentRequest().show()');
        paymentResponse.complete('success');
      });
      
      /*  
      api.getPaymentRequest().show().then(paymentResponse => {
            this.setState({
                myValue: paymentResponse
            })

            console.log('paymentResponse.complete(success)');
            paymentResponse.complete('success');
        }).catch(err => {
            if (err.code == DOMException.NOT_SUPPORTED_ERR) {
                window.location.href = 'https://www.google.com';
            } else {
                paymentResponse.abort();
                console.log('err.code: ', err);
                this.setState({
                myValue: 'Nok'
            });
            }
        });
      */
    }
    

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Payments!
        </Text>
        <Button title="Google Pay" onPress={this.handlePress.bind(this)}/>
        <Text style={styles.text}>
          {this.state.myValue}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
