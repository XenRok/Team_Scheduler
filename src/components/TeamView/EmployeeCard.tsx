import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Employee } from '../../types';

interface EmployeeCardProps {
  employee: Employee;
  companyId: string;
  teamId: string;
}

export default function EmployeeCard({
  employee,
  companyId,
  teamId,
}: EmployeeCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `employee-${employee.id}`,
    data: {
      employeeId: employee.id,
      companyId,
      teamId,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white rounded-lg shadow p-4 cursor-move hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center space-x-4">
        <img
          className="h-12 w-12 rounded-full"
          src={employee.avatar}
          alt={employee.name}
        />
        <div>
          <h4 className="text-sm font-medium text-gray-900">{employee.name}</h4>
          <p className="text-sm text-gray-500">{employee.role}</p>
          <p className="text-xs text-gray-400">{employee.email}</p>
        </div>
      </div>
    </div>
  );
}