/**
 * COMO USAR:
 * importe e use o useContext no seu componente;
 * const { showNotification } = useContext(NotificationContext);
 */

import { notification } from 'antd';
import { createContext, useMemo } from 'react';

interface NotificationContextType {
    showNotification: (
        type: 'success' | 'info' | 'warning' | 'error',
        title: string,
        errorMessage?: string,
        timeInSeconds?: number
    ) => void;
}

export const NotificationContext = createContext<NotificationContextType>(
    {} as NotificationContextType
);

export function NotificationProvider({ children }: { children: any }) {
    const [api, contextHolder] = notification.useNotification();

    const showNotification = (
        type,
        title,
        errorMessage = '',
        timeInSeconds = 3
    ) => {
        api[type]({
            message: title,
            description: errorMessage,
            duration: timeInSeconds
        });
    };

    const contextValue = useMemo(() => ({ showNotification }), []);

    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={contextValue}>
                {children}
            </NotificationContext.Provider>
        </>
    );
}
