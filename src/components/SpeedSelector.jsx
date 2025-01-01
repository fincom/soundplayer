import React from 'react';

const SpeedSelector = ({ value, onChange }) => {
  const speeds = [
    { value: 0.25, label: 'Très lent (0.25x)' },
    { value: 0.5, label: 'Lent (0.5x)' },
    { value: 0.75, label: 'Modéré lent (0.75x)' },
    { value: 1, label: 'Normal (1x)' },
    { value: 1.5, label: 'Rapide (1.5x)' },
    { value: 2, label: 'Très rapide (2x)' },
    { value: 3, label: 'Ultra rapide (3x)' },
    { value: 5, label: 'Maximum (5x)' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <select
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full bg-itunes-button text-itunes-text border-0 rounded-lg p-3
          focus:ring-2 focus:ring-itunes-accent focus:outline-none
          hover:bg-itunes-hover transition-colors"
        aria-label="Sélectionner la vitesse de lecture"
      >
        {speeds.map(speed => (
          <option key={speed.value} value={speed.value}>
            {speed.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpeedSelector;
