import { Search } from 'lucide-react';
import type { FileItemType, SortOption, SearchType, Filters } from '../types';

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (value: SearchType) => void;
  onClearSearch: () => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

const SearchFilter = ({ 
  search, 
  onSearchChange, 
  searchType, 
  onSearchTypeChange,
  onClearSearch,
  filters,
  onFilterChange,
  sort,
  onSortChange
}: SearchFilterProps) => {
  return (
    <>
      <div className="search-input-wrapper">
        <Search className="search-icon w-4 h-4" />
        <input 
          id="search-input"
          type="text" 
          placeholder="Search files or locations..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <select id="search-type" value={searchType} onChange={(e) => onSearchTypeChange(e.target.value as SearchType)}>
        <option value="all">All Fields</option>
        <option value="name">File Name</option>
        <option value="location">Location</option>
      </select>
      <button className="btn btn-secondary" onClick={onClearSearch}>Clear</button>

      {/* Filters */}
      <div className="filter-group" style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
        <select 
          className="btn btn-secondary"
          style={{ padding: '0.5rem' }}
          value={filters.type} 
          onChange={(e) => onFilterChange('type', e.target.value as FileItemType | '')}
        >
          <option value="">All Types</option>
          <option value="file">File</option>
          <option value="folder">Folder</option>
          <option value="box">Box</option>
          <option value="binder">Binder</option>
        </select>
        <select
          className="btn btn-secondary"
          style={{ padding: '0.5rem' }}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="dateAdded-desc">Newest First</option>
          <option value="dateAdded-asc">Oldest First</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </div>
    </>
  );
};

export default SearchFilter;
