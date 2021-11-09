import { useCallback, useState } from 'react';

export interface IDrawer {
    isOpen: boolean;
    open: (e: any) => void;
    close: (e: any) => void;
    toggle: (e: any) => void;
}

const useNavbarDrawer = () : IDrawer => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(()=>setIsOpen(true),[]);
  const close = useCallback(()=>setIsOpen(false),[]);
  const toggle = useCallback(()=>setIsOpen((b)=>!b),[]);

  return {
      isOpen,
      open,
      close,
      toggle
  };
}

export default useNavbarDrawer;