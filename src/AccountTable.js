import React from "react";
import { useEffect, useState } from "react";
import { isBefore } from "date-fns";
import axios from "axios"; 
import styled from "styled-components";

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const accountOne = {
    accountNumber: '13413',
    accountName: 'Alexandria Old Town Dental',
    userName: 'mark@curtisgroup.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountTwo = {
    accountNumber: '13793',
    accountName: 'Allure Dentistry ',
    userName: 'Alluredentistry@gmail.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountThree = {
    accountNumber: '13840',
    accountName: 'Cedar Lane Family Dentistry ',
    userName: 'drmir@aol.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountFour = {
    accountNumber: '13501',
    accountName: 'GDC Smiles',
    userName: 'gdcmarketing2019@gmail.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountFive = {
    accountNumber: '14002',
    accountName: 'Gentle Touch Dental Care ',
    userName: 'daniel.babadjanov@gmail.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountSix = {
    accountNumber: '13147',
    accountName: 'Grand Parkway Pediatric Dental ',
    userName: 'drk@gppdental.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountSeven = {
    accountNumber: '11402',
    accountName: 'Lake Ridge Dental Care',
    userName: 'promotions@drkarbasi.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountEight = {
    accountNumber: '13027',
    accountName: 'Pier 210 Dental Group',
    userName: 'info@pier210dental.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountNine = {
    accountNumber: '13992',
    accountName: 'Smile Studio',
    userName: 'drphilra@gmail.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  const accountTen = {
    accountNumber: '12613',
    accountName: 'Visalia Care Dental ',
    userName: 'visaliacaredental@gmail.com',
    totalCalls: 0,
    totalWebforms: 0,
    totalNewPatients: 0,
    filteredNewCalls: 0,
    filteredNewWebForms: 0,
    filteredNewPatients: 0,
  };

  accounts.push(accountOne, accountTwo, accountThree, accountFour, accountFive, accountSix, accountSeven, accountEight, accountNine, accountTen);
  console.log (accounts)

  // THIS IS MOCKING THE AXIOS GET/POST REQUEST FOR THE API DATA THAT IS NEEDED 
  // ONLY MOCK DUMMMY DATA IS USED IN HERE
  // useEffect(() => {
  //   const createAccounts = async () => {
  //     const val = () =>
  //       new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve([sampleData, sampleData2]);
  //         }, 2000);
  //       });
  //     const data = await val();
  //     setAccounts(data);
  //   };
  //   createAccounts();
  // }, []);
  // THIS IS GOING TO RUN THE MOMENT THE APP LOADS 
    const handleRequestClientData = async ()=> { 
      const  {REACT_APP_USERNAME, REACT_APP_PASSWORD} = process.env

      // POST /AdminUsers/Login endpoint to retrieve an authorization token for ADMIN API 
      let adminAccess;
      let authToken;
      let leadInquiryReports;
      try {
        const envVariables = {
          Username: REACT_APP_USERNAME,
          Password: REACT_APP_PASSWORD
        }
        console.log('envVariables', envVariables)
        adminAccess = await axios.post('https://adminapi.doctorgenius.com/prod/AdminUsers/Login',envVariables)
       if(adminAccess){
          const config = {
            headers: { Authorization: `Bearer ${adminAccess.data}` }
          };
          // TODO: BODYPARAMETERS WILL BE ARRAY OF OBJECTS TO ITERATE OVER MULTIPLE EMAILS
          const bodyParameters = {
          Username: "kwdentalcare@gmail.com"
          };
          // POST /AdminUsers/Impersonate endpoint to retrieve an authorization token for PORTAL API
          authToken = await axios.post('https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate',bodyParameters,config);
          console.log('authToken made : ', authToken)
       }
       // GET /LeadInquiryReports endpoint to retrieve all Lead Inquiry Reports for a specific account
       if(authToken){
        console.log('leadInquiryReports is here: ',authToken)
        const leadInquiryReportsToken = {
          headers: { Authorization: `Bearer ${authToken.data}` }
        };
        leadInquiryReports = await axios.get('https://portalapi.doctorgenius.com/prod/LeadInquiryReports' , leadInquiryReportsToken)
        .then(res => {console.log('res :',res, 'Here are the accounts', accounts);})
        .catch((error) => {
          console.log(error)
        });
      }
      }
      catch (err) {
        console.log('error: ', err);
      }
  
    }

  handleRequestClientData();

  useEffect(() => {
    console.log("accounts : ", accounts);
    if (!accounts.length) return;

    // ITERATE OF COMPANIES

    // EACH ITERATION CREATE THESE VARIABLES
    // FOR FITLERED VARIABLES JUST USE 3 MONTHS FOR NOW
    // let totalCalls
    // let totalWebforms
    // let totalNewPatients
    // let totalNewPatients
    // let filteredNewCalls
    // let filteredNewWebForms
    // let filteredNewPatients
    let companies = [];
    accounts.map((account) => {
      console.log('These are the accounts', accounts)
      let accountNumber = account.accountNumber
      let accountName = account.accountName;
      let totalCalls = 0;
      let totalWebforms = 0;
      let totalNewPatients = 0;
      let filteredNewCalls = 0;
      let filteredNewWebForms = 0;
      let filteredNewPatients = 0;
      let reportMonth = 0;
      let reportYear = 0;
      console.log("IM THE account :", account);

      // create a function when the button "3months" is clicked Previous Total will be the value from 3 months ago.
      const d = new Date(reportYear, reportMonth);
      const month = d.getMonth() - 3;
      const threeMonths = isBefore(month, d);
      console.log("threeMonths :", threeMonths);

      accounts.map((valueObj) => {
        totalCalls = totalCalls + valueObj.totalCalls;
        totalWebforms = totalWebforms + valueObj.totalWebforms;
        totalNewPatients = totalNewPatients + valueObj.totalNewPatients;

      });
      console.log("IM THE accountName :", accountName);
      console.log(`IM THE TOTAL CALLS ${totalCalls}`);
      console.log(`IM THE TOTAL Webforms ${totalWebforms}`);
      console.log(`IM THE TOTAL NewPatients ${totalNewPatients}`);
      let company = {
        accountNumber: accountNumber,
        accountName: accountName,
        totalCalls: totalCalls,
        totalWebforms: totalWebforms,
        totalNewPatients: totalNewPatients,
      };
      companies.push(company);
    });
    console.log("companies array : ", companies);
    // NESTED LOOP ITEREATE OVER $vales AND SET VARIABLES ABOVE FOR THAT COMPANY
    setTableRows(companies);
    // ONCE ITERATION OF CURRENT COMPANY IS DONE SET OBJECT AS A ROW IN STATE TABLES ROWS
  }, [accounts]);

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