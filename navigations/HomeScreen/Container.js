import {connect} from 'react-redux'
import HomeScreen from './HomeView'
import {addPoints, updatePoints, getPoint} from '../../actions/Collector/actionCreator'
import {getPoints} from '../../actions/Progress/actionCreators';

const mapStateToProps = (state) => ({
    rewardPoints: state.collectorReducer.rewardPoints,
    points: state.getPointsReducer.points,
})

const mapDispatchToProps = (dispatch) => ({
    addPoints: (payload) => dispatch(addPoints(payload)),
    updatePoints: (payload) => dispatch(updatePoints(payload)),
    getPoints: (payload) => dispatch(getPoint(payload)),
    getPoints: (points) => dispatch(getPoints(points)),
 })
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

