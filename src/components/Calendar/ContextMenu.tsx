import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const colors = [
  '#4f46e5', // indigo
  '#dc2626', // red
  '#16a34a', // green
  '#ca8a04', // yellow
  '#2563eb', // blue
  '#9333ea', // purple
  '#db2777', // pink
  '#ea580c', // orange
  '#0d9488', // teal
  '#475569', // slate
];

export default function ContextMenu({ x, y, onDelete, onColorChange, onClose }: ContextMenuProps) {
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="context-menu fixed bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-50"
      style={{ top: y, left: x }}
    >
      <div className="p-2 border-b border-gray-200">
        <button
          onClick={onDelete}
          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete Event</span>
        </button>
      </div>
      <div className="p-2">
        <div className="text-xs text-gray-500 px-3 mb-2">Event Color</div>
        <div className="grid grid-cols-5 gap-2 px-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className="w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 focus:outline-none"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}