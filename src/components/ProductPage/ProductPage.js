import React from 'react'
import styles from './ProductPage.module.css'
import data from '../../products'
import priceWithSpaces from '../../utils/priceWithSpaces'
import ProductItem from 'csssr-school-product-card'
import { NavLink } from 'react-router-dom'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductPage extends React.PureComponent {

  goToHomePageHandle = (event) => {
    event.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const productId = parseInt(this.props.match.params.id)
    const product = data.find((product) => product.id === productId)

    return (
      <div className={styles.ProductPage}>
        <div className={styles.ProductPageHeader}>
          {this.props.history.action === 'POP'
            ? (<NavLink className={styles.BackToHomePage} to={'/'} title='Вернуться назад'>&#8592;</NavLink>)
            : (<a href='/' className={styles.BackToHomePage} onClick={this.goToHomePageHandle}>&#8592;</a>)
          }
          <h1>{product.title}</h1>
        </div>
        <ProductItem
          isInStock={product.isInStock}
          img={product.img}
          title={product.title}
          price={priceWithSpaces(product.price)}
          subPriceContent={priceWithSpaces(product.subPriceContent)}
          maxRating={product.maxRating}
          rating={product.rating}
          ratingComponent={ratingComponent}
        />
      </div>
    )
  }
}

export default ProductPage
