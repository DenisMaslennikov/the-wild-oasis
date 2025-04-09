import styled from "styled-components";
import React, {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick.ts";

type position = { x: number; y: number };

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ $position: position | null }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position?.x}px;
  top: ${(props) => props.$position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<{
  openId: number | null;
  close: () => void;
  open: (id: number | null) => void;
  position: position | null;
  setPosition: (position: position | null) => void;
}>({
  openId: null,
  close: () => console.error("Using menu context outside provider"),
  open: () => console.error("Using menu context outside provider"),
  position: null,
  setPosition: () => console.error("Using menu context outside provider"),
});

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<position | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (!openId || openId !== id) open(id);
    else close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: ReactNode }) {
  const { openId, position, close } = useContext(MenusContext);

  const { ref } = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({
  children,
  icon,
  onClick,
  ...args
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onClick" | "children">) {
  const { close } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} {...args}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
