import {connect} from 'react-redux';
import {changeColor} from '../../actions/actions';
import { bindActionCreators } from 'redux';
import Colors from './Colors';


const mapDispatchToProps = dispatch => bindActionCreators({
  changeColorProp: (colorName) => (changeColor(colorName))
},dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Colors);

