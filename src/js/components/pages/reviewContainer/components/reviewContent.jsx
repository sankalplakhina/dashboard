import React from 'react';
import cx from 'classnames';
import ReviewTable from '../containers/reviewTable';

const ReviewContent = ({ data }) => {
	const { rows } = data;
	return (
		<div className="content">
	  		{
	  			rows && rows.map((row, idx) => {
	  				const isReviewTable = (row === 'reviewTable');
	  				return (
	  					<div className="row" key={idx}>
		  					<div className={cx("col-sm-12",{'reviewTable':isReviewTable})}>
		  						{isReviewTable && <ReviewTable data={data[row]} /> }
		  					</div>
	  					</div>
	  				);
	  			})
	  		}
		</div>
	);
}

export default ReviewContent;
