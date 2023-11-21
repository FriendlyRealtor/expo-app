import React, { useEffect, useState } from 'react';
import { View, Text, Button, VStack, Badge, Icon } from 'native-base';
import { Colors } from '../../config';
import Purchases from 'react-native-purchases';
import Bugsnag from '@bugsnag/expo';
import { RevenueCatProductIDS } from '../../types';

export const PaymentScreen = (props) => {
  const [rcProducts, setRcProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await Purchases.getProducts(RevenueCatProductIDS);
        setRcProducts(products);
      } catch (error) {
        Bugsnag.notify(error);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = () => {
    Purchases.purchaseProduct(rcProducts[0].identifier);
  };

  return (
    <View flex={1} p={4} backgroundColor={Colors.white}>
      <Text fontSize="xl" mb={4}>
        Membership Options
      </Text>
      <VStack space={4}>
        {props?.route?.params?.isProfessional ? (
          <Badge colorScheme="success" variant="solid" rounded="md" mb={4}>
            <Text color="white">Enrolled in Professional Plan</Text>
          </Badge>
        ) : (
          <Badge colorScheme="warning" variant="subtle" rounded="md" mb={4}>
            <Text>Not Enrolled in a Membership Plan</Text>
          </Badge>
        )}

        {rcProducts.length > 0 && (
          <VStack space={3} mb={5} p={4} bg="white" borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" bold mb={1}>
              {rcProducts[0].title}
            </Text>
            <Text color="gray.600">{rcProducts[0].description}</Text>
            <Text fontSize="xl" fontWeight={700} color="primary.500" mt={2}>
              Price: {rcProducts[0].priceString}
            </Text>
            <Text mt={3} fontWeight="medium">
              Premium Features:
            </Text>
            <VStack space={2} pl={2} alignItems="flex-start">
              <Text>
                <Icon name="check-circle" size="sm" color="green.500" /> Realtor Showings
              </Text>
              <Text>
                <Icon name="check-circle" size="sm" color="green.500" /> MarketPro
              </Text>
              <Text>
                <Icon name="check-circle" size="sm" color="green.500" /> Quick scan business card
              </Text>
            </VStack>
            <Button
              colorScheme="primary"
              mt={4}
              _hover={{ bg: 'primary.600' }}
              onPress={handlePurchase}
            >
              Purchase
            </Button>
            <Text fontSize="xs" mt={4}>
              A {rcProducts[0].priceString} purchase will be applied to your iTunes account at the
              end of the trial or intro on confirmation. Subscriptions automatically renew each
              month unless canceled within 24-hours before the end of the current period. You can
              cancel anytime with your iTunes account settings. Any unused portion of a free trial
              will be forfeited if you purchase a subscription. For more information, see our
              <Text
                color="blue.500"
                onPress={() =>
                  Linking.openURL(
                    'https://app.termly.io/document/terms-and-conditions/22db5147-f672-4e1a-8ce9-0568d1c88332',
                  )
                }
              >
                {' '}
                Terms of Service{' '}
              </Text>
              and
              <Text
                color="blue.500"
                onPress={() =>
                  Linking.openURL(
                    'https://app.termly.io/document/privacy-policy/73841773-0c89-4160-9269-9bc3ba0a4dbd',
                  )
                }
              >
                {' '}
                Privacy Policy
              </Text>
              .
            </Text>
          </VStack>
        )}
      </VStack>
    </View>
  );
};
