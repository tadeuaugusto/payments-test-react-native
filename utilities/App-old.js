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
import {hello, platform, prDisplayHandler} from './helpers/helpers';
import PaymentAPIWrapper from './modules/payment-api';
import PaymentForm from './modules/payment-form';

export default class AppOld extends Component {
  constructor() {
        super();
        this.state = {
            myValue: null
        }
        // this._cart = new Cart(this._storage, this._cartChanged.bind(this));
        // this._paymentForm = new PaymentForm(this._cart);
        this._cart = [];
        this._paymentForm = [];
    
    }

    handlePress() {



      if (window.PaymentRequest) {console.log('SIM');} else {console.log('NAO');}
      
      // TODO PAY-3.1 - detect feature
      if (window.PaymentRequest) {
        let api = new PaymentAPIWrapper();
        _promise = api.checkout(this._cart);
      } else {
        this._paymentForm.visible = true;
        _promise = this._paymentForm.checkout(this._cart);
      }
      
      
      
      
      
      api.getPaymentRequest().show().then(paymentResponse => {
      
        if (Platform.OS === 'android') {
          // Fetch PaymentToken
          console.log('1) Payment Response Request Id:', paymentResponse.requestId);
          console.log('2) Payment Response Details:', paymentResponse.details);
          let token = paymentResponse.details.getPaymentToken().then(console.log);
          console.log('3) Payment Response getPaymentToken:', token);
        }

        // console.log('4) paymentResponse.complete(success)', paymentResponse.complete('success'));
        paymentResponse.complete('success');
      })
      .catch(console.warn);
        
      /*
      .then(paymentResponse => {
        console.log('LOG DE VERIFICACAO: api.getPaymentRequest().show()');
        paymentResponse.complete('success');
      });
      */
      
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
          {hello()}
        </Text>
        <Text style={styles.welcome}>
          {platform()}
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
