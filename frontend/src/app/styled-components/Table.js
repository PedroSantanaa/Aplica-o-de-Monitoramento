const { default: styled } = require("styled-components");

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHead = styled.thead`
  background-color: white;
  color: black;
  text-align: left;
`;

export const TableHeadCell = styled.th`
  padding: 10px;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  color: #abb2bf;
  
`;