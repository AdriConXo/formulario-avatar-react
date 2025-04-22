import { funcionHandleChange, funcionHandleForm } from "../tipos/tiposFuncions";


export default function FormularioRexistroUser(
  {
    handleFileChange,
    handleInputs,
    handleUpload,
    isUploading
  }:{
    handleFileChange: funcionHandleChange;
    handleInputs: funcionHandleChange;
    handleUpload: funcionHandleForm;
    isUploading: boolean
  }){
    return <>
    { <form onSubmit={handleUpload}>
        <input type="text" name="dato1" placeholder="Introduce Nombre" onChange={handleInputs} />
        <input type="text" name="dato2" placeholder="Introduce Apellido" onChange={handleInputs} />
        <input type="file" name="avatar" onChange={handleFileChange} style={{display: 'none'}} />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Subiendo...' : 'Enviar'}
        </button>
      </form> }
    </>
}