// Shared types for the ArchiveX application

export type FileItemType = 'file' | 'folder' | 'box' | 'binder' | 'other';

export type FileCategory =
  | 'Personal'
  | 'Work'
  | 'Financial'
  | 'Medical'
  | 'Legal'
  | 'Education'
  | 'Other'
  | '';

export interface FileItem {
  id: string;
  type: FileItemType;
  name: string;
  location: string;
  category: FileCategory;
  notes: string;
  dateAdded: string;
}

export type SortOption =
  | 'dateAdded-desc'
  | 'dateAdded-asc'
  | 'name-asc'
  | 'name-desc';

export type SearchType = 'all' | 'name' | 'location';

export interface Filters {
  type: FileItemType | '';
  category: FileCategory;
}
