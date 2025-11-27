import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, AlertCircle } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>古文単語帳</h1>
            <p>美しく、覚えやすく。</p>

            <div className="menu-grid">
                <Link to="/memorize" className="menu-card">
                    <BookOpen size={48} />
                    <span>暗記モード</span>
                </Link>
                <Link to="/test" className="menu-card">
                    <PenTool size={48} />
                    <span>テストモード</span>
                </Link>
                <Link to="/weak" className="menu-card">
                    <AlertCircle size={48} />
                    <span>苦手な単語</span>
                </Link>
            </div>
        </div>
    );
};

export default Home;
