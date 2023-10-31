import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({} as {theme?: string, toggle?: () => void});

const getFromLocalStorage = () => {
    if(typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme')
    
        return theme || 'light';
    }
}

export const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState(() => getFromLocalStorage())

    const toggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        localStorage.setItem("theme", theme as string);
    }, [theme])


    return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>
}