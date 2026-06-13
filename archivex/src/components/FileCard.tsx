import type { ReactElement } from 'react';
import { File, Folder, Box, Book, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FileItem, FileItemType } from '../types';

interface FileCardProps {
  item: FileItem;
  onEdit: (item: FileItem) => void;
  onDelete: (id: string) => void;
}

const FileCard = ({ item, onEdit, onDelete }: FileCardProps) => {
  const getTypeIcon = (type: FileItemType): ReactElement => {
    switch (type) {
      case 'folder': return <Folder className="w-5 h-5" />;
      case 'box': return <Box className="w-5 h-5" />;
      case 'binder': return <Book className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="file-card"
    >
      <div className="file-header">
        <div className="file-title">
          <div className="file-type-icon">
            {getTypeIcon(item.type)}
          </div>
          <div className="text-section">
            <h3>{item.name}</h3>
            {item.category && (
              <span className={`file-category cat-${item.category.toLowerCase()}`}>
                {item.category}
              </span>
            )}
          </div>
        </div>
        <div className="file-actions">
          <button 
            onClick={() => onEdit(item)} 
            className="file-action-btn edit"
            title="Edit Item"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            className="file-action-btn delete"
            title="Delete Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="file-details">
        <div className="file-detail">
          <span className="detail-label">Location</span>
          <span className="detail-value">{item.location}</span>
        </div>
        <div className="file-detail">
          <span className="detail-label">Type</span>
          <span className="detail-value">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
        </div>
        <div className="file-detail">
          <span className="detail-label">Added On</span>
          <span className="detail-value">{formatDate(item.dateAdded)}</span>
        </div>
      </div>

      {item.notes && (
        <div className="file-notes">
          <div className="notes-label">Notes</div>
          <div className="notes-value">{item.notes}</div>
        </div>
      )}
    </motion.div>
  );
};

export default FileCard;
