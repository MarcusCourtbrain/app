import { View, Text, TouchableOpacity } from "react-native";
import {
  appleAuth,
  googleSignIn,
  facebookSignIn,
  emailSignIn,
} from "_services/authService";
import styles from "./index.styles";
import { JSX } from "react";

export default function LoginScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to play?</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>

      <TouchableOpacity style={styles.button} onPress={appleAuth}>
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={googleSignIn}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={facebookSignIn}>
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <Text>or</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={emailSignIn}>
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>
    </View>
  );
}
