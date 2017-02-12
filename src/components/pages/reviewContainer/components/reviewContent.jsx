import React from 'react';
import cx from 'classnames';
import DbTable from 'src/components/dashboard/components/DbTable';

const ReviewContent = ({ data }) => {
	console.log('data', data);
	const { rows } = data;
	return (
		<div className="content">
	  		{
	  			rows.map((row, idx) => {
	  				const isReviewTable = (row === 'reviewTable');
	  				return (
	  					<div className="row" key={idx}>
		  					<div className={cx("col-sm-12",{'reviewTable':isReviewTable})}>
		  						{isReviewTable && <DbTable className="reviewDatatable"
		  													data={data[row]}
		  													searchEnabled={true}
		  													/> }
		  					</div>
	  					</div>
	  				);
	  			})
	  		}
		</div>
	);
}

export default ReviewContent;
