import React from "react";
import { SafeAreaView } from "react-native";
import { VStack, Center, Button, Heading, Radio } from "native-base";
import { signInWithCustomToken } from "firebase/auth";

import { auth } from "@/firebase/config";
import { createUser } from "@/firebase/callables";
import { RoleSelectionScreenProps } from "@/types";
import { useAppSelector } from "@/hooks";
import {
  selectDisplayName,
  selectID,
  selectEmail,
  selectPhotoURL,
} from "@/slices/LinkedinSlice";

export const RoleSelectionScreen: React.VFC<RoleSelectionScreenProps> = () => {
  const [role, setRole] = React.useState("");
  const ID = useAppSelector(selectID);
  const displayName = useAppSelector(selectDisplayName);
  const email = useAppSelector(selectEmail);
  const photoURL = useAppSelector(selectPhotoURL);

  const handleCreateUser = async () => {
    if (role && ID && displayName && email && photoURL) {
      const createUserResponse = await createUser({
        id: ID,
        displayName,
        photoURL,
        email,
        role,
      });
      if (createUserResponse.data.data && createUserResponse.data.success) {
        await signInWithCustomToken(auth, createUserResponse.data.data.token);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center flex="1">
        <VStack
          space="4"
          alignItems="center"
          justifyContent="center"
          width="90%"
          height="full"
          mx="3"
        >
          <Heading mb="6" size="md">
            Choose Your Role
          </Heading>
          <Radio.Group
            name="roleSelectionGroup"
            defaultValue={role}
            onChange={(value) => {
              setRole(value || "");
            }}
            mb="9"
          >
            <Radio value="employer" size="lg" my="1">
              Employer
            </Radio>
            <Radio value="employee" size="lg" my="1">
              Employee
            </Radio>
          </Radio.Group>
          <Button
            isDisabled={role === ""}
            bg="green.700"
            _text={{
              fontSize: "md",
            }}
            onPress={handleCreateUser}
            width="3/6"
          >
            Ok
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};
