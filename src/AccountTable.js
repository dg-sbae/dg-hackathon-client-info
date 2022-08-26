import React, { useEffect, useState } from 'react';
import {
  isAfter, format, subMonths, parseISO,
} from 'date-fns';
import axios from 'axios';
import styled from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
    width: 90%;
    margin: auto;
`;

const CenteredDiv = styled.div`
    text-align: center;
`;

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 0.5em;
    border-radius: 1em;
    color: white;
    background-color:#047bc7;
`;

const Header = styled.h1`
    text-align: center;
    padding: 10px;
    color: white;
    background-color:#047bc7;
    margin:auto;
`;

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
    
`;
const TableBody = styled.tbody`
  border: 1px solid black;
`;

const TableRow = styled.tr`
    text-align: center;
    margin: 10px;
`;
const TableData = styled.td`
    border: 1px solid black;
    &:nth-child(2){
        text-align: left;
    }
`;

const clients = [
  {
    Username: 'visaliacaredental@gmail.com',
    ID: 12613,
    Name: 'Visalia Care Dental',
  },
  {
    Username: 'drk@gppdental.com',
    ID: 13147,
    Name: 'Grand Parkway Pediatric Dental',
  },
  {
    Username: 'promotions@drkarbasi.com',
    ID: 11402,
    Name: 'Lake Ridge Dental Care',
  },
  {
    Username: 'gdcmarketing2019@gmail.com',
    ID: 13501,
    Name: 'GDC Smiles',
  },
  {
    Username: 'mark@curtisgroup.com',
    ID: 13413,
    Name: 'Alexandria Old Town Dental',
  },
  {
    Username: 'info@pier210dental.com',
    ID: 13027,
    Name: 'Pier 210 Dental Group',
  },
  {
    Username: 'daniel.babadjanov@gmail.com',
    ID: 14002,
    Name: 'Gentle Touch Dental Care',
  },
  {
    Username: 'drphilra@gmail.com',
    ID: 13992,
    Name: 'Smile Studio',
  },
  {
    Username: 'drmir@aol.com',
    ID: 13840,
    Name: 'Cedar Lane Family Dentistry',
  },
  {
    Username: 'Alluredentistry@gmail.com',
    ID: 13793,
    Name: 'Allure Dentistry',
  },
];

const impersonateUrl = 'https://adminapi.doctorgenius.com/prod/AdminUsers/Impersonate';
const leadInquireReportsUrl = 'https://portalapi.doctorgenius.com/prod/LeadInquiryReports';
const adminAccessUrl = 'https://adminapi.doctorgenius.com/prod/AdminUsers/Login';

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    const handleRequestClientData = async () => {
      const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;

      let leadInquiryReports;
      let authToken;
      let allEmailRequest;
      // try {
      const envVariables = {
        Username: REACT_APP_USERNAME,
        Password: REACT_APP_PASSWORD,
      };
      const adminAccess = await axios.post(adminAccessUrl, envVariables);

      if (adminAccess) {
        const config = {
          headers: { Authorization: `Bearer ${adminAccess.data}` },
        };

        try {
          const clientsDataPromises = clients.map(async (client) => {
            const { data: clientToken } = await axios.post(impersonateUrl, { Username: client.Username }, config);
            const { data: leadInquiryData } = await axios.get(leadInquireReportsUrl, { headers: { Authorization: `Bearer ${clientToken}` } });

            return {
              ...client,
              leadInquiryData,
            };
          });

          const clientsData = await Promise.all(clientsDataPromises);
          setAccounts(clientsData);
        } catch (err) {
          console.log('error from impersonate request', err);
        }
      }
    };
    handleRequestClientData();
  }, []);

  const getCompaniesData = (filteredMonthTimeFrame) => {
    const companies = [];
    const monthsPriorDate = subMonths(Date.now(), parseInt(filteredMonthTimeFrame, 10));

    accounts.forEach((account) => {
      const accountNumber = account.ID;
      const accountName = account.Name;
      let totalCalls = 0;
      let totalWebforms = 0;
      let totalNewPatients = 0;
      let filteredTotalCalls = 0;
      let filteredTotalWebForms = 0;
      let filteredTotalPatients = 0;
      let deltaTotalCalls = 0;
      let deltaTotalWebforms = 0;
      let deltaTotalPatients = 0;
      let percentChangeCalls = 0;
      let percentChangeWebforms = 0;
      let percentChangePatients = 0;

      console.log('account', account);

      account.leadInquiryData.$values.forEach((valueObj) => {
        const reportMonth = valueObj.reportMonth < 10 ? `0${valueObj.reportMonth}` : valueObj.reportMonth;
        const reportDate = parseISO(`${valueObj.reportYear}-${reportMonth}-01`);

        if (isAfter(reportDate, monthsPriorDate)) {
          console.log('reportDate', reportDate);
          console.log('monthsPriorDate', monthsPriorDate);
        }

        totalCalls += valueObj.totalCalls;
        totalWebforms += valueObj.totalWebforms;
        totalNewPatients += valueObj.totalNewPatients;
        filteredTotalCalls += !isAfter(reportDate, monthsPriorDate) ? valueObj.totalCalls : 0;
        filteredTotalWebForms += !isAfter(reportDate, monthsPriorDate) ? valueObj.totalWebforms : 0;
        filteredTotalPatients += !isAfter(reportDate, monthsPriorDate) ? valueObj.totalNewPatients : 0;
        deltaTotalCalls = totalCalls - filteredTotalCalls;
        deltaTotalWebforms = totalWebforms - filteredTotalWebForms;
        deltaTotalPatients = totalNewPatients - filteredTotalPatients;
        percentChangeCalls = Math.round((deltaTotalCalls / totalCalls) * 100);
        percentChangeWebforms = Math.round((deltaTotalWebforms / totalWebforms) * 100);
        percentChangePatients = Math.round((deltaTotalPatients / totalNewPatients) * 100);
      });

      const company = {
        accountNumber,
        accountName,
        totalCalls,
        totalWebforms,
        totalNewPatients,
        filteredTotalCalls,
        filteredTotalWebForms,
        filteredTotalPatients,
        deltaTotalCalls,
        deltaTotalWebforms,
        deltaTotalPatients,
        percentChangeCalls,
        percentChangeWebforms,
        percentChangePatients,
      };
      companies.push(company);
      console.log('companies: ', companies);
    });

    return _.orderBy(companies, 'percentChangePatients', 'desc');
  };

  useEffect(() => {
    if (accounts.length) {
      const companiesData = getCompaniesData(12);

      setTableRows(companiesData);
    }
  }, [accounts]);

  const filterMonths = (filteredMonthTimeFrame) => {
    const companiesData = getCompaniesData(filteredMonthTimeFrame);

    setTableRows(companiesData);
  };

  return (
    <Container>
      <CenteredDiv>
        <Header>
          Client Performance Info
        </Header>
        <Button onClick={() => { filterMonths(3); }}>3 Months</Button>
        <Button onClick={() => { filterMonths(6); }}>6 Months</Button>
        <Button onClick={() => { filterMonths(9); }}>9 Months</Button>
        <Button onClick={() => { filterMonths(12); }}>12 Months</Button>
      </CenteredDiv>
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
              % Change (New Webforms)
            </TableHead>
          </TableRow>
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
                {row.filteredTotalPatients}
              </TableData>
              <TableData>
                {row.deltaTotalPatients}
              </TableData>
              <TableData>
                {row.percentChangePatients}
                %
              </TableData>
              <TableData>
                {row.totalCalls}
              </TableData>
              <TableData>
                {row.filteredTotalCalls}
              </TableData>
              <TableData>
                {row.deltaTotalCalls}
              </TableData>
              <TableData>
                {row.percentChangeCalls}
                %
              </TableData>
              <TableData>
                {row.totalWebforms}
              </TableData>
              <TableData>
                {row.filteredTotalWebForms}
              </TableData>
              <TableData>
                {row.deltaTotalWebforms}
              </TableData>
              <TableData>
                {row.percentChangeWebforms}
                %
              </TableData>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
export default AccountTable;
