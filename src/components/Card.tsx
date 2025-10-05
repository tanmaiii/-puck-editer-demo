import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  className = '' 
}) => {
  return (
    <div 
      className={`card ${className} ${onClick ? 'card-clickable' : ''}`}
      onClick={onClick}
    >
      {icon && <div className="card-icon">{icon}</div>}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
