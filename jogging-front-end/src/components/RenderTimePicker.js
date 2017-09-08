import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

class renderTimePicker extends React.Component {
  render(){
    const {
      input
    } = this.props

    if(input.value === ""){
      input.value = null
    }else {
      console.log(input.value)
      input.value = moment(`2017-01-01T${input.value}`)
    }

    return (
      <TimePicker {...input} />
    )
  }
}

export default renderTimePicker
