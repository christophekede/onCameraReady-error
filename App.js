import { StyleSheet, Text, View } from 'react-native';
import { CameraProvider } from './CameraContext';
import  HomeScreen  from './HomeScreen';


export default function App() {
  return (
    <CameraProvider>
      <HomeScreen />
    </CameraProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
