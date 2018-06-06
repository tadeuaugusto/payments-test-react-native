import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter, 
  Platform
} from 'react-native';
// import { PaymentRequest } from 'react-native-payments'; (USING GLOBAL)

var api = {
    getPaymentRequest() {
        console.log('Platform.OS: ', Platform.OS);

        if (window.PaymentRequest) {
          // Use Payment Request API
          console.log('Payment Request API is supported.')
        } else {
          // Fallback to traditional checkout
          console.log('Sorry! Payment Request API is NOT supported.')
          // window.location.href = '/checkout/traditional';
        }

        // Payment Details
        const DETAILS = {
            id: 'id-details-payment',
            displayItems: [
              {
                label: 'Movie Ticket',
                amount: { currency: 'EUR', value: '0.00' }
              }
            ],
            total: {
              label: 'Merchant Name',
              amount: { currency: 'EUR', value: '0.00' }
            }
        };

        let ANDROID_METHOD_DATA = {
            supportedMethods: ['android-pay'],
              data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                currencyCode: 'EUR',
                environment: 'TEST', // defaults to production
                paymentMethodTokenizationParameters: {
                tokenizationType: 'NETWORK_TOKEN',
                parameters: {
                publicKey: 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
              }
            }
          }
        }

        // Options (isn't required)
        let OPTIONS = {};

      // Supported Payment Methods
      let METHOD_DATA = [
        ANDROID_METHOD_DATA,
        // add here other supported payment methods (APPLE_METHOD_DATA, etc..)
      ];

      const pr = new PaymentRequest(METHOD_DATA, DETAILS);
      console.log('LOG: paymentRequest.id **: ', pr.id);
      pr.canMakePayments()
        .then(response => {
          if (response === true) {
            // proceed
            console.log('LOG: canMakePayments() OK')
          } else {
            // something went wrong, e.g. invalid `displayItems` configuration
            // or the device does not run a 
            // recent enough version of the Facebook app
            console.log('LOG: something went wrong =>', response)
          }
        }).catch(error => {
          console.log('LOG: catch(error) => InvalidStateError', error)
          // an error such as `InvalidStateError`
          // if a payment is already in process
        });
      return pr;
      // return fetch(url).then((res) => res.json());
    }
}

module.exports = api;
// https://github.com/naoufal/react-native-payments/blob/master/packages/react-native-payments/examples/stripe/index.ios.js
// https://github.com/xcarpentier/react-native-stripe-api/blob/master/package.json
// https://www.raywenderlich.com/165140/react-native-tutorial-building-ios-android-apps-javascript
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://appdividend.com/2018/03/25/react-native-fetch-example-tutorial/
// https://www.npmjs.com/package/react-native-stripe-checkout
// https://github.com/idehub/react-native-billing
// https://developer.android.com/google/play/billing/billing_testing#billing-testing-static
// https://articles.braintreepayments.com/guides/payment-methods/android-pay
// https://www.youtube.com/watch?v=IuYo009yc8w
// https://github.com/naoufal/react-native-payments/blob/master/packages/react-native-payments/examples/common/handlers/index.js
