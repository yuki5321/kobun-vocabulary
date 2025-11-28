import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, AlertCircle } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>古文単語帳</h1>
                    <p className="hero-subtitle">美しく、効率的に。<br />あなたの学習をサポートします。</p>
                </div>
            </div>

            <div className="menu-section">
                <div className="menu-grid">
                    <Link to="/memorize" className="menu-card primary-card">
                        <div className="card-icon">
                            <BookOpen size={32} />
                        </div>
                        <div className="card-content">
                            <h3>暗記モード</h3>
                            <p>単語カードで効率よく学習。<br />覚え方のコツも確認できます。</p>
                        </div>
                    </Link>

                    <Link to="/test" className="menu-card secondary-card">
                        <div className="card-icon">
                            <PenTool size={32} />
                        </div>
                        <div className="card-content">
                            <h3>テストモード</h3>
                            <p>4択クイズで実力を確認。<br />範囲指定も可能です。</p>
                        </div>
                    </Link>

                    <Link to="/weak" className="menu-card accent-card">
                        <div className="card-icon">
                            <AlertCircle size={32} />
                        </div>
                        <div className="card-content">
                            <h3>苦手な単語</h3>
                            <p>チェックした単語を重点的に。<br />苦手を克服しましょう。</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
