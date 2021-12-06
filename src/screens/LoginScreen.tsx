import React from "react";
import { SafeAreaView } from "react-native";
import { Button, VStack, Icon, Center, Heading } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { signInWithCustomToken } from "firebase/auth";

import { auth } from "@/firebase/config";
import { getToken, getUser } from "@/firebase/callables";
import { LoginScreenProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  genState,
  selectCode,
  setID,
  setDisplayName,
  setPhotoURL,
  setEmail,
  setLoading,
  selectIsLoading,
} from "@/slices/LinkedinSlice";
import { fetchAccessToken, fetchMe, fetchEmail } from "@/apis";

export const LoginScreen: React.VFC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const code = useAppSelector(selectCode);
  const isLoading = useAppSelector(selectIsLoading);
  const [me, setMe] = React.useState<{
    ID?: string;
    displayName?: string;
    photoURL?: string;
    email?: string;
  }>({});

  React.useEffect(() => {
    dispatch(genState());
  }, []);

  React.useEffect(() => {
    const checkUser = async (code: string) => {
      dispatch(setLoading(true));
      const { accessToken } = await fetchAccessToken(code);
      const { ID, displayName, photoURL } = await fetchMe(accessToken);
      const { email } = await fetchEmail(accessToken);

      if (ID && displayName && photoURL && email) {
        setMe({
          ID,
          displayName,
          email,
          photoURL,
        });
        const getUserResponse = await getUser({ id: ID });
        if (getUserResponse.data.success && getUserResponse.data.data) {
          const getTokenResponse = await getToken({ id: ID });
          if (getTokenResponse.data.success && getTokenResponse.data.data) {
            console.log("User already exists");
            await signInWithCustomToken(auth, getTokenResponse.data.data.token);
            dispatch(setLoading(false));
          }
        } else {
          dispatch(setID(ID));
          dispatch(setDisplayName(displayName));
          dispatch(setPhotoURL(photoURL));
          dispatch(setEmail(email));
          dispatch(setLoading(false));
          navigation.navigate("RoleSelectionScreen");
        }
      }
    };

    if (code) {
      checkUser(code);
    }
  }, [code]);

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
            Sign In
          </Heading>
          <Button
            isDisabled={
              !!(
                me.ID &&
                me.displayName &&
                me.photoURL &&
                me.email &&
                !isLoading
              )
            }
            isLoading={isLoading}
            bg="linkedin"
            leftIcon={<Icon as={FontAwesome5} name="linkedin-in" size="sm" />}
            _text={{
              fontSize: "md",
            }}
            onPress={() => navigation.navigate("LinkedinLoginModalScreen")}
            width="full"
          >
            Sign in with Linkedin
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};
