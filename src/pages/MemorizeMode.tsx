import React, { useState } from 'react';
import { useVocabulary } from '../context/VocabularyContext';
import { ChevronLeft, ChevronRight, RotateCw, Star } from 'lucide-react';
import DrumRollPicker from '../components/DrumRollPicker';

const MemorizeMode: React.FC = () => {
    const { vocabulary, toggleWeakWord, isWeak } = useVocabulary();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Range selection state
    const [isStarted, setIsStarted] = useState(false);
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(vocabulary.length);
    const [filteredVocabulary, setFilteredVocabulary] = useState(vocabulary);

    const handleStart = () => {
        const start = Math.max(1, Math.min(rangeStart, vocabulary.length));
        const end = Math.max(start, Math.min(rangeEnd, vocabulary.length));

        const filtered = vocabulary.filter(item => item.id >= start && item.id <= end);

        if (filtered.length === 0) {
            alert('指定された範囲に単語がありません。');
            return;
        }

        setFilteredVocabulary(filtered);
        setCurrentIndex(0);
        setIsStarted(true);
    };

    if (!isStarted) {
        return (
            <div className="memorize-container">
                <div className="memorize-header">
                    <h2>暗記モード設定</h2>
                </div>
                <div className="range-selector">
                    <p>学習する範囲を指定してください（全{vocabulary.length}語）</p>
                    <div className="range-inputs">
                        <DrumRollPicker
                            min={1}
                            max={vocabulary.length}
                            value={rangeStart}
                            onChange={setRangeStart}
                        />
                        <span>〜</span>
                        <DrumRollPicker
                            min={1}
                            max={vocabulary.length}
                            value={rangeEnd}
                            onChange={setRangeEnd}
                        />
                    </div>
                    <button className="start-btn" onClick={handleStart}>
                        学習を開始する
                    </button>
                </div>
            </div>
        );
    }

    const currentWord = filteredVocabulary[currentIndex];
    const isCurrentWeak = isWeak(currentWord.id);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredVocabulary.length);
        }, 200);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + filteredVocabulary.length) % filteredVocabulary.length);
        }, 200);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="memorize-container">
            <div className="memorize-header">
                <h2>暗記モード</h2>
                <span className="progress-text">
                    {currentIndex + 1} / {filteredVocabulary.length}
                    <span className="range-info"> (No.{filteredVocabulary[0].id}〜{filteredVocabulary[filteredVocabulary.length - 1].id})</span>
                </span>
            </div>

            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <div className="flashcard-inner">
                    <div className="flashcard-front">
                        <div className="word-display">
                            <span className="word-id">No.{currentWord.id}</span>
                            <h3 className="word-text">{currentWord.word}</h3>
                        </div>
                        <div className="card-hint">
                            <RotateCw size={20} /> タップして意味を表示
                        </div>
                    </div>
                    <div className="flashcard-back">
                        <div className="meaning-display">
                            <h4>意味</h4>
                            <p>{currentWord.meaning}</p>
                            {currentWord.example && (
                                <div className="example-box">
                                    <h4>例文</h4>
                                    <p>{currentWord.example}</p>
                                </div>
                            )}
                            {currentWord.memo && (
                                <div className="memo-box">
                                    <h4><span className="memo-icon">💡</span>覚え方のコツ</h4>
                                    <p>{currentWord.memo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={handlePrev}>
                    <ChevronLeft /> 前へ
                </button>

                <button
                    className={`weak-btn ${isCurrentWeak ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWeakWord(currentWord.id);
                    }}
                >
                    <Star fill={isCurrentWeak ? "currentColor" : "none"} />
                    {isCurrentWeak ? '苦手から外す' : '苦手に追加'}
                </button>

                <button className="control-btn" onClick={handleNext}>
                    次へ <ChevronRight />
                </button>
            </div>

            <div className="reset-range">
                <button className="text-btn" onClick={() => setIsStarted(false)}>
                    範囲選択に戻る
                </button>
            </div>
        </div>
    );
};

export default MemorizeMode;
