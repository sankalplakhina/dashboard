import React from 'react';

class DbTable extends React.Component {

    render() {
    	const { widthSize } = this.props;
        return (
        	<div className={`col-md-${widthSize}`}>DbTable</div>
        );
    }
}

DbTable.defaultProps = {
	widthSize: 12,
}

export default DbTable;
