import React from 'react';
import cx from 'classnames';

const StatsPanelBody = ({ data }) => {

	const { cols } = data;
	return (
		<div className="row">
			{
				cols.map((column, idx) => {
					const { widthSize, rows } = data[column];
					return (
						<div className={`col-md-${widthSize}`} key={idx}>
							{
								rows.map((row, index) => {
									const { widthSize, type } = data[column][row];
									let ws = widthSize || 12;
									switch(type) {

										case 'table':
										return (
											<div className={`col-md-${widthSize}`} key={index}>{type}</div>
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