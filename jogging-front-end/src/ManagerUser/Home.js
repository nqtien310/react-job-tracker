import React from 'react';
import UsersList from '../Users'

export default function Home(props) {
  return <UsersList myUser={props.myUser}/>
}
