import { useCallback, useState } from 'react';

const useDialogControls = () : [boolean, ()=>void,()=>void]=> {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = useCallback(()=>setIsOpen(true),[]);
  const close = useCallback(()=>setIsOpen(false),[]);

  return [isOpen, open, close]
}

export default useDialogControls;