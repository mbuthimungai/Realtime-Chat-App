import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AppTextInput from "../components/AppTextInput";
import App from "../../App";

const { width } = Dimensions.get("window");
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const auth = FIREBASE_AUTH;
  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      return response;
    } catch (err: any) {
      alert(err.message);

      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
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
        secureTextEntry={secureTextEntry}
        keyboardType="default"
        style={styles.input}
        toggleSecureEntry={() => setSecureTextEntry((prev) => !prev)}
      />

      {!loading ? (
        <TouchableOpacity
          onPress={register}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Login</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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
