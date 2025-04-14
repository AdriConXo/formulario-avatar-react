import { useState } from 'react';

import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [withInputs,setInputs] = useState("")
  // Maneja la selección del archivo
  const handleFileChange = (event: any) => {
    console.log("Collo datos ? ",event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };
  const handleInputs = (event:any) =>{
    console.log("event.target.value ",event.target.value)

    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log("withInputs ",withInputs)
  }
  // Maneja la subida del archivo
  const handleUpload = async (e:any) => {
    e.preventDefault()
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    console.log('formData ?',formData)
    console.log("withInputs en Uploada",withInputs)
    for(let datos in withInputs){

      console.log("datos ? ",withInputs[datos])

      formData.append(`${datos}`,withInputs[datos])
    }
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
        <form method="post" onSubmit={handleUpload}>
          <input type='text' name="dato1" placeholder='Introduce dato1' onChange={handleInputs}/>
          <input type='text' name="dato2" placeholder='Introduce dato2' onChange={handleInputs}/>
          <input type="file" name="avatar" onChange={handleFileChange} />
          <button type='submit'>Enviar</button>
          {/* <button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Subiendo...' : 'Subir Archivo'}
          </button> */}
        </form>
        
      </div>
    </>
  );
}

export default App;
