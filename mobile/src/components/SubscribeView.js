import React from 'react';
import { useStripe, PaymentSheetError } from '@stripe/stripe-react-native';
import { View, Button, Alert } from 'react-native';

function SubscribeView({ clientSecret, token }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  React.useEffect(() => {
    const initializePaymentSheet = async () => {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        returnURL: 'helo-realtor://payment-sheet',
        allowsDelayedPaymentMethods: true,
        merchantDisplayName: 'Helo Realtor',
      });
      if (error) {
        console.log('Error initializing payment sheet:', error);
      } else {
        console.log('Payment sheet initialized successfully');
      }
    };

    initializePaymentSheet();
  }, [clientSecret, initPaymentSheet]);

  return (
    <View style={{ marginBottom: 100 }}>
      <Button
        title='Subscribe'
        onPress={async () => {
          console.log('Button pressed, presenting payment sheet...');
          const { error } = await presentPaymentSheet();
          if (error) {
            console.log('Error presenting payment sheet:', error);
            if (error.code === PaymentSheetError.Failed) {
              Alert.alert('Payment Failed', error.message);
            } else if (error.code === PaymentSheetError.Canceled) {
              Alert.alert(
                'Payment Canceled',
                'Payment was canceled by the user.'
              );
            } else {
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          } else {
            console.log('Payment sheet presented successfully');
            Alert.alert('Success', 'Payment was successful!');
          }
        }}
      />
    </View>
  );
}

export default SubscribeView;
