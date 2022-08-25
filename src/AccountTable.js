import React from "react";
import { useEffect, useState } from "react";
import { isBefore } from "date-fns";
import axios from "axios"; 
import styled from "styled-components";
import { Button } from "./components/Button.styled";
import { CenteredDiv } from "./components/CenteredDiv.styled";
import { Container } from './components/Container.styled';
import { Header } from './components/Header.styled'
import { Table, TableData, TableHead, TableRow } from './components/Table.styled';


const sampleData = {
  $id: "1",
  accountName: "DENTIST",
  accountNumber: "1",
  $values: [
    {
      $id: "2",
      leadInquiryReportGuid: "fd58f0fd-ef21-45bd-ac12-001d0048b28e",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2020",
      isEmailSent: true,
      reportMonth: 2,
      reportYear: 2020,
      totalCalls: 179,
      totalWebforms: 7,
      totalNewPatients: 51,
      totalCallDuration: 24341,
      dateCreated: "2020-03-04T21:00:47.34",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "3",
      leadInquiryReportGuid: "ee2fe43e-adaf-4b26-8bfa-00b20d383a31",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for December 2018",
      isEmailSent: true,
      reportMonth: 12,
      reportYear: 2018,
      totalCalls: 133,
      totalWebforms: 0,
      totalNewPatients: 29,
      totalCallDuration: 14896,
      dateCreated: "2019-01-04T21:00:46.167",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "4",
      leadInquiryReportGuid: "f368ea8e-9b3c-42fe-a587-059ae94e55c4",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for October 2018",
      isEmailSent: true,
      reportMonth: 10,
      reportYear: 2018,
      totalCalls: 169,
      totalWebforms: 5,
      totalNewPatients: 27,
      totalCallDuration: 21777,
      dateCreated: "2018-11-04T21:00:46.54",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "5",
      leadInquiryReportGuid: "b089b2f6-782c-407e-9ddd-07fe930ac9d2",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2020",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2020,
      totalCalls: 253,
      totalWebforms: 10,
      totalNewPatients: 55,
      totalCallDuration: 27617,
      dateCreated: "2020-07-04T22:00:47.493",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "6",
      leadInquiryReportGuid: "cbb960f0-4fb0-4fd8-8de3-0aba35c20645",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2018",
      isEmailSent: false,
      reportMonth: 1,
      reportYear: 2018,
      totalCalls: 0,
      totalWebforms: 0,
      totalNewPatients: 0,
      totalCallDuration: 0,
      dateCreated: "2018-02-05T05:00:04.23",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "7",
      leadInquiryReportGuid: "fa85a3ab-1c7a-4e58-8a2f-0e7284834a2b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2019",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2019,
      totalCalls: 176,
      totalWebforms: 7,
      totalNewPatients: 28,
      totalCallDuration: 20879,
      dateCreated: "2019-06-04T22:00:47.21",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "8",
      leadInquiryReportGuid: "537e65cb-865f-42c4-9135-0e767031dba1",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2019",
      isEmailSent: true,
      reportMonth: 1,
      reportYear: 2019,
      totalCalls: 195,
      totalWebforms: 7,
      totalNewPatients: 48,
      totalCallDuration: 27793,
      dateCreated: "2019-02-04T21:00:46.69",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "9",
      leadInquiryReportGuid: "d51d6ed9-068b-4fec-a81a-154abf3d999f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2020",
      isEmailSent: true,
      reportMonth: 1,
      reportYear: 2020,
      totalCalls: 213,
      totalWebforms: 4,
      totalNewPatients: 45,
      totalCallDuration: 29728,
      dateCreated: "2020-02-04T21:00:47.28",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "10",
      leadInquiryReportGuid: "cc47804e-48d2-4ce1-87ca-2b08f5e03c2a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for September 2018",
      isEmailSent: true,
      reportMonth: 9,
      reportYear: 2018,
      totalCalls: 97,
      totalWebforms: 0,
      totalNewPatients: 12,
      totalCallDuration: 10692,
      dateCreated: "2018-10-04T22:00:46.36",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "11",
      leadInquiryReportGuid: "a1e32b02-44a5-43f4-a402-3320495b746f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2018",
      isEmailSent: false,
      reportMonth: 2,
      reportYear: 2018,
      totalCalls: 28,
      totalWebforms: 0,
      totalNewPatients: 3,
      totalCallDuration: 3877,
      dateCreated: "2018-03-05T05:04:40.177",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "12",
      leadInquiryReportGuid: "329c3218-cf82-45f6-9dd9-4d5cc811e16b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for November 2018",
      isEmailSent: true,
      reportMonth: 11,
      reportYear: 2018,
      totalCalls: 185,
      totalWebforms: 5,
      totalNewPatients: 43,
      totalCallDuration: 19133,
      dateCreated: "2018-12-04T21:00:46.587",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "13",
      leadInquiryReportGuid: "f0b7aff5-5110-4638-9711-75e727dc01e0",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for August 2019",
      isEmailSent: true,
      reportMonth: 8,
      reportYear: 2019,
      totalCalls: 130,
      totalWebforms: 5,
      totalNewPatients: 42,
      totalCallDuration: 16439,
      dateCreated: "2019-09-04T22:00:47.58",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "14",
      leadInquiryReportGuid: "484cbc21-46f9-4300-ba02-76a74585263c",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2019",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2019,
      totalCalls: 156,
      totalWebforms: 4,
      totalNewPatients: 33,
      totalCallDuration: 23902,
      dateCreated: "2019-07-04T22:00:47.203",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "15",
      leadInquiryReportGuid: "557d96de-c0f4-4598-8f42-8278f756585b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for July 2018",
      isEmailSent: true,
      reportMonth: 7,
      reportYear: 2018,
      totalCalls: 196,
      totalWebforms: 4,
      totalNewPatients: 30,
      totalCallDuration: 25599,
      dateCreated: "2018-08-05T05:06:13.117",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "16",
      leadInquiryReportGuid: "e29e3055-4f8b-4f85-94ea-851280b2850d",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for August 2018",
      isEmailSent: true,
      reportMonth: 8,
      reportYear: 2018,
      totalCalls: 156,
      totalWebforms: 3,
      totalNewPatients: 33,
      totalCallDuration: 15787,
      dateCreated: "2018-09-05T14:29:29.36",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "17",
      leadInquiryReportGuid: "523f1b90-8c6c-4902-a07d-869d6c855e5e",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2019",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2019,
      totalCalls: 138,
      totalWebforms: 2,
      totalNewPatients: 31,
      totalCallDuration: 16031,
      dateCreated: "2019-04-04T22:00:46.657",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "18",
      leadInquiryReportGuid: "4fbfbba3-69ea-40f8-9996-88a270e1a7f9",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2020",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2020,
      totalCalls: 195,
      totalWebforms: 3,
      totalNewPatients: 34,
      totalCallDuration: 19668,
      dateCreated: "2020-04-04T22:00:47.377",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "19",
      leadInquiryReportGuid: "a9f14490-7f92-43d6-8d5f-98d4716a25cc",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2018",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2018,
      totalCalls: 71,
      totalWebforms: 1,
      totalNewPatients: 13,
      totalCallDuration: 11472,
      dateCreated: "2018-05-05T05:05:29.023",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "20",
      leadInquiryReportGuid: "ffebac83-19cc-4c78-8934-9f16ae7b55ed",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2020",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2020,
      totalCalls: 103,
      totalWebforms: 9,
      totalNewPatients: 23,
      totalCallDuration: 5241,
      dateCreated: "2020-06-04T22:00:46.8",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "21",
      leadInquiryReportGuid: "abce5693-0e9d-4268-99a3-bda408f2f7ae",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2018",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2018,
      totalCalls: 68,
      totalWebforms: 0,
      totalNewPatients: 5,
      totalCallDuration: 7114,
      dateCreated: "2018-04-05T05:05:08.207",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "22",
      leadInquiryReportGuid: "3d21caaf-90e0-4f3c-9952-c370a244ab1a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2019",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2019,
      totalCalls: 174,
      totalWebforms: 6,
      totalNewPatients: 27,
      totalCallDuration: 27601,
      dateCreated: "2019-05-04T22:00:46.537",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "23",
      leadInquiryReportGuid: "86b17380-e0cf-4596-b1f9-cd24975f4a18",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for July 2019",
      isEmailSent: true,
      reportMonth: 7,
      reportYear: 2019,
      totalCalls: 176,
      totalWebforms: 1,
      totalNewPatients: 38,
      totalCallDuration: 22567,
      dateCreated: "2019-08-04T22:00:47.59",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "24",
      leadInquiryReportGuid: "b62ecd1a-52fd-49bb-a437-cd5c74391231",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2018",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2018,
      totalCalls: 97,
      totalWebforms: 3,
      totalNewPatients: 29,
      totalCallDuration: 12677,
      dateCreated: "2018-06-05T05:05:32.15",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "25",
      leadInquiryReportGuid: "0b7bda2e-5f8c-47dd-b6cd-d8dc5f5d052a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for December 2019",
      isEmailSent: true,
      reportMonth: 12,
      reportYear: 2019,
      totalCalls: 226,
      totalWebforms: 5,
      totalNewPatients: 44,
      totalCallDuration: 32199,
      dateCreated: "2020-01-04T21:00:47.52",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "26",
      leadInquiryReportGuid: "3c55ccca-8bf3-4bb4-84fa-ec6120ce8485",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for September 2019",
      isEmailSent: true,
      reportMonth: 9,
      reportYear: 2019,
      totalCalls: 192,
      totalWebforms: 4,
      totalNewPatients: 49,
      totalCallDuration: 23246,
      dateCreated: "2019-10-04T22:00:47.35",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "27",
      leadInquiryReportGuid: "c2667387-60a7-4640-83bc-ef320b5b0282",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2019",
      isEmailSent: true,
      reportMonth: 2,
      reportYear: 2019,
      totalCalls: 188,
      totalWebforms: 4,
      totalNewPatients: 50,
      totalCallDuration: 23081,
      dateCreated: "2019-03-04T21:00:46.553",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "28",
      leadInquiryReportGuid: "5fe1f764-d3d2-45c7-9690-f9f1b666388f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for October 2019",
      isEmailSent: true,
      reportMonth: 10,
      reportYear: 2019,
      totalCalls: 237,
      totalWebforms: 4,
      totalNewPatients: 50,
      totalCallDuration: 30353,
      dateCreated: "2019-11-04T21:00:47.463",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "29",
      leadInquiryReportGuid: "6ffa2577-6e05-4f7d-89da-fd841a6639c1",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for November 2019",
      isEmailSent: true,
      reportMonth: 11,
      reportYear: 2019,
      totalCalls: 195,
      totalWebforms: 5,
      totalNewPatients: 48,
      totalCallDuration: 23858,
      dateCreated: "2019-12-04T21:00:47.327",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "30",
      leadInquiryReportGuid: "d4f01721-5189-4ad9-ac87-fdb9248356a6",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2018",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2018,
      totalCalls: 108,
      totalWebforms: 1,
      totalNewPatients: 25,
      totalCallDuration: 13680,
      dateCreated: "2018-07-09T11:42:46.113",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "31",
      leadInquiryReportGuid: "35202054-3380-4595-afbe-fe4d4cf56723",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2020",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2020,
      totalCalls: 85,
      totalWebforms: 2,
      totalNewPatients: 10,
      totalCallDuration: 4066,
      dateCreated: "2020-05-04T22:00:50.62",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    }
  ]
};

