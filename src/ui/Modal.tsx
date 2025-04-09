import styled from "styled-components";
import {
  cloneElement,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick.ts";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface IModal {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const defaultModalContext: IModal = {
  openName: "",
  open: () => {
    console.warn("Modal context used outside provider!");
  },
  close: () => {
    console.warn("Modal context used outside provider!");
  },
};

const ModalContext = createContext<IModal>(defaultModalContext);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface IOpenProps {
  opens: string;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

function Open({ children, opens: opensWindowName }: IOpenProps) {
  const { open } = useContext(ModalContext);
  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      open(opensWindowName);
    },
  });
}

function Window({
  children,
  name,
}: {
  children: React.ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}) {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
