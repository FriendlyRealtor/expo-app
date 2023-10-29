import { View, Text, Button } from 'native-base';

export const UpgradeBenefitsSection = () => {
  return (
    <View px={8} pt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Why Upgrade to a Paid Plan?
      </Text>
      <Text fontSize="md" mb={2}>
        Unlock the full potential of our app with a paid plan for just $10 per month or $100 per
        year. Here's why it's important:
      </Text>
      <Text fontSize="md" mb={2}>
        - Create and manage unlimited real estate community events.
      </Text>
      <Text fontSize="md" mb={2}>
        - Earn money by hosting events and connecting with the real estate community.
      </Text>
      <Text fontSize="md" mb={2}>
        - Access premium features and tools for event organizers.
      </Text>
      <Text fontSize="md" mb={4}>
        - Priority customer support to assist you in your journey.
      </Text>
      <Button>Upgrade Now</Button>
    </View>
  );
};
