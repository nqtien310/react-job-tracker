import React from 'react';
import ReportList from '../ReportList'

export default function UserReport(props){
  return (
    <ReportList userId={props.match.params.userId} />
  )
}
