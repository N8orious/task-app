export interface SubTask {
  id: string;
  content: string;
  status: TaskStatus;
  subtasks: SubTask[];
  isExpanded: boolean;
  priority?: 'Low' | 'High';
  description?: string;
}

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  project: string;
  subtasks: SubTask[];
  isExpanded: boolean;
  priority?: 'Low' | 'High';
  description?: string;
}

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export type ViewMode = 'status' | 'project';