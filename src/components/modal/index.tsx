import { Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as S from "./styled";

import { ModalProps } from "./type";

export default function AppModal({ visible, onClose, children }: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      navigationBarTranslucent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <S.Background>
        <S.ModalContent>
          <S.CloseButton onPress={onClose}>
            <Ionicons name="close" size={28} color="black" />
          </S.CloseButton>
          {children}
        </S.ModalContent>
      </S.Background>
    </Modal>
  );
}
