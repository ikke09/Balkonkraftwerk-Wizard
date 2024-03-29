import { Text, FormControl, InputGroup, Input, InputRightAddon } from 'native-base';
import React from 'react';
import { WizardStackScreenProps } from '../../types/types';
import { useUserStateValue } from '../../components/UserContext';
import WizardContainer from '../../components/WizardContainer';
import { Platform } from 'react-native';

export default function UsageScreen({ navigation }: WizardStackScreenProps<'Usage'>) {
  const userContext = useUserStateValue();
  return (
    <WizardContainer
      title="Stromverbrauch"
      continueTo="Investment"
      continueCondition={!!userContext.Consumption.amount && !!userContext.Consumption.price}
      index={6}
      navigation={navigation}
    >
      <FormControl minWidth="80%">
        <FormControl.Label>
          <Text>Wie hoch ist Ihr jährlicher Stromverbrauch?</Text>
        </FormControl.Label>
        <InputGroup>
          <Input
            w="80%"
            size="lg"
            color="secondary.400"
            placeholder="2500"
            value={`${userContext.Consumption.amount || 0}`}
            onChangeText={(text) => {
              userContext.setUserData({
                Consumption: {
                  ...userContext.Consumption,
                  amount: parseInt(text),
                },
              });
            }}
            keyboardType="number-pad"
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />
          <InputRightAddon w="20%" children={'kWh'} />
        </InputGroup>
      </FormControl>
      <FormControl minWidth="80%">
        <FormControl.Label>
          <Text>Wie viel Kostet eine kWh in Cent?</Text>
        </FormControl.Label>
        <InputGroup>
          <Input
            w="80%"
            size="lg"
            color="secondary.400"
            placeholder="40"
            value={`${userContext.Consumption.price || 0}`}
            onChangeText={(text) => {
              userContext.setUserData({
                Consumption: {
                  ...userContext.Consumption,
                  price: parseInt(text),
                },
              });
            }}
            keyboardType="number-pad"
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />
          <InputRightAddon w="20%" children={'ct'} />
        </InputGroup>
      </FormControl>
    </WizardContainer>
  );
}
