import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { registerWithEmail } from "_services/authService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";

export default function EnterDetailsScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerWithEmail(
        name,
        email,
        password,
        newsletterOptIn,
        isCompany
      );
      router.replace("/main");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <View>
      <Text>Just need some final details</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput value={email} editable={false} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Re-enter Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <CheckBox
        title="I am registering as a company"
        checked={isCompany}
        onPress={() => setIsCompany(!isCompany)}
      />

      <CheckBox
        title="Want to stay up to date with new clubs and events?"
        checked={newsletterOptIn}
        onPress={() => setNewsletterOptIn(!newsletterOptIn)}
      />

      <Button title="Continue" onPress={handleRegister} />
    </View>
  );
}
