import React from 'react';
import cx from 'classnames';
import DbTable from 'src/components/dashboard/components/DbTable';
import StatsPanelBodyHeading from './statsPanelBodyHeading';

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
									const { widthSize, type } = data[column][row];
									let ws = widthSize || 12;
									switch(type) {

										case 'table':
										return (
											<DbTable
												widthSize={ws}
												key={index}
												data={data[column][row]}
												header={<StatsPanelBodyHeading heading={data[column][row].heading} />}
											/>
										);

										case 'map':
										return (
											<div className={`col-md-${widthSize}`} key={index}>{type}</div>
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
