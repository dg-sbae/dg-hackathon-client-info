import styled from 'styled-components';


export const Table = styled.table`
    padding: 1rem;
`;

export const TableHead = styled.th`
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    border: 1px solid black;
`

export const TableRow = styled.tr`
    text-align: center;
    border: 1px solid black;
    margin: 10px;
    
`

export const TableData = styled.td`
    border: 1px solid black;
    &:nth-child(2){
        text-align: left;
    }
`

