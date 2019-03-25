import { fetchPosts } from '../../actions/actionsCreators';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';

const mapStateToProps = ({posts}) => ({
  posts: posts.posts,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts,
},dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);