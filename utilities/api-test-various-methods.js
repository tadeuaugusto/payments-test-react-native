import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter, 
  Platform,
  Button
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
        const paymentDetails = {
            id: 'details-payment',
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

        // Options (isn't required)
        const options = {};


        // 1. basicCardPaymentMethod1
        const basicCardPaymentMethod1 = {
            supportedMethods: ['basic-card'],
            data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                supportedTypes: ['credit', 'debit']
            },
        };
        // 2. httpGooglePayPaymentMethod2
        const httpGooglePayPaymentMethod2 = {
            supportedMethods: ['https://google.com/pay'],
            data: {
                'environment': 'TEST',
                'apiVersion': 1,
                'allowedPaymentMethods': ['CARD', 'TOKENIZED_CARD'],
                'paymentMethodTokenizationParameters': {
                    'tokenizationType': 'PAYMENT_GATEWAY',
                    // Check with your payment gateway on the parameters to pass.
                    'parameters': {}
                },
                'cardRequirements': {
                    'allowedCardNetworks': ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
                    'billingAddressRequired': true,
                    'billingAddressFormat': 'MIN'
                },
                'phoneNumberRequired': true,
                'emailRequired': true,
                'shippingAddressRequired': true
            },
        };
        // 3. basicCardPaymentMethod3
        const basicCardPaymentMethod3 = {
            id: 'basic-card',
            supportedMethods: ['basic-card'],
            data: {
                supportedNetworks: ['amex', 'discover', 'mastercard', 'visa']
            }
        };
        // 4. httpAndroidPayPaymentMethod4
        const httpAndroidPayPaymentMethod4 = {
          id: 'https://android.com/pay',
          supportedMethods: ['https://android.com/pay'],
          data: {
            //merchant ID obtained from Google that maps to your origin
            merchantId: '02510116604241796260',
            environment: 'TEST',
            // Credit Cards allowed via Android Pay
            allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
            paymentMethodTokenizationParameters: {
              tokenizationType: 'GATEWAY_TOKEN',
              parameters: {
                gateway: 'braintree',
                'braintree:tokenizationKey': 'sandbox_k7zg3zwx_fcj4sbpn823cncnz'
              }
              /*
              parameters: {
                'gateway': 'stripe',
                'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
                'stripe:version': '2016-07-06'
              }
              */
            }
          }
        };
        // 5. httpAndroidPayPaymentMethod5
        const httpAndroidPayPaymentMethod5 = {
            // id: 'ANDROID-pay',
            /*
            supportedMethods: ['android-pay'],
              data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                countryCode: 'US',
                currencyCode: 'USD',
                environment: 'TEST',
                paymentMethodTokenizationParameters: {
                  tokenizationType: 'NETWORK_TOKEN',
                  parameters: {
                    // publicKey: 'BOdoXP+9Aq473SnGwg3JU1aiNpsd9vH2ognq4PtDtlLGa3Kj8TPf+jaQNPyDSkh3JUhiS0KyrrlWhAgNZKHYF2Y='
                  publicKey: 'AIzaSyCsUruOebRCP6l_y3w2kvtrQE39ur916aM'
                  }
                }
              }
            */
            supportedMethods: ['android-pay'],
            // supportedMethods: ['google-pay'],
              data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                currencyCode: 'USD',
                environment: 'TEST', // defaults to production
                paymentMethodTokenizationParameters: {
                  tokenizationType: 'NETWORK_TOKEN',
                  parameters: {
                    // publicKey: 'BO39Rh43UGXMQy5PAWWe7UGWd2a9YRjNLPEEVe+zWIbdIgALcDcnYCuHbmrrzl7h8FZjl6RCzoi5/cDrqXNRVSo='
                    // publicKey: 'your-pubic-key'
                    publicKey: 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
                  }
                }
              }

          }
          // 6. httpApplePayPaymentMethod6
          const httpApplePayPaymentMethod6 = {
            id: 'httpApplePayPaymentMethod6',
            supportedMethods: ['apple-pay'],
            data: {
              merchantIdentifier: 'merchant.com.react-native-payments.naoufal',
              supportedNetworks: ['visa', 'mastercard'],
              countryCode: 'US',
              currencyCode: 'USD',
              paymentMethodTokenizationParameters: {
                parameters: {
                  gateway: 'stripe',
                  'stripe:publishableKey': 'pk_test_eTrjMrHYblUkGZ8Fv4lA3nBq'
                }
              }
            }
          }

        const httpAndroidPayPaymentMethod7 = {
          id: 'ANDROID-pay',
          supportedMethods: ['https://google.com/pay'],
          data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            environment: 'TEST',
            tokenizationType: 'GATEWAY_TOKEN',
              parameters: {
                gateway: 'braintree',
                'braintree:tokenizationKey': 'sandbox_k7zg3zwx_fcj4sbpn823cncnz'
              }
              /*
            paymentMethodTokenizationParameters: {
              tokenizationType: 'NETWORK_TOKEN',
              parameters: {
                publicKey: 'BO39Rh43UGXMQy5PAWWe7UGWd2a9YRjNLPEEVe+zWIbdIgALcDcnYCuHbmrrzl7h8FZjl6RCzoi5/cDrqXNRVSo='
              }
            }
            */
          }
        };



      // Supported Payment Methods
      const METHOD_DATA = [
        // basicCardPaymentMethod1,  // basicCardPaymentMethod1
        // httpGooglePayPaymentMethod2, // ERROR: DOMException: The payment method is not supported
        // basicCardPaymentMethod3, // ERROR: DOMException: The payment method is not supported
        // httpAndroidPayPaymentMethod4, // ERROR: DOMException: The payment method is not supported
        httpAndroidPayPaymentMethod5, // ERROR: Attempt to invoke interface method 'boolean com.facebook.react.bridge.ReadableMap.hasKey(java.lang.String)' on a null object reference
        // httpApplePayPaymentMethod6
        // httpAndroidPayPaymentMethod7, // ERROR: Attempt to invoke interface method 'boolean com.facebook.react.bridge.ReadableMap.hasKey(java.lang.String)' on a null object reference
        
      ];

      const pr = new PaymentRequest(METHOD_DATA, paymentDetails);
      console.log('LOG: paymentRequest.id **: ', pr.id);
      pr.canMakePayments()
        .then(response => {
          if (response === true) {
            // proceed
            console.log('LOG: (canMakePayments())')
          } else {
            // something went wrong, e.g. invalid `displayItems` configuration
            // or the device does not run a 
            // recent enough version of the Facebook app
            console.log('LOG: something went wrong =>', response)
          }

        })
        .catch(error => {
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
//