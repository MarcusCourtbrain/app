import { JSX } from "react";
import { View, Text } from "react-native";

export default function MainScreen(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Main Screen!</Text>
    </View>
  );
}
