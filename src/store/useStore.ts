import { create } from 'zustand';
import { Company, Employee, Team, Event } from '../types';

interface State {
  companies: Company[];
  events: Event[];
  addCompany: (company: Company) => void;
  addTeam: (companyId: string, team: Team) => void;
  addEmployee: (companyId: string, teamId: string, employee: Employee) => void;
  moveEmployee: (
    employeeId: string,
    fromCompanyId: string,
    fromTeamId: string,
    toCompanyId: string,
    toTeamId: string
  ) => void;
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
}

const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corp',
    teams: [
      {
        id: 'team1',
        name: 'Engineering',
        description: 'Software development team',
        employees: [
          {
            id: 'emp1',
            name: 'John Doe',
            email: 'john@acme.com',
            role: 'Senior Developer',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
          {
            id: 'emp2',
            name: 'Jane Smith',
            email: 'jane@acme.com',
            role: 'Product Manager',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
          },
        ],
      },
      {
        id: 'team2',
        name: 'Design',
        description: 'UI/UX design team',
        employees: [
          {
            id: 'emp3',
            name: 'Mike Johnson',
            email: 'mike@acme.com',
            role: 'UI Designer',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
          },
        ],
      },
    ],
  },
];

const initialEvents: Event[] = [
  {
    id: 'event1',
    title: 'Team Meeting',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    employeeId: 'emp1',
    teamId: 'team1',
    color: '#4f46e5',
  },
];

export const useStore = create<State>((set) => ({
  companies: initialCompanies,
  events: initialEvents,
  
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
    
  addTeam: (companyId, team) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === companyId
          ? { ...company, teams: [...company.teams, team] }
          : company
      ),
    })),
    
  addEmployee: (companyId, teamId, employee) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === companyId
          ? {
              ...company,
              teams: company.teams.map((team) =>
                team.id === teamId
                  ? { ...team, employees: [...team.employees, employee] }
                  : team
              ),
            }
          : company
      ),
    })),
    
  moveEmployee: (employeeId, fromCompanyId, fromTeamId, toCompanyId, toTeamId) =>
    set((state) => {
      let employeeToMove: Employee | null = null;
      
      const updatedCompanies = state.companies.map((company) => {
        if (company.id === fromCompanyId) {
          return {
            ...company,
            teams: company.teams.map((team) => {
              if (team.id === fromTeamId) {
                const [employee] = team.employees.filter((e) => e.id === employeeId);
                employeeToMove = employee;
                return {
                  ...team,
                  employees: team.employees.filter((e) => e.id !== employeeId),
                };
              }
              return team;
            }),
          };
        }
        if (company.id === toCompanyId && employeeToMove) {
          return {
            ...company,
            teams: company.teams.map((team) =>
              team.id === toTeamId
                ? { ...team, employees: [...team.employees, employeeToMove!] }
                : team
            ),
          };
        }
        return company;
      });

      return { companies: updatedCompanies };
    }),
    
  addEvent: (event) =>
    set((state) => ({ events: [...state.events, event] })),
    
  removeEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),
}));