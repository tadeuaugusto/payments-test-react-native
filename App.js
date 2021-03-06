import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'; 
// import { PaymentRequest } from 'react-native-payments';
// import api from './utilities/api';
// import {hello, platform, prDisplayHandler} from './utilities/helpers';

global.PaymentRequest = require('react-native-payments').PaymentRequest;
import PaymentAPIWrapper from './modules/payment-api';
// import PaymentForm from './modules/payment-custom-form';

export default class App extends Component {
  constructor() {
        super();
        this.state = {
            myValue: null
        }
        // this._cart = new Cart(this._storage, this._cartChanged.bind(this));
        // this._paymentForm = new PaymentForm(this._cart);
        // this._cart = [];
        // this._paymentForm = [];
    
    }

    handlePress() {

      // 1. detect feature
      if (window.PaymentRequest) {
        // call payment-api.js
        console.log('PaymentRequest feature detected!');

        let api = new PaymentAPIWrapper();
        let request = api.initPaymentRequest();
        api.onBuyClicked(request);
        
      } else {
        console.log('PaymentRequest API is not supported..');
        // should call payment-custom-form.js
      }

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
