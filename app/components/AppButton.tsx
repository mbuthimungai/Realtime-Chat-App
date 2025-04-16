import React from "react";
import { TouchableOpacity, Text, StyleSheet, StyleProp } from "react-native";
import colors from "../../assets/colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<any>;
}
const AppButton: React.FC<AppButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default AppButton;
