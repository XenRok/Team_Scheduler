export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  employees: Employee[];
}

export interface Company {
  id: string;
  name: string;
  teams: Team[];
}

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  employeeId: string;
  teamId?: string;
  color?: string;
}