import React, { useCallback } from 'react';

export interface INavbarAccountMenu {
    anchorEl: null | HTMLElement;
    isOpen: boolean;
    open: (e: any) => void;
    close: (e: any) => void;
}

const useNavbarAccountMenu = (): INavbarAccountMenu => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);

    const open = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), []);
    const close = useCallback(() => setAnchorEl(null), []);

    return {
        anchorEl,
        isOpen,
        open,
        close,
    };
}

export default useNavbarAccountMenu;