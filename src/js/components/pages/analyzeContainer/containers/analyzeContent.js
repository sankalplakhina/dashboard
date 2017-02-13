import { connect } from 'react-redux';
import AnalyzeContent from '../components/analyzeContent';
import { getAnalyzeData } from '../selectors/analyzeContainerSelectors';

function mapStateToProps(state) {
  	return {
  		data: getAnalyzeData(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeContent);