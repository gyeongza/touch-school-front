import { ActivityIndicator, View } from 'react-native';

export default function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#333333" />
    </View>
  );
}
