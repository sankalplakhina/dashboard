import React from 'react';
import cx from 'classnames';
import DbTable from 'src/components/dashboard/components/DbTable';
import StatsPanelBodyHeading from './statsPanelBodyHeading';
import StatsPanelMap from './statsPanelMap';

const StatsPanelBody = ({ data }) => {

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

									switch(type) {

										case 'table':
										return (
											<DbTable
												widthSize={ws}
												header={header}
												data={data[column][row]}
												key={index}
											/>
										);

										case 'map':
										return (
											<StatsPanelMap
												widthSize={ws}
												header={header}
												data={data[column][row]}
												key={index} />
										);

										case 'item':
										return (
											<div className={`col-md-${widthSize}`} key={index}>{type}</div>
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
