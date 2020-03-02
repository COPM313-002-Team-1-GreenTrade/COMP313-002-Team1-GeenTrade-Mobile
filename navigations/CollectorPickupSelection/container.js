import {connect} from 'react-redux'
import CollectorPickupSelectionView from './CollectorPickupSelectionView'

const mapStateToProps = (state) => ({
    points: state.collectorReducer.points,
    selected: state.collectorReducer.selected
})

const mapDispatchToProps = (dispatch) => ({
    currentUser: (payload) => dispatch(currentUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectorPickupSelectionView)