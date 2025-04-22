import React, { useState } from 'react';
import FormularioRexistroUser from './componentes/FormularioRexistroUser';
import iconoUser from './assets/cuenta.png';
function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selecteURL,setSelectedURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [withInputs, setInputs] = useState<{ [key: string]: string }>({});
 
 

  const cambioImaxen = (event: React.ChangeEvent<HTMLInputElement>) =>{
    if (event.target.files?.[0]) {
     // AGREGO IMAXEN CONVERTIDA
      setSelectedURL(URL.createObjectURL(event.target.files[0]));
    }
  }
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
    <label>
      {
        // ### AGREGO IMAXEN CONVERTIDA
        // SE NON TEÑO IMAXEN --> <div>Ningunha imaxen seleccionada</div>
        selecteURL != null ? <img src={selecteURL} /> : <div><img src={iconoUser}/><div>Selecciona unha imaxen</div></div>
      }
      <input className="input-transparente" type='file' onChange={cambioImaxen} />
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
