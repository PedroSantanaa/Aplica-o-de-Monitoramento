import React, { useState } from 'react'
import { api } from '@/api/api'
import {
  Form,
  ImageLabel,
  UploadInput,
  CustomUploadButton,
  CustomUploadContainer,
  SubmitCustomButton,
  DateInImage
} from '@/app/styled-components/Form'
import Image from 'next/image'
import { Success } from '@/app/styled-components/Success'

const UploadImage = () => {
  const [image, setImage] = useState(null)
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [haveDate,setHaveDate] = useState(true)
  const [date,setDate]=useState('')

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
    setSelectedFileName(selectedImage.name);
  }
  const handleDate=async (e)=>{
    if (e.target.value==='Sim'){
      setHaveDate(true)
    }
    else{
      setHaveDate(false)
    }}
  const handleSubmit = async (e) => {
    e.preventDefault()  
    const formData = new FormData()
    formData.append('file', image)
    formData.append('dataResponse', haveDate ? '' : date);
    try {
      await api.post('/registrar/', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Envio bem-sucedido!'); // Define a mensagem de sucesso

      // Limpa o estado após alguns segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <label>Nova Imagem</label>
      <DateInImage>
        <label >Possui Data na Imagem?</label>
        <input type="radio" value={'Sim'} id='Sim' onChange={handleDate} checked={haveDate===true}/>
        <label htmlFor="Sim">Sim</label>
        <input type="radio" value={'Não'} id='Não' onChange={handleDate} checked={haveDate===false} />
        <label htmlFor="Não">Não</label>
      </DateInImage>
      {!haveDate && <input
                      type="text"
                      pattern="\d{4}-\d{2}-\d{2}"
                      placeholder="YYYY-MM-DD"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
} 
      <ImageLabel htmlFor="file-input">
        <Image src={'/upload.svg'} alt="upload" width={100} height={100} />
        {!selectedFileName ? (<p>Escolha a imagem</p>) : (<p>Imagem Escolhida</p>)}
        {selectedFileName && <p>{selectedFileName}</p>}
      </ImageLabel>
      <CustomUploadContainer>
        <UploadInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
        />
        <CustomUploadButton htmlFor="file-input"> Upload </CustomUploadButton>
        <SubmitCustomButton type="submit">Enviar</SubmitCustomButton>
      </CustomUploadContainer>
      {successMessage && <Success>{successMessage}</Success>}
    </Form>
  )

  }
export default UploadImage
