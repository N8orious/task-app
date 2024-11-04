import { Task, SubTask, TaskStatus } from '../types/task';

interface ParsedLine {
  content: string;
  indentation: number;
}

export function parseTaskInput(input: string): Task {
  const lines = input.split('\n')
    .map(line => ({
      content: line.trim(),
      indentation: line.search(/\S/)
    }))
    .filter(line => line.content);

  // Get the first line as the main task
  const mainTask = lines[0];
  const task: Task = {
    id: crypto.randomUUID(),
    content: mainTask.content,
    status: 'todo',
    project: 'Default',
    subtasks: [],
    isExpanded: true
  };

  // If there's only one line, return early
  if (lines.length === 1) return task;

  // Find the base indentation level (minimum non-zero indentation)
  const baseIndentation = Math.min(
    ...lines.slice(1)
      .map(line => line.indentation)
      .filter(indent => indent > 0)
  ) || 2; // Default to 2 spaces if no indentation found

  let currentParent: Task | SubTask = task;
  let parentStack: (Task | SubTask)[] = [task];
  let previousIndentLevel = 0;

  // Process remaining lines
  for (let i = 1; i < lines.length; i++) {
    const { content, indentation } = lines[i];
    const indentLevel = Math.floor(indentation / baseIndentation);

    // If no indentation, this is a new main task
    if (indentLevel === 0) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        content,
        status: 'todo',
        project: 'Default',
        subtasks: [],
        isExpanded: true
      };
      return newTask;
    }

    // Handle subtask
    if (indentLevel > previousIndentLevel) {
      parentStack.push(currentParent);
    } else if (indentLevel < previousIndentLevel) {
      for (let j = 0; j < previousIndentLevel - indentLevel; j++) {
        parentStack.pop();
      }
    }

    currentParent = parentStack[parentStack.length - 1];
    const subtask: SubTask = {
      id: crypto.randomUUID(),
      content,
      status: 'todo',
      subtasks: [],
      isExpanded: true
    };

    currentParent.subtasks.push(subtask);
    previousIndentLevel = indentLevel;
  }

  return task;
}