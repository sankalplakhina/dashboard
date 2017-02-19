import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { loadScriptAsync } from 'src/js/helpers/utils';

const API_KEY = 'AIzaSyD3NkOtYp3ZBo8TLpg1nvf77oAMwUlQfX4';

class StatsMap extends React.Component {

	componentDidMount(){
		if (!(window.google && window.google.maps)) {
			return loadScriptAsync(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`, this.handleInitMap);
		}
		return setTimeout(this.handleInitMap); // adding delay to allow initial render to complete
	}

	handleInitMap() {
		const { props: { data }, el } = this;
		const { markers } = data;
		const map = new google.maps.Map(el, {
			zoom: 4,
			center: new google.maps.LatLng(-25.363, 131.044)
		});
		markers.map(function(mark) {
			const markerData = data[mark];
			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(markerData.lat, markerData.lang),
				// icon: `/public/static/images/${markerData.icon}`,
				title: mark,
				map: map
			});
		});
	}

	render() {
		return (<div className="map" ref={(ref) => { this.el = ref; }} />);
	}
}

export default bindHandlers(StatsMap);
