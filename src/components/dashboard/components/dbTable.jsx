import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';
import { Table, Thead, Th, Tr, Td } from 'reactable';

class DbTable extends React.Component {

	constructor(){
		super();
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

    	const { widthSize, data: { rows, columns }, header } = this.props;
    	const { selectedColumn } = this.state;
        return (
        	<div className={`col-md-${widthSize}`}>
        		<div className="tableView">
        			{header}
        			<div className="tblViewContent">
        				<Table
        					className="respoTable display no-wrap dataTable no-footer"
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
        					 						const isSelectedBySort = (selectedColumn === key)
        					 						return (
        					 							<Td className={cx({'sorting_1': isSelectedBySort})}
        					 								column={key}
        					 								key={index}
        					 							>
        					 							    {row[key]}
        					 							</Td>
        					 						);
        					 					})
        					 				}
        					 			</Tr>
        					 		);
        					 	})
        					 }
        				</Table>
        			</div>
        		</div>
        	</div>
        );
    }
}

DbTable.defaultProps = {
	widthSize: 12,
}

export default bindHandlers(DbTable);
