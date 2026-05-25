import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "admin_logged_in";

export const login = async (password: string) => {
  if (password === "0610206799") {
    await AsyncStorage.setItem(KEY, "true");
    return true;
  }
  return false;
};

export const logout = async () => {
  await AsyncStorage.removeItem(KEY);
};

export const isLoggedIn = async () => {
  const value = await AsyncStorage.getItem(KEY);
  return value === "true";
};