import { useCallback } from "react";
import { BackHandler } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

/**
 * Hook: navigate back to a given route when hardware back button is pressed
 */
export default function useCustomNavigateOnBack(target: string) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(target);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation, target])
  );
}
