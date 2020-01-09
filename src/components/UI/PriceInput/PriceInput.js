import React from 'react'
import InputNumber from '../InputNumber/InputNumber'
import withValidateNumber from '../../../hoc/withValidateNumber/withValidateNumber'

const PriceInput = props => <InputNumber {...props} />

export default withValidateNumber(PriceInput)