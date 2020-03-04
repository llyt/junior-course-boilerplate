import React from 'react'
import styles from './ProductPage.module.css'
import ProductPageIsEmpty from '../error/ProductPageIsEmpty/index'
import Loader from '../../components/UI/Loader/Loader'
import priceWithSpaces from '../../utils/priceWithSpaces'
import ProductItem from 'csssr-school-product-card'
import { NavLink } from 'react-router-dom'
import { catalogOperations, catalogSelectors } from '../../store/catalog'
import { connect } from 'react-redux'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductPage extends React.PureComponent  {

  componentDidMount = () => {
    if (this.props.products.length === 0) {
      this.props.fetchProducts()
    }
  }

  goToHomeWithHistory = (event) => {
    event.preventDefault()
    this.props.history.goBack()
  }

  getProductItem = () => {
    const productId = parseInt(this.props.match.params.id)
    const productItem = this.props.products.flat().find((product) => product.id === productId)
    return productItem
  }

  render() {
    const productItem = this.getProductItem()
    const { error, isLoading, history } = this.props

    if (error) {
      return <div className={styles.Error}>{error}</div>
    }

    return (
      isLoading
        ? <Loader />
        : (productItem
            ? <div className={styles.ProductPage}>
                <div className={styles.ProductPageHeader}>
                  {history.action === 'POP'
                    ? (<NavLink className={styles.BackToHomePage} to='/' title='Перейти в каталог' >&#8592;</NavLink>)
                    : (<NavLink className={styles.BackToHomePage} to='/' title='Вернуться назад' onClick={this.goToHomeWithHistory}>&#8592;</NavLink>)
                  }
                  <h1>{productItem.name}</h1>
                </div>
                <ProductItem
                  isInStock={productItem.status === 'IN_STOCK'}
                  img={`../img${productItem.img}`}
                  title={productItem.name}
                  price={priceWithSpaces(productItem.price)}
                  subPriceContent={priceWithSpaces(productItem.price)}
                  maxRating={5}
                  rating={productItem.stars}
                  ratingComponent={ratingComponent}
                />
              </div>
            : <ProductPageIsEmpty />)
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    products: catalogSelectors.getPaginatedProductList(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage)
