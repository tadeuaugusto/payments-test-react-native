export default class AndroidPayWrapper {

    /**
     * Builds PaymentRequest for Android Pay, but does not show any UI yet. If you
     * encounter issues when running your own copy of this sample, run 'adb logcat |
     * grep Wallet' to see detailed error messages.
     *
     * @return {PaymentRequest} The PaymentRequest object.
     */
    initPaymentRequest() {
        
        console.log('initPaymentRequest()');

        // Options (isn't required)
        let OPTIONS = {};

        console.log('METHOD_DATA: android-pay');
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

        console.log('METHOD_DATA: apple-pay');
        let APPLE_METHOD_DATA = {
            supportedMethods: ['apple-pay'],
            data: {
                // merchantIdentifier: 'merchant.com.react-native-payments.naoufal',
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                countryCode: 'US',
                currencyCode: 'USD'
            }
          }

        console.log('DETAILS: 1.00');
        let DETAILS = {
            total: {label: 'Donation', amount: {currency: 'EUR', value: '1.00'}},
            displayItems: [
            {
                label: 'Original donation amount',
                amount: {currency: 'EUR', value: '1.00'},
            },
            {
                label: 'Friends and family discount',
                amount: {currency: 'EUR', value: '-1.00'},
            },
            ],
        };

        // Supported Payment Methods
        let METHOD_DATA = [
            ANDROID_METHOD_DATA,
            APPLE_METHOD_DATA,
            // add here other supported payment methods (APPLE_METHOD_DATA, etc..)
        ];

        console.log('return new PaymentRequest(METHOD_DATA, DETAILS)');
        return new PaymentRequest(METHOD_DATA, DETAILS);
    }

    /**
     * Invokes PaymentRequest for Android Pay.
     *
     * @param {PaymentRequest} request The PaymentRequest object.
     */
     onBuyClicked(request) {
        console.log('onBuyClicked(request)');

        // request = this.initPaymentRequest();
        request.show().then(paymentResponse => {
            this.sendPaymentToServer(paymentResponse);
        }).catch(err => {
            console.err('request.show() ERROR');
            console.err('err.code: ', err);
            if (err.code == DOMException.NOT_SUPPORTED_ERR) {
                window.location.href = 'https://www.google.com';
            }
        });
    }

    /**
     * Simulates processing the payment data on the server.
     *
     * @param {PaymentResponse} paymentResponse The payment information to
     * process.
     */
     sendPaymentToServer(paymentResponse) {
        // window.setTimeout(function() {
            console.log('...sendPaymentToServer(paymentResponse)');
            let token = paymentResponse.details.getPaymentToken().then(console.log);
            console.log('TOKEN: ', token);
            console.log('----------------');
        // }, 2000);
        console.log('----------------');
        this.instrumentToJsonString(token);
        console.log('----------------');
        this.instrumentToJsonString(paymentResponse);
        console.log('----------------');
        paymentResponse.complete('success');
    }
            
     /**
     * Converts the payment instrument into a JSON string.
     *
     * @param {PaymentResponse} instrument The instrument to convert.
     * @return {string} The JSON string representation of the instrument.
     */
    instrumentToJsonString(instrument) {

        // let details = instrument.details;
        // details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
        // details.cardSecurityCode = '***';



        if (instrument.toJSON) {
            let json = JSON.stringify(instrument, undefined, 2);
            
            console.log(json);
            return json;
        } else {
            let jsonError = JSON.stringify({
            methodName: instrument.methodName,
            details: instrument.details,
            }, undefined, 2);
            
            console.log(jsonError);
            return jsonError;
        }
    }

    
     /*
     sendPaymentToServer2(paymentResponse) {
        console.log('....sendPaymentToServer(paymentResponse)');
        // There's no server-side component of these samples. No transactions are
        // processed and no money exchanged hands. Instantaneous transactions are not
        // realistic. Add a 2 second delay to make it seem more real.
        
        
        window.setTimeout(function() {
            
            paymentResponse.complete('success')
                .then(function() {
                    console.log('THEN');
                    // document.getElementById('result').innerHTML =
                    // instrumentToJsonString(paymentResponse);
                })
                .catch(function(err) {
                    // ChromeSamples.setStatus(err);
                    console.err('request.show() ERROR');
                });
            
        }, 2000);
     }
    */
    
}