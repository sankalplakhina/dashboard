import React from 'react';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import AvgStats from './avgStats';
import StatsPanelHeader from '../containers/statsPanelHeader';
import StatsPanelBody from './statsPanelBody';

class StatsPanel extends React.Component {

	constructor(props) {
		super(props);
		const { isFirstExpanded } = props;
		this.state = {
			activeKey: isFirstExpanded? 0 : -1
		};
	}

	handleSelect(activeKey) {
		let newActiveKey = -1;
		if (activeKey !== this.state.activeKey) {
			newActiveKey = activeKey;
		}
		this.setState({
			activeKey: newActiveKey
		});
	}

	render() {
		const { data, isFixedExpanded, isDecisionButtonsHidden } = this.props;
		const { panelTitle, rows } = data;
		const { activeKey } = this.state;
		const isSingleRow = (rows && rows.length === 1);
		return (
			<div className="clearfix">
				<AvgStats data={panelTitle} />
				<div className="statsPanel">
					<PanelGroup activeKey={activeKey} accordion>
						{
							rows && rows.map(
								(row, idx) => {
									const isActive = (activeKey === idx);
									const header = <StatsPanelHeader
															onSelect={this.handleSelect}
															isExpanded={isActive}
															disableCollapse={isFixedExpanded && isSingleRow}
															isDecisionButtonsHidden={isDecisionButtonsHidden}
															idx={idx}
															data={data[row]}
															cols={panelTitle.cols} />
									return (
										<Panel
											header={header}
											key={idx}
											eventKey={idx}
										>
											<StatsPanelBody
												data={data[row]._collapsedData}
												isActive={isActive}
											/>
										</Panel>
									);
								}
							)
						}
					</PanelGroup>
				</div>
			</div>
		);
	}
}

StatsPanel.defaultProps = {
	isDecisionButtonsHidden: false,
	isFirstExpanded: false,
	isFixedExpanded: false, // if there's only one panel, fix it to stay expanded always
}

export default bindHandlers(StatsPanel);
