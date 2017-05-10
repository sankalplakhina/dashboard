import React from 'react';
import cx from 'classnames';
import DbTable from 'src/js/components/dashboard/components/dbTable';
import StatsMapContainer from './statsMapContainer';
import StatsPanelBodyHeading from './statsPanelBodyHeading';
import StatsPanelBase from './statsPanelBase';
import StatsNotification from './statsNotification';

const StatsPanelBody = ({ data, isActive }) => {

	const { cols } = data;
	return (
		<div className="row">
			{
				cols.map((column, idx) => {
					const { widthSize, rows } = data[column];
					return (
						<div className={cx(`col-md-${widthSize} nopad bottomPad15`, {'borderRight': !idx})} key={idx}>
							{
								rows.map((row, index) => {
									const { widthSize, type, heading } = data[column][row];

									let ws = widthSize || 12;
									let header = (heading && <StatsPanelBodyHeading heading={heading} />) || null;
									let body = null;
									let footer = null;

									switch(type) {

										case 'table':
										body = <DbTable data={data[column][row]} />
										return (
											<StatsPanelBase
												widthSize={ws}
												header={header}
												body={body}
												footer={footer}
												data={data[column][row]}
												key={index} />
										);

										case 'map':
										body = <StatsMapContainer data={data[column][row]} isActive={isActive} />;
										return (
											<StatsPanelBase
												widthSize={ws}
												header={header}
												body={body}
												footer={footer}
												data={data[column][row]}
												key={index} />
										);

										case 'notification':
										return (
											<div className={`col-md-${ws}`} key={index}>
												<StatsNotification data={data[column][row]} />
											</div>
										);
									}

								})
							}
						</div>
					);
				})
			}
		</div>
	);
}

export default StatsPanelBody;
