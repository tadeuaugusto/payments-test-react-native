/**
* Builds PaymentRequest for credit cards, but does not show any UI yet.
*
* @return {PaymentRequest} The PaymentRequest oject.
*/
var sampleapi = {


    initPaymentRequest() {

        const methodData = [{
            supportedMethods: ['android-pay'],
            data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                currencyCode: 'USD',
                environment: 'TEST', // defaults to production
                paymentMethodTokenizationParameters: {
                    tokenizationType: 'NETWORK_TOKEN',
                    parameters: {
                        publicKey: 'BO39Rh43UGXMQy5PAWWe7UGWd2a9YRjNLPEEVe+zWIbdIgALcDcnYCuHbmrrzl7h8FZjl6RCzoi5/cDrqXNRVSo='
                        // publicKey: 'your-pubic-key'
                    }
                }
            }
        }];

        let networks = ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay', 'visa', 'mir'];
        let types = ['debit', 'credit', 'prepaid'];
        /*
        let supportedInstruments = [{
            supportedMethods: networks,
        }, {
            supportedMethods: ['basic-card'],
            data: {supportedNetworks: networks, supportedTypes: types},
        }];
        */
        let supportedInstruments = [{
            supportedMethods: networks,
        }, {
            supportedMethods: ['android-pay'],
            data: {
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                currencyCode: 'USD',
                environment: 'TEST', // defaults to production
                paymentMethodTokenizationParameters: {
                    tokenizationType: 'NETWORK_TOKEN',
                    parameters: {
                        publicKey: 'BO39Rh43UGXMQy5PAWWe7UGWd2a9YRjNLPEEVe+zWIbdIgALcDcnYCuHbmrrzl7h8FZjl6RCzoi5/cDrqXNRVSo='
                        // publicKey: 'your-pubic-key'
                    }
                }
            }
        }];

        let details = {
            total: { label: 'Donation', amount: { currency: 'USD', value: '55.00' } },
            displayItems: [
                {
                    label: 'Original donation amount',
                    amount: { currency: 'USD', value: '65.00' },
                },
                {
                    label: 'Friends and family discount',
                    amount: { currency: 'USD', value: '-10.00' },
                }
            ]
        };

        return new PaymentRequest(supportedInstruments, details);
        // return new PaymentRequest(methodData, details);
    },

    /**
    * Simulates processing the payment data on the server.
    *
    * @param {PaymentResponse} instrumentResponse The payment information to
    * process.
    */
    sendPaymentToServer(instrumentResponse) {
        instrumentResponse.complete('success').then(function () {
            console.log("SUUUUUUUUUUUCESSO");
            // document.getElementById('result').innerHTML = instrumentToJsonString(instrumentResponse);
        })
            .catch(function (err) {
                console.log('err.code: ', err);
                // ChromeSamples.setStatus(err);
            });
        /*
        // There's no server-side component of these samples. No transactions are
        // processed and no money exchanged hands. Instantaneous transactions are not
        // realistic. Add a 2 second delay to make it seem more real.
        window.setTimeout(function() {
            instrumentResponse.complete('success').then(function() {
                document.getElementById('result').innerHTML = instrumentToJsonString(instrumentResponse);
            })
            .catch(function(err) {
                ChromeSamples.setStatus(err);
            });
        }, 2000);
        */
    },


    /**
    * Converts the payment instrument into a JSON string.
    *
    * @private
    * @param {PaymentResponse} instrument The instrument to convert.
    * @return {string} The JSON string representation of the instrument.
    */
    instrumentToJsonString(instrument) {
        let details = instrument.details;
        details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
        details.cardSecurityCode = '***';

        return JSON.stringify({
            methodName: instrument.methodName,
            details: details,
        }, undefined, 2);
    },

    isApiSupported() {
        if (window.PaymentRequest) {
            // Use Payment Request API
            console.log('Payment Request API is supported.')
        } else {
            // Fallback to traditional checkout
            console.log('Sorry! Payment Request API is NOT supported.')
            // window.location.href = '/checkout/traditional';
        }
        return true;
    }


}
module.exports = sampleapi;

