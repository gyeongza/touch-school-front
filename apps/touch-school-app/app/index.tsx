import React, { useEffect, useRef, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler } from 'react-native';

export default function Index() {
  const uri = process.env.EXPO_PUBLIC_API_URL ?? '';
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL ?? '';

  const targetUrl = process.env.NODE_ENV === 'development' ? localUrl : uri;

  const webviewRef = useRef<WebView>(null);

  const onAndroidBackPress = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, [onAndroidBackPress]);

  return (
    <>
      <WebView
        ref={webviewRef}
        source={{ uri: targetUrl }}
        allowsBackForwardNavigationGestures
        startInLoadingState={true}
      />
    </>
  );
}
