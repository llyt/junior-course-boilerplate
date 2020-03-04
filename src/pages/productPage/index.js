import React from 'react'
import styles from './ProductPage.module.css'
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
    if (this.props.data.length === 0) {
      this.props.fetchProducts()
    }
  }

  goToHomeWithHistory = (event) => {
    event.preventDefault()
    this.props.history.goBack()
  }

  getProductItem = () => {
    const productItemDefault = {
      'id': 1,
      'name': 'DEFAULT',
      'img': '/placeholder.jpg',
      'price': 100,
      'discount': 0,
      'stars': 0,
      'status': 'IN_STOCK',
      'category': 'NO_CATEGORY'
    }
    const productId = parseInt(this.props.match.params.id)
    const productItem = this.props.data.flat().find((product) => product.id === productId)
    return productItem || productItemDefault
  }

  render() {
    const productItem = this.getProductItem()
    const { error, isLoading, history } = this.props
    const { goToHomeWithHistory } = this

    if (error) {
      return <div className={styles.Error}>{error}</div>
    }

    return (
      isLoading
        ? <Loader />
        : <div className={styles.ProductPage}>
          <div className={styles.ProductPageHeader}>
            {history.action === 'POP'
              ? (<NavLink className={styles.BackToHomePage} to='/' title='Перейти в каталог' >&#8592;</NavLink>)
              : (<NavLink className={styles.BackToHomePage} to='/' title='Вернуться назад' onClick={goToHomeWithHistory}>&#8592;</NavLink>)
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
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    data: catalogSelectors.getPaginatedProductList(state)
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
