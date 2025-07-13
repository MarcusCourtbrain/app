import { Redirect } from "expo-router";
import useAuth from "_hooks/useAuth";

export default function Index() {
  const { user } = useAuth();
  console.log(user);

  return <Redirect href={user ? "/main" : "/login"} />;
}
