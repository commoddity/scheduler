import React from 'react';

import 'components/InterviewerListItem.scss';

const classNames = require('classnames');

export default function InterviewerListItem(props) {
	const itemClass = classNames('interviewers', {
		'interviewers__item--selected': props.selected
	});

	return (
		<li className={itemClass} onClick={props.setInterviewer}>
			<img
				className='interviewers__item-image'
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
}
