import {
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import IconButton from "@components/icon-button";

import * as S from "./styled";

import { ModalProps } from "./type";

export default function AppModal({ visible, onClose, children }: ModalProps) {
  const theme = useTheme();

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      visible={visible}
      navigationBarTranslucent
      onRequestClose={handleClose}
    >
      <S.Background>
        <S.ModalContent>
          <IconButton onPress={handleClose} style={{ alignSelf: "flex-end" }}>
            <Ionicons name="close" size={28} color={theme.palette.text} />
          </IconButton>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        </S.ModalContent>
      </S.Background>
    </Modal>
  );
}
