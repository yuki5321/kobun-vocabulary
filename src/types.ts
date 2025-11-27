export interface VocabularyItem {
    id: number;
    word: string;
    reading: string;
    meaning: string;
    example?: string;
    tags?: string[];
    memo?: string;
}

export interface UserProgress {
    weakWords: number[]; // Array of vocabulary IDs
    testResults: {
        date: string;
        score: number;
        total: number;
    }[];
}
