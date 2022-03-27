import { createContext } from 'react';

// Context Properties (this is not the state: state is in UIProvider)
interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}


export const UIContext = createContext({} as ContextProps );
