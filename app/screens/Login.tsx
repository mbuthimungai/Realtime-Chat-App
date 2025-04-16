import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../../assets/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppLoader from "../components/AppLoader";
import { AuthStackParamList } from "../navigation/AuthNavigation";

type LoginScreenProps = NativeStackNavigationProp<AuthStackParamList, "Login">;

const { width } = Dimensions.get("window");
const LoginScreen = ({ navigation }: { navigation: LoginScreenProps }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const auth = FIREBASE_AUTH;

  const login = async () => {
    console.log("login");
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err: any) {
      alert(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSecureEntry = (index: number) => {
    setSecureTextEntry((prev) => {
      const newSecureTextEntry = [...prev];
      newSecureTextEntry[index] = !newSecureTextEntry[index];
      return newSecureTextEntry;
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={{ marginBottom: 20, fontStyle: "italic" }}>
        Please enter your credentials to login
      </Text>
      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={secureTextEntry[0]}
        keyboardType="default"
        style={styles.input}
        toggleSecureEntry={() => handleSecureEntry(0)}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("Forgot Password");
        }}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ color: colors.blue }}>Forgot Password?</Text>
      </TouchableOpacity>
      {!loading ? (
        <AppButton
          title="Login"
          onPress={async () => {
            await login();
          }}
          style={styles.button}
        />
      ) : (
        <AppLoader />
      )}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Already have an account? </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: colors.blue, fontWeight: "600" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width - 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 100,
  },
  heading: {
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
});
export default LoginScreen;
