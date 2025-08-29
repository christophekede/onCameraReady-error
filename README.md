## Summary

On **iOS** (simulator and physical devices), the `onCameraReady` callback from `CameraView` is **never fired**.  
On **Android**, it works fine.

This is critical in apps using a `Provider + Context` flow:
- `CameraProvider` wraps the app and exposes a `takePicture()` method.
- A external component triggers `takePicture()` automatically inside a `useEffect` after some state changes.
- On iOS, `onCameraReady` never fires, so `takePictureAsync` is never called, leaving the promise unresolved.
- This results in ~10k errors/day in production.


## Expected behavior

- When takePicture() is called, `<CameraView>` mounts, `onCameraReady` should fire, then `takePictureAsync` resolves, and finally `<CameraView>` unmounts.

## Actual behavior

- On **iOS**: `onCameraReady` never fires, so `takePictureAsync` is never called.  
- On **Android**: works fine.

## Additional context

- Happens both on **iOS simulator** and **physical iPhone**.  
- Camera permission is granted.  
- The bug only appears when the camera is controlled by context + mounted/unmounted dynamically.  
- In production, this results in ~10k errors/day because the capture promise is never resolved.

