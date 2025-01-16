// src/App.jsx
import React, { useEffect } from 'react';
import Posts from './components/Posts/Posts';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { localStore, toggleDarkMode } from '@/lib/utils';
import './App.css';

function App() {
    useEffect(() => {
        const isDark = localStore.get('darkMode');
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <h1 className="text-2xl font-bold">My Posts App</h1>
                    <div className="flex-1" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDarkMode}
                        className="mr-6"
                    >
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </header>
            <main className="container py-6">
                <Posts />
            </main>
        </div>
    );
}

export default App;