import { fetchProductsFilter, fetchProductPriceFromHigh, fetchProductPriceFromLow, fetchProductByPopularity, fetchProductBySale, fetchProductById } from '../../actions/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from './Search';

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProductsFilter,
  fetchProductPriceFromHigh,
  fetchProductPriceFromLow,
  fetchProductByPopularity,
  fetchProductBySale,
  fetchProductById,
}, dispatch);

export default connect(null, mapDispatchToProps)(Search);