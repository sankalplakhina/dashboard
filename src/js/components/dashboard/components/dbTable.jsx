import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';
import { Table, Thead, Th, Tr, Td, Sort } from 'reactable';

class DbTable extends React.Component {

	constructor(){
		super();
		this.classes = 'respoTable display no-wrap dataTable no-footer';
		this.state = {
			selectedColumn: null
		};
	}

	getFilterable(columns) {
		return columns.map(col => {
			switch(col.key) {
				default:
				return col.key
			}
		});
	}

	getSortable(columns) {
		return columns.map(col => {
			switch(col.key) {
				case 'score':
				return {
					column: col.key,
					sortFunction: function(a, b){
			            var nameA = a.props.children[1];
			            var nameB = b.props.children[1];
			            return Sort.CaseInsensitive(nameA, nameB);
			        }
				};
				case 'latestPaymentAbuseStatus':
				return {
					column: col.key,
					sortFunction: function(a, b){
			            var nameA = a.props.children;
			            var nameB = b.props.children;
			            return Sort.CaseInsensitive(nameA, nameB);
			        }
				};
				default:
				return col.key
			}
		});
	}

	handleSort({column, direction}) {
		this.setState({
			selectedColumn: column
		});
	}

    render() {

    	const { data: { rows, columns }, className, searchEnabled } = this.props;
    	const { selectedColumn } = this.state;
    	let appliedClass = this.classes;
    	if (className) {
    		appliedClass += ` ${className}`;
    	}
        return (
			<Table
				className={appliedClass}
				filterable={this.getFilterable(columns)}
				hideFilterInput={!searchEnabled}
				sortable={this.getSortable(columns)}
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
				 						let children;

				 						if (_.isObject(value)) {
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
				 						} else {
				 							switch(key) {
				 								case 'id':
				 								children = (
				 									<Link className="colorRed" to={`/order/${value}`}>
				 										{value}
				 									</Link>
				 								);
				 								break;

				 								default:
				 								children = value
				 							}
				 						}
				 						return (
				 							<Td className={cx({'sorting_1': isSelectedBySort})}
				 								column={key}
				 								key={key}
				 								label={key}
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

DbTable.defaultProps = {
	searchEnabled: false
}

export default bindHandlers(DbTable);
