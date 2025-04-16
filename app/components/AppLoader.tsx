import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../../assets/colors";
const AppLoader = () => {
  return <ActivityIndicator size="large" color={colors.indicatorColor} />;
};

export default AppLoader;
