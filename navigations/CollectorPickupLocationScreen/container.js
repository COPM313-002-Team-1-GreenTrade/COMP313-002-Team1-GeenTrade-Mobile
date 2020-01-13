import {connect} from 'react-redux'
import CollectorPickupView from './CollectorPickupView'
import {currentUser} from '../../actions/Collector/actionCreator'

const mapStateToProps = (state) => ({
    points: state.collectorReducer.points,
    selected: state.collectorReducer.selected
})

const mapDispatchToProps = (dispatch) => ({
    currentUser: (payload) => dispatch(currentUser(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(CollectorPickupView)