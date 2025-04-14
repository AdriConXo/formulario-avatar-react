import { useState } from 'react';

import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Maneja la selección del archivo
  const handleFileChange = (event: any) => {
    console.log("Collo datos ? ",event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };
  // Maneja la subida del archivo
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    console.log('formData ?',formData)
    try {
      setIsUploading(true);
      let obxetoEnviado = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        'http://localhost:8080/profile',
        obxetoEnviado
      );
      const respostaJson = await response.json();

      alert(`Resposta ${respostaJson}`);
    } catch (error) {
      console.error('Error al subir el archivo', error);
      alert('Hubo un error al subir el archivo.');
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <div>
        <h2>Subida de Archivos con React y Hooks</h2>
        <input type="file" name="avatar" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? 'Subiendo...' : 'Subir Archivo'}
        </button>
      </div>
    </>
  );
}

export default App;
