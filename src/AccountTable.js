import React from "react";
import { useEffect, useState } from "react";
import { isBefore } from "date-fns";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    margin: auto;
`

const CenteredDiv = styled.div`
    text-align: center;
`

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 0.5em;
    border: 2px solid blue;
    border-radius: 5px;
`

const Header = styled.h1`
    text-align: center;
    padding: 10px;
`

const Table = styled.table`
    padding: 1rem;
    border: 1px solid black;
    border-collapse: collapse;
`;

const TableHead = styled.th`
    border: 1px solid black;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    
`
const TableBody = styled.tbody`
  border: 1px solid black;
`


const TableRow = styled.tr`
    text-align: center;
    margin: 10px;
`
const TableData = styled.td`
    border: 1px solid black;
    &:nth-child(2){
        text-align: left;
    }
`    

const clients = [
  { 
    Username : "visaliacaredental@gmail.com",
    ID: 12613,
    Name: "Visalia Care Dental"
  },
  { 
    Username : "drk@gppdental.com",
    ID: 13147,
    Name: "Grand Parkway Pediatric Dental"
  },
  { 
    Username : "promotions@drkarbasi.com",
    ID: 11402,
    Name: "Lake Ridge Dental Care"
  },{ 
    Username : "gdcmarketing2019@gmail.com",
    ID: 13501,
    Name: "GDC Smiles"
  },{ 
    Username : "mark@curtisgroup.com",
    ID: 13413,
    Name: "Alexandria Old Town Dental"
  },{ 
    Username : "info@pier210dental.com",
    ID: 13027,
    Name: "Pier 210 Dental Group"
  }
];

const impersonateUrl = 'https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate'
const leadInquireReportsUrl = 'https://portalapi.doctorgenius.com/prod/LeadInquiryReports'
const adminAccessUrl = 'https://adminapi.doctorgenius.com/prod/AdminUsers/Login';

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [tableRows, setTableRows] = useState([]);


  useEffect(() => {
    const handleRequestClientData = async ()=> { 
      const  {REACT_APP_USERNAME, REACT_APP_PASSWORD} = process.env
      console.log("process.env", process.env)

      let adminAccess;
      let leadInquiryReports;
      let authToken;
      let allEmailRequest;
      // try {
        const envVariables = {
          Username: REACT_APP_USERNAME,
          Password: REACT_APP_PASSWORD
        }
        adminAccess = await axios.post(adminAccessUrl, envVariables)

       if(adminAccess){
          const config = {
            headers: { Authorization: `Bearer ${adminAccess.data}` }
          };

          try {
            const clientsDataPromises = clients.map( async (client) => {
              const { data: clientToken } = await axios.post(impersonateUrl, { Username: client.Username }, config);
              const {data: leadInquiryData } = await axios.get(leadInquireReportsUrl, { headers: { Authorization: `Bearer ${clientToken}`}});

              return {
                ...client,
                leadInquiryData
              }

            })

            const clientsData = await Promise.all(clientsDataPromises);
            setAccounts(clientsData);
          } catch(err) {
            console.log('error from impersonate request', err);
            return;
          }
       }

      //  if(authToken){
      //     console.log('leadInquiryReports is here: ',authToken)
      //     const leadInquiryReportsToken = {
      //       headers: { Authorization: `Bearer ${authToken.data}` }
      //     };
      //     const { data } = await axios.get('' , leadInquiryReportsToken);

      //     // if (data) {
      //     //   setAccounts([data])
      //     // }
      //     console.log("IM THE DATA", data)
      //   }
    }
    handleRequestClientData();
  }, [])
    


  useEffect(() => {
        let companies = [];

    console.log('Accounts', accounts);
  accounts.map((account)=>{
    console.log('account: ', account)
    let accountNumber = account.ID;
    let accountName = account.Name;
    let totalCalls = 0;
    let totalWebforms = 0;
    let totalNewPatients = 0;
    let filteredNewCalls = 0;
    let filteredNewWebForms = 0;
    let filteredNewPatients = 0;
    let reportMonth = 0;
    let reportYear = 0;

    account.leadInquiryData.$values.map((valueObj) => {
      totalCalls = totalCalls + valueObj.totalCalls;
      totalWebforms = totalWebforms + valueObj.totalWebforms;
      totalNewPatients = totalNewPatients + valueObj.totalNewPatients;
    });

    let company = {
    accountNumber: accountNumber,
    accountName: accountName,
    totalCalls: totalCalls,
    totalWebforms: totalWebforms,
    totalNewPatients: totalNewPatients,
    };
    companies.push(company);
    console.log("companies array : ", companies);
    setTableRows(companies);

  })
}, [accounts]);

  return (

    <Container>
      <CenteredDiv>
        <Header>
          Client Performance Info
        </Header>
      </CenteredDiv>
        <Button /*onClick={3 Months Filter}*/>3 Months</Button>
        <Button /*onClick={6 Months Filter}*/>6 Months</Button>
        <Button /*onClick={9 Months Filter}*/>9 Months</Button>
        <Button /*onClick={12 Months Filter}*/>12 Months</Button>
          <Table>
            <TableBody>
              <TableRow>
                  <TableHead>
                      Account Number
                  </TableHead>
                  <TableHead>
                      Account Name
                  </TableHead>
                  <TableHead>
                      Total New Patients (Current)
                  </TableHead>
                  <TableHead>
                      Total New Patients (Previous)
                  </TableHead>
                  <TableHead>
                      Delta Total (New Patients)
                  </TableHead>
                  <TableHead>
                      % Change (New Patients)
                  </TableHead>
                  <TableHead>
                      Total Calls (Current)
                  </TableHead>
                  <TableHead>
                      Total Calls (Previous)
                  </TableHead>
                  <TableHead>
                      Delta Total (New Calls)
                  </TableHead>
                  <TableHead>
                      % Change (New Calls)
                  </TableHead>
                  <TableHead>
                      Total Web Forms (Current)
                  </TableHead>
                  <TableHead>
                      Total Web Forms (Previous)
                  </TableHead>
                  <TableHead>
                      Delta Total (Total Web Forms)
                  </TableHead>
                  <TableHead>
                      % Change (New Calls)
                  </TableHead>
              </TableRow>
              {console.log("here is the data", tableRows )}

                {tableRows.map((row) => (
                  <TableRow>
                    <TableData>
                      {row.accountNumber}
                    </TableData>
                    <TableData>
                      {row.accountName}
                    </TableData>
                    <TableData>
                      {row.totalNewPatients}
                    </TableData>
                    <TableData>
                      Total New Patients (Previous)
                    </TableData>
                    <TableData>
                      +- New Patients
                    </TableData>
                    <TableData>
                      +- %
                    </TableData>
                    <TableData>
                      {row.totalCalls}
                    </TableData>
                    <TableData>
                      Total Calls (Previous)
                    </TableData>
                    <TableData>
                      +- New Calls
                    </TableData>
                    <TableData>
                      +- %
                    </TableData>
                    <TableData>
                      {row.totalWebforms}
                    </TableData>
                    <TableData>
                      Total Webforms (Previous)
                    </TableData>
                    <TableData>
                      +- New Webforms
                    </TableData>
                    <TableData>
                      +- %
                    </TableData>
                  </TableRow>

                ))}
                </TableBody>
          </Table>
        </Container>
  );
}
 export default AccountTable; 