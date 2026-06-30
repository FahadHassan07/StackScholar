// No-op implementation since expo-haptics is not installed
// TODO: Install expo-haptics when a compatible version is available for Expo SDK 54

export const useHaptics = () => {
  const light = () => {
    // No-op: Haptics not available
  };

  const medium = () => {
    // No-op: Haptics not available
  };

  const heavy = () => {
    // No-op: Haptics not available
  };

  const success = () => {
    // No-op: Haptics not available
  };

  const warning = () => {
    // No-op: Haptics not available
  };

  const error = () => {
    // No-op: Haptics not available
  };

  const selection = () => {
    // No-op: Haptics not available
  };

  return {
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
  };
};
