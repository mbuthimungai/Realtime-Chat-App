import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import AppTextInput from "../components/AppTextInput";
import colors from "../../assets/colors";
import AppButton from "../components/AppButton";
import { AuthStackParamList } from "../navigation/AuthNavigation";
import AppLoader from "../components/AppLoader";
import { setUser } from "../state/reducers/userReducer";

const { width } = Dimensions.get("window");

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch();
  const register = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        setUser({
          id: response.user.uid,
          email: response.user.email || "",
          name: response.user.displayName || "",
          idToken: await response.user.getIdToken(),
          refreshToken: response.user.refreshToken,
        })
      );
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
      <Text style={styles.heading}>Register</Text>
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
      <AppTextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={secureTextEntry[1]}
        keyboardType="default"
        style={styles.input}
        toggleSecureEntry={() => handleSecureEntry(1)}
      />
      {!loading ? (
        <AppButton
          title="Register"
          onPress={async () => {
            await register();
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
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: colors.blue, fontWeight: "600" }}>Login</Text>
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

export default RegisterScreen;
