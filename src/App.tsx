import React, { useState } from 'react';
import FormularioRexistroUser from './componentes/FormularioRexistroUser';
import iconoUser from './assets/cuenta.png';
function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selecteURL,setSelectedURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [withInputs, setInputs] = useState<{ [key: string]: string }>({});
 
 

  const cambioImaxen = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    setSelectedURL(URL.createObjectURL(file));
  }
};
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
      console.log("URL.createObjectURL(event.target.files[0])",URL.createObjectURL(event.target.files[0]))
      // AGREGO IMAXEN CONVERTIDA
      setSelectedURL(URL.createObjectURL(event.target.files[0]));
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
    formData.append('avatar', selectedFile);// AQUÍ INTRODUCIMOS O FICHEIRO QUE QUEREMOS ENVIAR

    Object.entries(withInputs).forEach(([key, value]) => {
      console.log("key e value",key,value)
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
    <div className='estilo-wrapper'>
  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
  <img
    src={selecteURL || iconoUser}
    alt="avatar"
    style={{
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      border: '2px solid red',
      objectFit: 'cover',
    }}
  />
  <div style={{ marginTop: '10px', color: 'white' }}>Selecciona unha imaxen</div>
  <input
    type="file"
    className="input-transparente"
    onChange={cambioImaxen}
  />
</label>
      
      {/* <h2>Subida de Archivos con React y Hooks</h2> */}
      <FormularioRexistroUser
       handleFileChange={handleFileChange} 
       handleInputs={handleInputs}
       handleUpload={handleUpload} 
       isUploading={isUploading}/>
      
    </div>
  );
}

export default App;