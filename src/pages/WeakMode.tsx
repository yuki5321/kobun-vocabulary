import React from 'react';
import { useVocabulary } from '../context/VocabularyContext';
import { Star, BookOpen, Frown } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeakMode: React.FC = () => {
    const { vocabulary, weakWords, toggleWeakWord } = useVocabulary();

    const weakVocabulary = vocabulary.filter(word => weakWords.includes(word.id));

    if (weakVocabulary.length === 0) {
        return (
            <div className="weak-empty-state">
                <Frown size={64} color="var(--color-text-light)" />
                <h2>苦手な単語はまだありません</h2>
                <p>暗記モードで「苦手に追加」すると<br />ここに表示されます。</p>
                <Link to="/memorize" className="action-btn">
                    <BookOpen /> 暗記モードへ
                </Link>
            </div>
        );
    }

    return (
        <div className="weak-container">
            <div className="weak-header">
                <h2>苦手な単語</h2>
                <span className="count-badge">{weakVocabulary.length}語</span>
            </div>

            <div className="weak-list">
                {weakVocabulary.map((word) => (
                    <div key={word.id} className="weak-card">
                        <div className="weak-card-header">
                            <div>
                                <h3 className="weak-word">{word.word}</h3>
                                <p className="weak-reading">{word.reading}</p>
                            </div>
                            <button
                                className="remove-weak-btn"
                                onClick={() => toggleWeakWord(word.id)}
                                title="苦手から外す"
                            >
                                <Star fill="currentColor" size={24} />
                            </button>
                        </div>
                        <div className="weak-meaning">
                            <p>{word.meaning}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeakMode;
