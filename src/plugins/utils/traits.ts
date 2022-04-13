export interface Saveable<T> {
  id?: string;
  onSubmit?: (id: string, params: T) => void;
}

export interface Editable {
  mode: 'read' | 'write';
}
