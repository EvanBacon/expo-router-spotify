import { Modal as RNModal, ModalProps } from "react-native";

export function Modal(props: ModalProps) {
  // Change the defaults to feel good on iOS.
  return (
    <RNModal animationType="slide" presentationStyle="pageSheet" {...props} />
  );
}
