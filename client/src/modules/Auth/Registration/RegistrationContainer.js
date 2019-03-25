import { registerUser } from './../../../actions/actionsCreators';
import { connect } from 'react-redux';
import Registration from './Registration';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({auth,errors}) => ({
  auth: auth,
  errors: errors,
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Registration))