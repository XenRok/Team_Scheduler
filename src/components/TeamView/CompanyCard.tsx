import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Company } from '../../types';
import TeamList from './TeamList';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const { setNodeRef } = useDroppable({
    id: `company-${company.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Team
        </button>
      </div>
      
      <div className="space-y-4">
        {company.teams.map((team) => (
          <TeamList key={team.id} companyId={company.id} team={team} />
        ))}
      </div>
    </div>
  );
}