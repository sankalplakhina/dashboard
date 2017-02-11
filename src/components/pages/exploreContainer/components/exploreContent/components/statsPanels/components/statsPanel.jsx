import React from 'react';
import cx from 'classnames';
import styles from './statsPanel.css';
import { bindHandlers } from 'react-bind-handlers';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import AvgStats from '../../avgStats';
import StatsPanelHeader from './statsPanelHeader';
import StatsPanelBody from './statsPanelBody';

class StatsPanel extends React.Component {

	constructor() {
		super();
		this.state = {
			activeKey: 0
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
		const { data } = this.props;
		const { panelTitle, rows } = data;
		const { activeKey } = this.state;
		return (
			<div className="clearfix">
				<AvgStats data={panelTitle} />
				<div className={styles.statsPanel}>
					<PanelGroup activeKey={activeKey} accordion>
						{
							rows.map(
								(row, idx) => {
									const header = <StatsPanelHeader
															onSelect={this.handleSelect}
															isExpanded={activeKey === idx}
															idx={idx}
															data={data[row]}
															cols={panelTitle.cols} />
									return (
										<Panel
											header={header}
											key={idx}
											eventKey={idx}
										>
											<StatsPanelBody data={data[row]._collapsedData} />
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

export default bindHandlers(StatsPanel);