const sampleData2 = {
  $id: "2",
  accountName: "OTHER DENTIST",
  accountNumber: "2",
  $values: [
    {
      $id: "2",
      leadInquiryReportGuid: "fd58f0fd-ef21-45bd-ac12-001d0048b28e",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2020",
      isEmailSent: true,
      reportMonth: 2,
      reportYear: 2020,
      totalCalls: 179,
      totalWebforms: 7,
      totalNewPatients: 51,
      totalCallDuration: 24341,
      dateCreated: "2020-03-04T21:00:47.34",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "3",
      leadInquiryReportGuid: "ee2fe43e-adaf-4b26-8bfa-00b20d383a31",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for December 2018",
      isEmailSent: true,
      reportMonth: 12,
      reportYear: 2018,
      totalCalls: 133,
      totalWebforms: 0,
      totalNewPatients: 29,
      totalCallDuration: 14896,
      dateCreated: "2019-01-04T21:00:46.167",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "4",
      leadInquiryReportGuid: "f368ea8e-9b3c-42fe-a587-059ae94e55c4",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for October 2018",
      isEmailSent: true,
      reportMonth: 10,
      reportYear: 2018,
      totalCalls: 169,
      totalWebforms: 5,
      totalNewPatients: 27,
      totalCallDuration: 21777,
      dateCreated: "2018-11-04T21:00:46.54",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "5",
      leadInquiryReportGuid: "b089b2f6-782c-407e-9ddd-07fe930ac9d2",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2020",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2020,
      totalCalls: 253,
      totalWebforms: 10,
      totalNewPatients: 55,
      totalCallDuration: 27617,
      dateCreated: "2020-07-04T22:00:47.493",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "6",
      leadInquiryReportGuid: "cbb960f0-4fb0-4fd8-8de3-0aba35c20645",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2018",
      isEmailSent: false,
      reportMonth: 1,
      reportYear: 2018,
      totalCalls: 0,
      totalWebforms: 0,
      totalNewPatients: 0,
      totalCallDuration: 0,
      dateCreated: "2018-02-05T05:00:04.23",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "7",
      leadInquiryReportGuid: "fa85a3ab-1c7a-4e58-8a2f-0e7284834a2b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2019",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2019,
      totalCalls: 176,
      totalWebforms: 7,
      totalNewPatients: 28,
      totalCallDuration: 20879,
      dateCreated: "2019-06-04T22:00:47.21",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "8",
      leadInquiryReportGuid: "537e65cb-865f-42c4-9135-0e767031dba1",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2019",
      isEmailSent: true,
      reportMonth: 1,
      reportYear: 2019,
      totalCalls: 195,
      totalWebforms: 7,
      totalNewPatients: 48,
      totalCallDuration: 27793,
      dateCreated: "2019-02-04T21:00:46.69",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "9",
      leadInquiryReportGuid: "d51d6ed9-068b-4fec-a81a-154abf3d999f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for January 2020",
      isEmailSent: true,
      reportMonth: 1,
      reportYear: 2020,
      totalCalls: 213,
      totalWebforms: 4,
      totalNewPatients: 45,
      totalCallDuration: 29728,
      dateCreated: "2020-02-04T21:00:47.28",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "10",
      leadInquiryReportGuid: "cc47804e-48d2-4ce1-87ca-2b08f5e03c2a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for September 2018",
      isEmailSent: true,
      reportMonth: 9,
      reportYear: 2018,
      totalCalls: 97,
      totalWebforms: 0,
      totalNewPatients: 12,
      totalCallDuration: 10692,
      dateCreated: "2018-10-04T22:00:46.36",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "11",
      leadInquiryReportGuid: "a1e32b02-44a5-43f4-a402-3320495b746f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2018",
      isEmailSent: false,
      reportMonth: 2,
      reportYear: 2018,
      totalCalls: 28,
      totalWebforms: 0,
      totalNewPatients: 3,
      totalCallDuration: 3877,
      dateCreated: "2018-03-05T05:04:40.177",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "12",
      leadInquiryReportGuid: "329c3218-cf82-45f6-9dd9-4d5cc811e16b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for November 2018",
      isEmailSent: true,
      reportMonth: 11,
      reportYear: 2018,
      totalCalls: 185,
      totalWebforms: 5,
      totalNewPatients: 43,
      totalCallDuration: 19133,
      dateCreated: "2018-12-04T21:00:46.587",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "13",
      leadInquiryReportGuid: "f0b7aff5-5110-4638-9711-75e727dc01e0",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for August 2019",
      isEmailSent: true,
      reportMonth: 8,
      reportYear: 2019,
      totalCalls: 130,
      totalWebforms: 5,
      totalNewPatients: 42,
      totalCallDuration: 16439,
      dateCreated: "2019-09-04T22:00:47.58",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "14",
      leadInquiryReportGuid: "484cbc21-46f9-4300-ba02-76a74585263c",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2019",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2019,
      totalCalls: 156,
      totalWebforms: 4,
      totalNewPatients: 33,
      totalCallDuration: 23902,
      dateCreated: "2019-07-04T22:00:47.203",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "15",
      leadInquiryReportGuid: "557d96de-c0f4-4598-8f42-8278f756585b",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for July 2018",
      isEmailSent: true,
      reportMonth: 7,
      reportYear: 2018,
      totalCalls: 196,
      totalWebforms: 4,
      totalNewPatients: 30,
      totalCallDuration: 25599,
      dateCreated: "2018-08-05T05:06:13.117",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "16",
      leadInquiryReportGuid: "e29e3055-4f8b-4f85-94ea-851280b2850d",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for August 2018",
      isEmailSent: true,
      reportMonth: 8,
      reportYear: 2018,
      totalCalls: 156,
      totalWebforms: 3,
      totalNewPatients: 33,
      totalCallDuration: 15787,
      dateCreated: "2018-09-05T14:29:29.36",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "17",
      leadInquiryReportGuid: "523f1b90-8c6c-4902-a07d-869d6c855e5e",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2019",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2019,
      totalCalls: 138,
      totalWebforms: 2,
      totalNewPatients: 31,
      totalCallDuration: 16031,
      dateCreated: "2019-04-04T22:00:46.657",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "18",
      leadInquiryReportGuid: "4fbfbba3-69ea-40f8-9996-88a270e1a7f9",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2020",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2020,
      totalCalls: 195,
      totalWebforms: 3,
      totalNewPatients: 34,
      totalCallDuration: 19668,
      dateCreated: "2020-04-04T22:00:47.377",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "19",
      leadInquiryReportGuid: "a9f14490-7f92-43d6-8d5f-98d4716a25cc",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2018",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2018,
      totalCalls: 71,
      totalWebforms: 1,
      totalNewPatients: 13,
      totalCallDuration: 11472,
      dateCreated: "2018-05-05T05:05:29.023",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "20",
      leadInquiryReportGuid: "ffebac83-19cc-4c78-8934-9f16ae7b55ed",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2020",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2020,
      totalCalls: 103,
      totalWebforms: 9,
      totalNewPatients: 23,
      totalCallDuration: 5241,
      dateCreated: "2020-06-04T22:00:46.8",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "21",
      leadInquiryReportGuid: "abce5693-0e9d-4268-99a3-bda408f2f7ae",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for March 2018",
      isEmailSent: true,
      reportMonth: 3,
      reportYear: 2018,
      totalCalls: 68,
      totalWebforms: 0,
      totalNewPatients: 5,
      totalCallDuration: 7114,
      dateCreated: "2018-04-05T05:05:08.207",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "22",
      leadInquiryReportGuid: "3d21caaf-90e0-4f3c-9952-c370a244ab1a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2019",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2019,
      totalCalls: 174,
      totalWebforms: 6,
      totalNewPatients: 27,
      totalCallDuration: 27601,
      dateCreated: "2019-05-04T22:00:46.537",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "23",
      leadInquiryReportGuid: "86b17380-e0cf-4596-b1f9-cd24975f4a18",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for July 2019",
      isEmailSent: true,
      reportMonth: 7,
      reportYear: 2019,
      totalCalls: 176,
      totalWebforms: 1,
      totalNewPatients: 38,
      totalCallDuration: 22567,
      dateCreated: "2019-08-04T22:00:47.59",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "24",
      leadInquiryReportGuid: "b62ecd1a-52fd-49bb-a437-cd5c74391231",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for May 2018",
      isEmailSent: true,
      reportMonth: 5,
      reportYear: 2018,
      totalCalls: 97,
      totalWebforms: 3,
      totalNewPatients: 29,
      totalCallDuration: 12677,
      dateCreated: "2018-06-05T05:05:32.15",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "25",
      leadInquiryReportGuid: "0b7bda2e-5f8c-47dd-b6cd-d8dc5f5d052a",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for December 2019",
      isEmailSent: true,
      reportMonth: 12,
      reportYear: 2019,
      totalCalls: 226,
      totalWebforms: 5,
      totalNewPatients: 44,
      totalCallDuration: 32199,
      dateCreated: "2020-01-04T21:00:47.52",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "26",
      leadInquiryReportGuid: "3c55ccca-8bf3-4bb4-84fa-ec6120ce8485",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for September 2019",
      isEmailSent: true,
      reportMonth: 9,
      reportYear: 2019,
      totalCalls: 192,
      totalWebforms: 4,
      totalNewPatients: 49,
      totalCallDuration: 23246,
      dateCreated: "2019-10-04T22:00:47.35",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "27",
      leadInquiryReportGuid: "c2667387-60a7-4640-83bc-ef320b5b0282",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for February 2019",
      isEmailSent: true,
      reportMonth: 2,
      reportYear: 2019,
      totalCalls: 188,
      totalWebforms: 4,
      totalNewPatients: 50,
      totalCallDuration: 23081,
      dateCreated: "2019-03-04T21:00:46.553",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "28",
      leadInquiryReportGuid: "5fe1f764-d3d2-45c7-9690-f9f1b666388f",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for October 2019",
      isEmailSent: true,
      reportMonth: 10,
      reportYear: 2019,
      totalCalls: 237,
      totalWebforms: 4,
      totalNewPatients: 50,
      totalCallDuration: 30353,
      dateCreated: "2019-11-04T21:00:47.463",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "29",
      leadInquiryReportGuid: "6ffa2577-6e05-4f7d-89da-fd841a6639c1",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for November 2019",
      isEmailSent: true,
      reportMonth: 11,
      reportYear: 2019,
      totalCalls: 195,
      totalWebforms: 5,
      totalNewPatients: 48,
      totalCallDuration: 23858,
      dateCreated: "2019-12-04T21:00:47.327",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "30",
      leadInquiryReportGuid: "d4f01721-5189-4ad9-ac87-fdb9248356a6",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for June 2018",
      isEmailSent: true,
      reportMonth: 6,
      reportYear: 2018,
      totalCalls: 108,
      totalWebforms: 1,
      totalNewPatients: 25,
      totalCallDuration: 13680,
      dateCreated: "2018-07-09T11:42:46.113",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    },
    {
      $id: "31",
      leadInquiryReportGuid: "35202054-3380-4595-afbe-fe4d4cf56723",
      leadInquiryReportTypeGuid: "cfd4df72-7204-48de-9a3c-497180b5a783",
      accountGuid: "6e252aac-6799-4e70-add3-e8c5d2cdaa5a",
      title: "Report for April 2020",
      isEmailSent: true,
      reportMonth: 4,
      reportYear: 2020,
      totalCalls: 85,
      totalWebforms: 2,
      totalNewPatients: 10,
      totalCallDuration: 4066,
      dateCreated: "2020-05-04T22:00:50.62",
      accountGu: null,
      leadInquiryReportTypeGu: null,
      trackingState: 0,
      modifiedProperties: null,
      entityIdentifier: "00000000-0000-0000-0000-000000000000"
    }
  ]
};

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  // const accountOne = {
  //   accountNumber: '',
  //   accountName: '',
  //   totalCalls: 0,
  //   totalWebforms: 0,
  //   totalNewPatients: 0,
  //   filteredNewCalls: 0,
  //   filteredNewWebForms: 0,
  //   filteredNewPatients: 0,
  // };

  // THIS IS MOCKING THE AXIOS GET/POST REQUEST FOR THE API DATA THAT IS NEEDED 
  // ONLY MOCK DUMMMY DATA IS USED IN HERE
  useEffect(() => {
    const createAccounts = async () => {
      const val = () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([sampleData, sampleData2]);
          }, 2000);
        });
      const data = await val();
      setAccounts(data);
    };
    createAccounts();
  }, []);
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
        .then(res => {console.log('res :',res);})
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

      account.$values.map((valueObj) => {
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
  console.log("testing companies : ", tableRows);
  tableRows.map((row) => {
    console.log("row.accountName: ", row.accountName);
  });
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
          </Table>
        </Container>
  );
}
 export default AccountTable; 