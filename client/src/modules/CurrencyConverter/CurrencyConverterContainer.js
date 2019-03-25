import {connect} from 'react-redux';
import {changeCurrency} from '../../actions/actions';
import CurrencyConverter from './CurrencyConverter';

const mapStateToProps = ({products}) => ({
  exchangeRatesProps: products.exchangeRates,
  usedCurrencyProp: products.usedCurrency
})

const mapDispatchToProps = dispatch => ({
  changeCurrencyProp: (currencyName) => dispatch(changeCurrency(currencyName))
})

export default connect(mapStateToProps,mapDispatchToProps)(CurrencyConverter)

