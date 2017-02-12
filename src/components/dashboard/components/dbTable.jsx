import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';
import { Table, Thead, Th, Tr, Td } from 'reactable';

class DbTable extends React.Component {

	constructor(){
		super();
		this.classes = 'respoTable display no-wrap dataTable no-footer';
		this.state = {
			selectedColumn: null
		};
	}

	handleSort({column, direction}) {
		this.setState({
			selectedColumn: column
		});
	}

    render() {

    	const { data: { rows, columns }, className } = this.props;
    	const { selectedColumn } = this.state;
    	let appliedClass = this.classes;
    	if (className) {
    		appliedClass += ` ${className}`;
    	}
        return (
			<Table
				className={appliedClass}
				filterable={columns.map(col => col.key)}
				hideFilterInput
				sortable
				onSort={this.handleSort}
			>
				<Thead>
					{
						columns.map((column, idx) => {
							return (
								<Th className="sorting" column={column.key} key={idx}>
								  <strong className={`${column.key}-header`}>{column.label}</strong>
								</Th>
							);
						})
					}
				 </Thead>
				 {
				 	rows.map((row, idx) => {
				 		const isEvenRow = Boolean(idx%2);
				 		return (
				 			<Tr key={idx} className={cx({'even': isEvenRow, 'odd': !isEvenRow})}>
				 				{
				 					Object.keys(row).map((key, index) => {
				 						const isSelectedBySort = (selectedColumn === key);
				 						const value = row[key];
				 						let children = value;
				 						if (value !== null && typeof value === 'object') {
				 							switch(value.type) {
				 								case 'score':
				 								children = (
				 										<div>
				 											<img src={`/public/static/images/${value.icon}`} />
				 											{value.text}
				 										</div>);
				 								break;
				 								case 'latestPaymentAbuseStatus':
				 								children = (
				 									<div
				 										className={cx('status', {'red': value.risky, 'green': value.safe})}
				 									>
				 										{value.text}
				 									</div>)
				 								break;
				 								case 'avsCvv':
				 								children = (
				 									<div>
				 										{value.items.map((item, ix) =>
				 											(<span className={cx({
				 												'bgGreen': item.safe,
				 												'bgRed': item.risky
				 											})}
				 											key={ix}
				 											>{item.text}</span>))}
				 									</div>);
				 								break;
				 							}
				 						}
				 						return (
				 							<Td className={cx({'sorting_1': isSelectedBySort})}
				 								column={key}
				 								key={index}
				 							>
				 							    {children}
				 							</Td>
				 						);
				 					})
				 				}
				 			</Tr>
				 		);
				 	})
				 }
			</Table>
        );
    }
}

export default bindHandlers(DbTable);
