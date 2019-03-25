import { loginUser } from './../../../actions/actionsCreators';
import { connect } from 'react-redux';
import Login from './Login';

const mapStateToProps = ({auth,errors}) => ({
  auth: auth,
  errors: errors,
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)