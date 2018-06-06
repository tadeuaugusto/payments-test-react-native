import {
  Platform
} from 'react-native';

export function hello() {
    return 'Welcome to React Native Payments!';
}
export function platform() {
    return Platform.OS;
}

function getPlatformTotalLabel(platformOS) {
  return platformOS === 'ios' ? 'Merchant' : 'Total';
}

export function prDisplayHandler(paymentRequest) {

  return paymentRequest
    .show()
    .then(paymentResponse => {
      if (Platform.OS === 'android') {
        // Fetch PaymentToken
        paymentResponse.details.getPaymentToken().then(console.log);
      }

      paymentResponse.complete('success');
    })
    .catch(console.warn);
}

export function executeCanMakePayments(paymentRequest) {

    paymentRequest.canMakePayments()
    .then(canMakePayments => {
        if (canMakePayments) {
        return paymentRequest.show();
        }

        // Show fallback payment method
    });
}