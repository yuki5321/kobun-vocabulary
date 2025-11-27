import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { VocabularyItem } from '../types';
import vocabularyData from '../assets/vocabulary.json';

interface VocabularyContextType {
    vocabulary: VocabularyItem[];
    weakWords: number[];
    toggleWeakWord: (id: number) => void;
    isWeak: (id: number) => boolean;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export const VocabularyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vocabulary] = useState<VocabularyItem[]>(vocabularyData);
    const [weakWords, setWeakWords] = useState<number[]>(() => {
        const saved = localStorage.getItem('kobun_weak_words');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('kobun_weak_words', JSON.stringify(weakWords));
    }, [weakWords]);

    const toggleWeakWord = (id: number) => {
        setWeakWords(prev =>
            prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
        );
    };

    const isWeak = (id: number) => weakWords.includes(id);

    return (
        <VocabularyContext.Provider value={{ vocabulary, weakWords, toggleWeakWord, isWeak }}>
            {children}
        </VocabularyContext.Provider>
    );
};

export const useVocabulary = () => {
    const context = useContext(VocabularyContext);
    if (context === undefined) {
        throw new Error('useVocabulary must be used within a VocabularyProvider');
    }
    return context;
};
