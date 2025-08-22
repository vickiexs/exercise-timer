import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import Layout from "../../components/layout";
import Button from "../../components/button";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", gap: 40 }}>
        <Button
          label="Simple exercise timer"
          handleOnPress={() => navigation.navigate("SimpleTimer")}
        />
        <Button
          label="Workout plan timer"
          handleOnPress={() => navigation.navigate("Workout")}
        />
      </View>
    </Layout>
  );
}
