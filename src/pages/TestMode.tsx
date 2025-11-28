import React, { useState, useMemo } from 'react';
import { useVocabulary } from '../context/VocabularyContext';
import { CheckCircle, XCircle, RefreshCw, Home, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { VocabularyItem } from '../types';

interface TestResultDetail {
    question: VocabularyItem;
    selectedChoiceId: number;
    isCorrect: boolean;
}

const TestMode: React.FC = () => {
    const { vocabulary, toggleWeakWord, isWeak } = useVocabulary();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Detailed results tracking
    const [results, setResults] = useState<TestResultDetail[]>([]);

    // Range selection state
    const [isStarted, setIsStarted] = useState(false);
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(vocabulary.length);
    const [filteredVocabulary, setFilteredVocabulary] = useState<VocabularyItem[]>([]);

    const handleStart = () => {
        const start = Math.max(1, Math.min(rangeStart, vocabulary.length));
        const end = Math.max(start, Math.min(rangeEnd, vocabulary.length));

        const filtered = vocabulary.filter(item => item.id >= start && item.id <= end);

        if (filtered.length < 4) {
            alert('テストには最低4つの単語が必要です。範囲を広げてください。');
            return;
        }

        setFilteredVocabulary(filtered);
        setCurrentQuestionIndex(0);
        setScore(0);
        setResults([]);
        setShowResult(false);
        setIsStarted(true);
    };

    // Shuffle vocabulary for the test
    const testQuestions = useMemo(() => {
        if (!isStarted || filteredVocabulary.length === 0) return [];
        return [...filteredVocabulary].sort(() => 0.5 - Math.random()).slice(0, 10); // Take 10 random words
    }, [isStarted, filteredVocabulary]);

    const currentQuestion = testQuestions[currentQuestionIndex];

    // Generate choices
    const choices = useMemo(() => {
        if (!currentQuestion) return [];
        const otherWords = filteredVocabulary.filter(w => w.id !== currentQuestion.id);
        const randomDistractors = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
        return [...randomDistractors, currentQuestion].sort(() => 0.5 - Math.random());
    }, [currentQuestion, filteredVocabulary]);

    const handleAnswer = (choiceId: number) => {
        if (selectedAnswer !== null) return; // Prevent multiple clicks

        setSelectedAnswer(choiceId);
        const correct = choiceId === currentQuestion.id;

        if (correct) {
            setScore(prev => prev + 1);
        }

        // Record result
        setResults(prev => [...prev, {
            question: currentQuestion,
            selectedChoiceId: choiceId,
            isCorrect: correct
        }]);

        setTimeout(() => {
            if (currentQuestionIndex < testQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const restartTest = () => {
        setIsStarted(false);
        setSelectedAnswer(null);
        setScore(0);
        setResults([]);
        setCurrentQuestionIndex(0);
        setShowResult(false);
    };

    if (!isStarted) {
        return (
            <div className="test-container">
                <div className="test-header">
                    <h2>テストモード設定</h2>
                </div>
                <div className="range-selector">
                    <p>出題範囲を指定してください（全{vocabulary.length}語）</p>
                    <p className="note">※最低4語以上選択してください</p>
                    <div className="range-inputs">
                        <input
                            type="number"
                            value={rangeStart}
                            onChange={(e) => setRangeStart(Number(e.target.value))}
                            min={1}
                            max={vocabulary.length}
                        />
                        <span>〜</span>
                        <input
                            type="number"
                            value={rangeEnd}
                            onChange={(e) => setRangeEnd(Number(e.target.value))}
                            min={1}
                            max={vocabulary.length}
                        />
                    </div>
                    <button className="start-btn" onClick={handleStart}>
                        テストを開始する
                    </button>
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="test-result-container">
                <div className="result-card">
                    <h2>テスト結果</h2>
                    <div className="score-display">
                        <span className="score-number">{score}</span>
                        <span className="score-total">/ {testQuestions.length}</span>
                    </div>
                    <p className="score-message">
                        {score === testQuestions.length ? '完璧です！素晴らしい！' :
                            score >= testQuestions.length * 0.8 ? 'よくできました！' :
                                'もう少し頑張りましょう！'}
                    </p>

                    <div className="result-list">
                        <h3>回答一覧</h3>
                        {results.map((result, index) => {
                            const isWeakWord = isWeak(result.question.id);
                            return (
                                <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'wrong'}`}>
                                    <div className="result-item-header">
                                        <span className="result-number">Q{index + 1}</span>
                                        <span className="result-status">
                                            {result.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                        </span>
                                    </div>
                                    <div className="result-word-info">
                                        <h4>{result.question.word}</h4>
                                        <p className="result-reading">{result.question.reading}</p>
                                        <p className="result-meaning">{result.question.meaning}</p>
                                    </div>
                                    <button
                                        className={`result-weak-btn ${isWeakWord ? 'active' : ''}`}
                                        onClick={() => toggleWeakWord(result.question.id)}
                                        title={isWeakWord ? "苦手から外す" : "苦手に追加"}
                                    >
                                        <Star size={20} fill={isWeakWord ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="result-actions">
                        <button className="restart-btn" onClick={restartTest}>
                            <RefreshCw /> 設定に戻る
                        </button>
                        <Link to="/" className="home-btn">
                            <Home /> ホームへ戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="test-container">
            <div className="test-header">
                <h2>テストモード</h2>
                <span className="progress-text">
                    問 {currentQuestionIndex + 1} / {testQuestions.length}
                    <span className="range-info"> (No.{filteredVocabulary[0].id}〜{filteredVocabulary[filteredVocabulary.length - 1].id})</span>
                </span>
            </div>

            <div className="question-card">
                <h3 className="question-word">{currentQuestion.word}</h3>
                <p className="question-instruction">正しい意味を選んでください</p>
            </div>

            <div className="choices-grid">
                {choices.map((choice) => {
                    let className = "choice-btn";
                    if (selectedAnswer !== null) {
                        if (choice.id === currentQuestion.id) {
                            className += " correct";
                        } else if (choice.id === selectedAnswer) {
                            className += " wrong";
                        } else {
                            className += " disabled";
                        }
                    }

                    return (
                        <button
                            key={choice.id}
                            className={className}
                            onClick={() => handleAnswer(choice.id)}
                            disabled={selectedAnswer !== null}
                        >
                            {choice.meaning}
                            {selectedAnswer !== null && choice.id === currentQuestion.id && (
                                <CheckCircle className="status-icon" />
                            )}
                            {selectedAnswer !== null && choice.id === selectedAnswer && choice.id !== currentQuestion.id && (
                                <XCircle className="status-icon" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TestMode;
