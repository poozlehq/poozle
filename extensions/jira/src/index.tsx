import React from 'react'
// import Select from 'react-select'
import { Select } from '@poozle/edk';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

import styles from './index.module.scss'

function Hello() {
  return (
    <>
      <Select data={options} value={''} />
      <h1 className={styles.heading}>This is me</h1>
    </>
  )
}

export default Hello
