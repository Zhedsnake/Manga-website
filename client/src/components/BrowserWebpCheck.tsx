import React, { useEffect } from 'react';

interface BrowserCheckProps {
    children: React.ReactNode;
}

const BrowserCheck: React.FC<BrowserCheckProps> = ({ children }) => {
    // Функция для проверки поддержки webp
    const checkWebpSupport = (): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            const webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = webP.onerror = function () {
                resolve(webP.height  ===2 ? true : false);
            }
        });
    };

    // Функция для получения версии браузера
    const getBrowserVersion = (): string => {
        const userAgent = navigator.userAgent;

        if (/chrome|chromium|crios/i.test(userAgent)) {
            return userAgent.match(/(?:chrome|crios|chromium)[\/\s](\d+)/i)?.[1] || "Unknown";
        } else if (/firefox|fxios/i.test(userAgent)) {
            return userAgent.match(/(?:firefox|fxios)[\/\s](\d+)/i)?.[1] || "Unknown";
        } else if (/safari/i.test(userAgent)) {
            return userAgent.match(/version\/(\d+)/i)?.[1] || "Unknown";
        } else if (/msie|trident/i.test(userAgent)) {
            return userAgent.match(/(?:msie |rv:)(\d+)/i)?.[1] || "Unknown";
        } else if (/edg/i.test(userAgent)) {
            return userAgent.match(/edg[\/\s](\d+)/i)?.[1] || "Unknown";
        } else if (/yabrowser/i.test(userAgent)) {
            return userAgent.match(/(?:yabrowser)[\/\s](\d+)/i)?.[1] || "Unknown";
        }

        return "Unknown";
    };

    useEffect(() => {
        const storedBrowserVersion = localStorage.getItem('browserVersion');
        const currentBrowserVersion = getBrowserVersion();

        // Если версия браузера изменилась, необходимо заново проверить поддержку webp
        if (storedBrowserVersion && (storedBrowserVersion !== currentBrowserVersion)) {
            checkWebpSupport().then(isSupported => {
                localStorage.setItem('isSupportedWebp', isSupported ? 'true' : 'false');
                localStorage.setItem('browserVersion', currentBrowserVersion);
            });
        } else if (!storedBrowserVersion) {
            checkWebpSupport().then(isSupported => {
                localStorage.setItem('isSupportedWebp', isSupported ? 'true' : 'false');
                localStorage.setItem('browserVersion', currentBrowserVersion);
            });
        }
    }, []);

    return <>{children}</>;
};

export default BrowserCheck;
