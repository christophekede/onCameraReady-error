import { CameraView } from "expo-camera";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";

export const CameraContext = createContext(undefined);

export const CameraProvider = ({ children }) => {
  const [isCameraActive, setCameraActive] = useState(false);
  const promiseCallbacksRef = useRef(null);
  const cameraRef = useRef(null);

  const [isRefAssigned, setIsRefAssigned] = useState(false);
  const [didFireOnReady, setDidFireOnReady] = useState(false);

  const isCameraReady = isRefAssigned && didFireOnReady;

  const handleCameraRefAssigned = (ref) => {
    cameraRef.current = ref;
    setIsRefAssigned(!!ref);
  };

  const handleCameraReady = () => {
    console.log("✅ onCameraReady fired");
    setDidFireOnReady(true);
  };

  const performCapture = useCallback(async () => {
    if (promiseCallbacksRef.current && cameraRef.current) {
      console.log("test")
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
        if (photo?.uri) {
          promiseCallbacksRef.current.resolve(photo.uri);
        }
      } catch (error) {
        console.error("takePicture error:", error);
        promiseCallbacksRef.current.reject(error);
      } finally {
        promiseCallbacksRef.current = null;
        setCameraActive(false);
        setDidFireOnReady(false);
        setIsRefAssigned(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isCameraActive && isCameraReady) {
      performCapture();
    }
  }, [isCameraActive, isCameraReady, performCapture]);

  const takePicture = useCallback(() => {
    return new Promise((resolve, reject) => {
      promiseCallbacksRef.current = { resolve, reject };
      setCameraActive(true);
    });
  }, []);

  const handleCameraError = (error) => {
    console.error("Camera mount error:", error);
  };

  return (
    <CameraContext.Provider value={{ takePicture, setCameraActive }}>
      {children}
      {isCameraActive && (
        <CameraView
          style={styles.invisibleCamera}
          facing="front"
          ref={handleCameraRefAssigned}
          onCameraReady={handleCameraReady}
          onMountError={handleCameraError}
        />
      )}
    </CameraContext.Provider>
  );
};

const styles = StyleSheet.create({
  invisibleCamera: { flex: 1 },
});
