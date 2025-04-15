import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [withInputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    Object.entries(withInputs).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setIsUploading(true);
      const response = await fetch('http://localhost:8080/profile', {
        method: 'POST',
        body: formData,
      });

      const respostaJson = await response.json();
      alert(`Resposta: ${JSON.stringify(respostaJson)}`);
    } catch (error) {
      console.error('Error al subir el archivo', error);
      alert('Hubo un error al subir el archivo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Subida de Archivos con React y Hooks</h2>
      <form method="post" onSubmit={handleUpload}>
        <input type="text" name="dato1" placeholder="Introduce dato1" onChange={handleInputs} />
        <input type="text" name="dato2" placeholder="Introduce dato2" onChange={handleInputs} />
        <input type="file" name="avatar" onChange={handleFileChange} />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Subiendo...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default App;
