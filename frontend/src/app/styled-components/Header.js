import styled from 'styled-components'

export const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  color: white;


`
export const SLogo = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  @media(max-width: 425px) {
    font-size: 10px;
  }
  @media(max-width: 320px) {
    h1{
      display: none;
    }
  }
`

export const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  a {
    text-decoration: none;
    color: #abb2bf;
  }
  a.active {
    color: white;
  }
  @media(max-width: 425px) {
    font-size: 10px;
    gap: 10px;
  }
`
