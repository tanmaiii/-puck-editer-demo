import React from 'react';
import { User, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <div className="header-actions">
          {user && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <User size={20} />
                )}
              </div>
            </div>
          )}
          <button className="settings-btn">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
