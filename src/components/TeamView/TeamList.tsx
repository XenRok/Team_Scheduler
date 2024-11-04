import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Team } from '../../types';
import EmployeeCard from './EmployeeCard';

interface TeamListProps {
  companyId: string;
  team: Team;
}

export default function TeamList({ companyId, team }: TeamListProps) {
  const { setNodeRef } = useDroppable({
    id: `team-${team.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 rounded-md p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Employee
        </button>
      </div>
      
      <p className="text-sm text-gray-500">{team.description}</p>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            companyId={companyId}
            teamId={team.id}
          />
        ))}
      </div>
    </div>
  );
}