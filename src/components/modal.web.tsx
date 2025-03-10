import { ModalProps } from "react-native";
import { Drawer } from "vaul";
import modalStyles from "./layout/modal.module.css";

export function Modal(props: ModalProps) {
  return (
    <Drawer.Root
      open={props.visible}
      fadeFromIndex={0}
      // Provide snap points to vaul
      snapPoints={[]}
      // For a "sheet" style, might want to scale background slightly
      shouldScaleBackground={props.presentationStyle !== "formSheet"}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />
        <Drawer.Content
          className={modalStyles.drawerContent}
          style={{ pointerEvents: "none" }}
        >
          <div className={modalStyles.modal}>{props.children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
