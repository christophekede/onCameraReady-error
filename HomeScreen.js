import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraContext } from "./CameraContext";

export default  HomeScreen = () => {
  const camera = useContext(CameraContext);

  const handleTakePhoto = async () => {
    try {
      console.log("taking photo...")
      const uri = await camera.takePicture();
      console.log("📸 Photo taken:", uri);
    } catch (err) {
      console.error("❌ takePicture failed:", err);
    }
  };
  
  useEffect(()=>{
    handleTakePhoto()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Minimal Camera Repro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
