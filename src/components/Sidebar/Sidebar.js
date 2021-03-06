import React from 'react';
import styles from './Sidebar.module.css'
import Title from '../UI/Title/Title'
import PriceInput from '../UI/PriceInput/PriceInput'
import DiscountForm from 'csssr-school-input-discount'
import CategoryFilter from '../UI/CategoryFilter/CategoryFilter'
import withValidateNumber from '../../hoc/withValidateNumber/withValidateNumber'
import logRender from '../../hoc/logRender/logRender'
import { NavLink } from 'react-router-dom'

const DiscountHOC = withValidateNumber(logRender(DiscountForm))

class Sidebar extends React.PureComponent {
  render() {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.FilterPrice}>
          <Title level="3">Цена</Title>
          <form>
            <label htmlFor="minPrice">от</label>
            <PriceInput
              name="minPrice"
              value={this.props.minPrice}
              inputChange={this.props.inputChange}
            />
            <label htmlFor="maxPrice">до</label>
            <PriceInput
              name="maxPrice"
              value={this.props.maxPrice}
              inputChange={this.props.inputChange}
            />
          </form>
        </div>

        <DiscountHOC
          title="Скидка"
          name="discount"
          value={this.props.discount}
          inputChange={this.props.inputChange}
        />

        <CategoryFilter
          title="Категории"
          listOfCategories={this.props.listOfCategories}
        />

        <NavLink
          className={styles.ResetButton}
          to='/'
          onClick={() => this.props.resetInputs()}
        >
          Сбросить фильтры
        </NavLink>
      </div>
    )
  }
}

export default logRender(Sidebar)
