'use client'

import { SearchInput } from './styled-components/SearchInput'
import { HomePageContainer } from './styled-components/HomePageContainer'
import { useEffect, useState } from 'react'
import { api } from '@/api/api'
import { CountUsers } from './styled-components/CountUsers'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './styled-components/Table'

export default function Home() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users/').then((response) => {
      setUsers(response.data)
    })
  }, [])

  const dadosFiltrados = users.filter(item => {
    return (
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.hora.toLowerCase().includes(search.toLowerCase()) ||
      (item.data && item.data.toLowerCase().includes(search.toLowerCase()))
    );
  });
  return (
    <HomePageContainer>
      <SearchInput placeholder="Search" value={search} onChange={(ev)=>setSearch(ev.target.value)} />
      <CountUsers>
        <h1>Números de Registros</h1>
        <p>{users.length}</p>
      </CountUsers>
      <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Nome</TableHeadCell>
          <TableHeadCell>Hora</TableHeadCell>
          <TableHeadCell>Data</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dadosFiltrados.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.hora}</TableCell>
            <TableCell>{item.data}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </HomePageContainer>
  )
}
