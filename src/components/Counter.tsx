import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Button from './Button';

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onValueChange
}) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => {
    const newValue = Math.min(count + step, max);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(count - step, min);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className="counter">
      <Button
        variant="outline"
        size="small"
        onClick={decrement}
        disabled={count <= min}
        className="counter-btn"
      >
        <Minus size={16} />
      </Button>
      <span className="counter-value">{count}</span>
      <Button
        variant="outline"
        size="small"
        onClick={increment}
        disabled={count >= max}
        className="counter-btn"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default Counter;
