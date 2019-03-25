
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';

const mapStateToProps = ({ auth }) => ({
  auth: auth,
})

export default connect(
  mapStateToProps,
  null
)(ChangePassword)