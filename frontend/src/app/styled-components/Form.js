import styled from 'styled-components'

export const Form = styled.form`
  width: 1000px;
  height: 600px;
  padding: 20px;
  background-color: #e9ecef;
  margin: 50px auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;

  label {
    color: black;
    font-size: 35px;
    font-weight: bold;
  }

  @media (max-width: 1440px) {
    width: 80%;
  }

  
`

export const ImageLabel = styled.label`
  border-radius: 20px;
  background-color: #adb5bd;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    font-size: 30px;
    font-weight: bold;
    color: #00000099;
  }

  @media (max-width: 1440px) {
    width: 85%;
    img{
      width: 80%;
    }
    p{
      font-size: 20px;
    }
  }
  @media (max-width: 320px) {
    p{
      font-size: 15px;
    
    }
  }
`

export const UploadInput = styled.input`
  display: none;
`
export const CustomUploadContainer = styled.div`
  display: flex;
  gap: 20px;
`
export const CustomUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  border: 3px solid black;
  padding: 15px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 20px !important;

  @media (max-width: 425px) {
    width: 80%;
  }
`
export const SubmitCustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  border: 3px solid black;
  padding: 15px;
  border-radius: 25px;
  background-color: #343a40;
  color: white;
  font-size: 20px !important;
  cursor: pointer;
  @media (max-width: 425px) {
    width: 80%;
  }
`
export const DateInImage = styled.div`
  display: flex;
  gap: 10px;

  label{
    font-size: 12px;
  }
`