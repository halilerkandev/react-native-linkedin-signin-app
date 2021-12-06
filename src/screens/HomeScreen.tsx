import React from "react";
import { Text, Center, useColorModeValue, Button, Image } from "native-base";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/config";
import { HomeScreenProps } from "@/types";
import { purge } from "@/store";
import { selectUser } from "@/slices/FirebaseSlice";
import { useAppSelector } from "@/hooks";

export const HomeScreen: React.VFC<HomeScreenProps> = ({ navigation }) => {
  const user = useAppSelector(selectUser);

  return (
    <Center flex="1" bg={useColorModeValue("warmGray.50", "coolGray.800")}>
      {user ? (
        <>
          {user.photoURL ? (
            <Image
              size="200px"
              resizeMode={"contain"}
              borderRadius="full"
              mb="3"
              source={{
                uri: user.photoURL,
              }}
              alt="Alternate Text"
            />
          ) : null}
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </>
      ) : null}
      <Button
        onPress={() => {
          purge();
          signOut(auth);
        }}
        mt="10"
      >
        Logout
      </Button>
    </Center>
  );
};
