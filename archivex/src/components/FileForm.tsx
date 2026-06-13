import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Plus, Save, X, Type, MapPin, Tag, Calendar, FileText } from 'lucide-react';
import type { FileItem } from '../types';

interface FileFormProps {
  onSubmit: (data: FileItem) => void;
  initialData: FileItem | null;
  onCancel: (() => void) | null;
}

const defaultFormData = (): FileItem => ({
  id: '',
  type: 'file',
  name: '',
  location: '',
  category: '',
  notes: '',
  dateAdded: new Date().toISOString().split('T')[0],
});

const FileForm = ({ onSubmit, initialData, onCancel }: FileFormProps) => {
  const [formData, setFormData] = useState<FileItem>(defaultFormData());

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData());
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData(defaultFormData());
    }
  };

  return (
    <>
      <h2>{initialData ? 'Edit Item' : 'Add New Item'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><Type className="w-4 h-4 mr-1" /> Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="file">File</option>
            <option value="folder">Folder</option>
            <option value="box">Box</option>
            <option value="binder">Binder</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter file/folder name"
            required 
          />
        </div>

        <div className="form-group">
          <label><MapPin className="w-4 h-4 mr-1" /> Location:</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Where is it stored?"
            required 
          />
        </div>

        <div className="form-group">
          <label><Tag className="w-4 h-4 mr-1" /> Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">-- Select Category --</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Financial">Financial</option>
            <option value="Medical">Medical</option>
            <option value="Legal">Legal</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label><Calendar className="w-4 h-4 mr-1" /> Date Added:</label>
          <input 
            type="date" 
            name="dateAdded" 
            value={formData.dateAdded} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label><FileText className="w-4 h-4 mr-1" /> Notes:</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="Additional details (optional)"
          />
        </div>

        <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {initialData ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {initialData ? 'Save Changes' : 'Add Item'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default FileForm;
