import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import loadingGif from 'public/static/images/loading.gif';

class DashboardSearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: props.isSearchBarLoading? props.loadingOrderId : '',
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			isSearchBarResponseSuccess,
			isSearchBarResponseError,
			onResponseError,
			router,
			loadingOrderId,
			activeRoute,
		} = nextProps;

		if (isSearchBarResponseSuccess && !this.props.isSearchBarResponseSuccess) {
			router.push('/order/' + loadingOrderId);
		} else if (isSearchBarResponseError && !this.props.isSearchBarResponseError) {
			onResponseError(`Sorry! We did not found any order starting with ${loadingOrderId}. Please check the order id and try again.`);
		}
	}

	handleSearchTextChange(event){
		this.setState({
			searchText: event.target.value
		});
	}

	handleSearchKeyDown(event){
		if (event.key === 'Enter') {
			this.handleSearchClick();
		}
	}

	handleSearchClick(){

		const { isSearchBarLoading } = this.props;
		const { searchText } = this.state;
		if (searchText && !isSearchBarLoading) {
			this.props.onSearch(searchText.trim());
		}
	}

	render() {
		const { searchText } = this.state;
		const { isSearchBarLoading } = this.props;
		return (
			<div className="dbSearchBar pull-right">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						value={searchText}
						disabled={isSearchBarLoading}
						onKeyPress={this.handleSearchKeyDown}
						onChange={this.handleSearchTextChange}
						placeholder="Search order by id..."
					/>
					<span className="input-group-btn">
						<button
							className="btn btn-default"
							type="button"
							disabled={!this.state.searchText || isSearchBarLoading}
							onClick={this.handleSearchClick}>
							Go
						</button>
					</span>
				</div>
			    {isSearchBarLoading && <figure className="loader"><img src={loadingGif} /></figure>}
			</div>
		);
	}
}

export default bindHandlers(DashboardSearchBar);
