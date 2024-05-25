import React from 'react';
import Modal from 'react-modal';
import '/app/globals.css';
interface AddOrganizationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: ({ name, organisation }: { name: string; organisation: string }) => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState('');
  const [organisation, setSlug] = React.useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName.toLowerCase().replace(/\s+/g, '-'));
    setSlug(newName);
  };

  const handleSubmit = () => {
    onSubmit({ name, organisation });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Organization Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-xl font-bold text-white mb-8">Ajouter Organisation</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-white mb-2" htmlFor="name">
              Nom:
              <input
                id="name"
                type="text"
                value={organisation}
                onChange={handleNameChange}
                className="mt-1 p-2  rounded w-full bg-[#1d1d1d]"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-white font-bold mb-2" htmlFor="slug">
              Slug:
              <input
                id="slug"
                type="text"
                value={name}
                readOnly
                className="mt-1 p-2 rounded w-full bg-[#1d1d1d]"
              />
            </label>
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-400"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-[#1d1d1d] text-white ml-2 px-4 py-2 rounded hover:bg-yellow-400"
            >
              fermer
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddOrganizationModal;
