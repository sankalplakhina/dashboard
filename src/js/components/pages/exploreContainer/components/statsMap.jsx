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
		const geocoder = new google.maps.Geocoder();
		const map = new google.maps.Map(el, {
			zoom: 4,
		});
		markers.map(function(mark) {
			const markerData = data[mark];
			geocoder.geocode({
				'address': markerData.address
			}, function(results, status) {
				if (status == 'OK') {
					map.setCenter(results[0].geometry.location);
			        const marker = new google.maps.Marker({
			            position: results[0].geometry.location,
						icon: `/public/static/images/${markerData.icon}`,
						title: mark,
			            map: map,
			        });
			    } else {
			    	console.warn('Geocode was not successful for the following reason: ' + status);
			    }
			});
		});
	}

	render() {
		return (<div className="map" ref={(ref) => { this.el = ref; }} />);
	}
}

export default bindHandlers(StatsMap);
