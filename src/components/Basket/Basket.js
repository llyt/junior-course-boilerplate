import React from 'react'
import styles from './Basket.module.css'
import Title from '../UI/Title/Title'
import { ReactComponent as BasketImg } from '../../static/basket.svg'
import { ReactComponent as BasketSaved } from '../../static/tick.svg'
import Button from '../UI/Button/Button'
import { NavLink } from 'react-router-dom'

class Basket extends React.PureComponent {

  render() {
    const {addedItems, totalAmount, isBasketSaved, isBasketSaving, error } = this.props

    if (error) {
      return error
    }

    return (
      <div className={styles.Basket}>
        <div className={styles.BasketHeader}>
          <BasketImg />
          <Title level="3">Корзина</Title>
          { isBasketSaved && <BasketSaved  title='Корзина сохранена' /> }

          <NavLink title='Перейти в корзину' to='/basket'>В корзину</NavLink>
        </div>
        <div className={styles.BasketBody}>
          <span>Товаров <strong>{addedItems.length}</strong>шт.</span>
          <span>Всего <strong>{totalAmount}</strong>₽</span>
        </div>

        <Button
          disabled={isBasketSaving}
          clickHandle={this.props.cleanBasketHandle}
        >
          Очистить корзину
        </Button>

        <Button
          disabled={isBasketSaving}
          clickHandle={ () => this.props.saveBasketHandle(this.props.addedItems) }
        >
          Сохранить корзину
        </Button>
      </div>
    )
  }
}

export default Basket
