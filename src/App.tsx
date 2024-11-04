import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { useStore } from './store/useStore';
import CompanyCard from './components/TeamView/CompanyCard';
import ScheduleView from './components/Calendar/ScheduleView';

function App() {
  const { companies, moveEmployee } = useStore();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;

    const employeeId = active.data.current?.employeeId;
    const fromCompanyId = active.data.current?.companyId;
    const fromTeamId = active.data.current?.teamId;
    
    const [, toTeamId] = over.id.split('-');
    const toCompanyId = companies.find(c => 
      c.teams.some(t => t.id === toTeamId)
    )?.id;

    if (
      employeeId &&
      fromCompanyId &&
      fromTeamId &&
      toCompanyId &&
      toTeamId &&
      (fromCompanyId !== toCompanyId || fromTeamId !== toTeamId)
    ) {
      moveEmployee(employeeId, fromCompanyId, fromTeamId, toCompanyId, toTeamId);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Teams
                </Link>
                <Link
                  to="/schedule"
                  className="inline-flex items-center px-1 pt-1 ml-8 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Schedule
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <DndContext onDragEnd={handleDragEnd}>
                  <div className="space-y-6">
                    {companies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>
                </DndContext>
              }
            />
            <Route path="/schedule" element={<ScheduleView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;