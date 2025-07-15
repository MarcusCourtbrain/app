import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { checkIfEmailExists, loginWithEmail } from "_services/authService";
import { useRouter } from "expo-router";

export default function EmailSignupScreen() {
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    const exists = await checkIfEmailExists(email);
    setEmailExists(exists);

    if (!exists) {
      router.push({ pathname: "/login/enterDetails", params: { email } });
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      router.replace("/main");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <View>
      <Text>What's your email?</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      {!emailExists && <Button title="Continue" onPress={handleContinue} />}

      {emailExists && (
        <>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}
