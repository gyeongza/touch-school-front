import React, { useEffect, useRef, useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler } from 'react-native';
import { useWebViewLoader } from '@/hooks/useWebViewLoader';
import LoadingIndicator from '@/components/loading-indicator';

export default function Index() {
  const uri = process.env.EXPO_PUBLIC_URL ?? '';
  const webviewRef = useRef<WebView>(null);

  const { loading, handleLoadStart, handleLoadEnd } = useWebViewLoader();

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
      {loading && <LoadingIndicator />}
      <WebView
        ref={webviewRef}
        source={{ uri: uri }}
        allowsBackForwardNavigationGestures
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </>
  );
}
