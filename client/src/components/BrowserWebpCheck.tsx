import React, { useEffect } from 'react';
import {Tokens} from "../util/Tokens.ts";

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
    const getBrowserVersion = (): string | null => {
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

        return null;
    };


    useEffect(() => {
        const storedBrowserVersion: string | null = localStorage.getItem(Tokens.browserVersion);
        const currentBrowserVersion: string | null = getBrowserVersion();

        function checkWebp() {
            checkWebpSupport().then(isSupported => {
                if (currentBrowserVersion) {
                    localStorage.setItem(Tokens.isSupportedWebp, isSupported ? 'true' : 'false');
                    localStorage.setItem(Tokens.browserVersion, currentBrowserVersion);
                } else {
                    localStorage.setItem(Tokens.isSupportedWebp, 'false');
                    localStorage.setItem(Tokens.browserVersion, "null");
                }
            });
        }

        if (storedBrowserVersion && (storedBrowserVersion !== currentBrowserVersion)) {
            checkWebp()
        } else if (!storedBrowserVersion) {
            checkWebp()
        }
    }, []);

    return <>{children}</>;
};

export default BrowserCheck;
