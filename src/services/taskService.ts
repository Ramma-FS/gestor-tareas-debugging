import type { Task } from '../types/task';

const API_URL = (process.env.EXPO_PUBLIC_API_URL || 'https://api.montenegroariel.com.ar').replace(/\/$/, '');
type ApiTask = { id: number; title: string; description?: string | null; completed?: boolean };
function toTask(record: ApiTask): Task {
  return { id: String(record.id), title: record.title, description: record.description ?? '', completed: record.completed ?? false, priority: 'media' };
}
async function request(path: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  return response;
}
export async function fetchTasks(simulateFailure = false): Promise<Task[]> {
  if (simulateFailure) throw new Error('HTTP 503: servidor temporalmente indisponible (simulado)');
  const records: Task[] = [];
  const limit = 100;
  for (let skip = 0; ; skip += limit) {
    const page: ApiTask[] = await (await request(`/tasks/?skip=${skip}&limit=${limit}`)).json();
    records.push(...page.map(toTask));
    if (page.length < limit) return records;
  }
}
export async function createTask(title: string): Promise<Task> {
  return toTask(await (await request('/tasks/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description: 'Tarea creada durante el taller de debugging.', completed: false }) })).json());
}
export async function updateTask(task: Task): Promise<Task> {
  return toTask(await (await request(`/tasks/${encodeURIComponent(task.id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: task.title, description: task.description, completed: task.completed }) })).json());
}
export async function removeTask(id: string): Promise<void> {
  await request(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
