import { StyleSheet } from "react-native";
import { colors } from "_styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Inter",
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#000",
  },
  separator: {
    marginVertical: 20,
  },
});
