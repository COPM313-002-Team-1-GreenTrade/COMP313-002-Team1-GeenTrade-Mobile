import {connect} from 'react-redux'
import CollectorMapView from './CollectorMapView'

const mapStateToProps = (state) => ({
    selected: state.collectorReducer.selected
})

export default connect(mapStateToProps)(CollectorMapView)