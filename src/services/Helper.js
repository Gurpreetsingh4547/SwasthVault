import { Platform } from "react-native";

/**
 * Get the current platform
 * @returns {string} - 'ios' or 'android'
 */
export const GetPlatform = () => {
  return Platform.OS;
};

/**
 * Get value based on platform
 * @param {string} iosValue - Value for iOS
 * @param {string} androidValue - Value for Android
 * @returns {string} - Value based on platform
 */
export const GetValueByPlatform = (iosValue, androidValue) => {
  return GetPlatform() === 'ios' ? iosValue : androidValue;
};