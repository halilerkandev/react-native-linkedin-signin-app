import React from "react";
import { SafeAreaView } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { Box } from "native-base";

import { LinkedinLoginModalScreenProps } from "@/types";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  selectState,
  setCode,
  selectAuthorizationURI,
} from "@/slices/LinkedinSlice";

const injectedJavaScript: string =
  'document.querySelector("input[type=text]").setAttribute("autocapitalize", "off")';

const getCodeAndStateFromURL = (url: string): Array<string> => {
  const codeAndState = url.split("code=")[1];
  return codeAndState.split("&state=");
};

const getStateFromURL = (url: string): string => {
  return url.split("&state=")[1].split("&scope=")[0];
};

export const LinkedinLoginModalScreen: React.VFC<LinkedinLoginModalScreenProps> =
  ({ navigation }) => {
    const webViewRef = React.useRef<WebView>(null);
    const dispatch = useAppDispatch();
    const state = useAppSelector(selectState);
    const authorizationURI = useAppSelector(selectAuthorizationURI);

    const onNavigationStateChange: (event: WebViewNavigation) => void = async (
      event
    ) => {
      if (event.url.includes("redirect_uri=")) {
        const urlState = getStateFromURL(event.url);
        if (state !== urlState) {
          dispatch(setCode(undefined));
          navigation.goBack();
        }
      }
      if (event.url.includes("code=")) {
        webViewRef.current?.stopLoading();
        const [urlCode, urlState] = getCodeAndStateFromURL(event.url);
        if (state === urlState) {
          dispatch(setCode(urlCode));
        } else {
          dispatch(setCode(undefined));
        }
        navigation.goBack();
      }
      if (event.url.includes("v2/login-cancel")) {
        webViewRef.current?.stopLoading();
        navigation.goBack();
      }
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex="1">
          {authorizationURI !== "" && (
            <WebView
              ref={webViewRef}
              source={{ uri: authorizationURI }}
              startInLoadingState
              onNavigationStateChange={onNavigationStateChange}
              javaScriptEnabled
              domStorageEnabled
              injectedJavaScript={injectedJavaScript}
            />
          )}
        </Box>
      </SafeAreaView>
    );
  };
