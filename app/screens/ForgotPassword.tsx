import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigation";
import colors from "../../assets/colors";
import AppLoader from "../components/AppLoader";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import AppTextInput from "../components/AppTextInput";
import { sendPasswordResetEmail } from "firebase/auth";
import AppButton from "../components/AppButton";

const { width } = Dimensions.get("window");

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;
const ForgotPassword = ({
  navigation,
}: {
  navigation: ForgotPasswordScreenNavigationProp;
}) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;

  const resetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent");
    } catch (err: any) {
      alert(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <AppTextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        secureTextEntry={false}
        style={styles.input}
        keyboardType="email-address"
      />
      {loading ? (
        <AppLoader />
      ) : (
        <AppButton
          title="Send Rest Link"
          onPress={async () => {
            await resetPassword();
            setTimeout(() => {
              navigation.navigate("Login");
            }, 2000);
          }}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: width - 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 100,
  },
  button: {
    width: width - 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
});

export default ForgotPassword;
