import React from 'react';

import 'components/DayListItem.scss';

const classNames = require('classnames');

export default function DayListItem(props) {
	const dayClass = classNames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': props.spots === 0
	});

	const formatSpots = (props) =>
		props.spots === 0
			? 'no spots remaining'
			: props.spots === 1
			? `${props.spots} spot remaining`
			: `${props.spots} spots remaining`;

	return (
		<li onClick={props.setDay} className={dayClass} data-testid='day'>
			<h2>{props.name}</h2>
			<h3>{formatSpots(props)}</h3>
		</li>
	);
}
