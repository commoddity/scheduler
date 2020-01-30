import React from 'react';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';

import InterviewerListItem from 'components/InterviewerListItem.js';

export default function InterviewerList(props) {
	InterviewerList.propTypes = {
		interviewer: PropTypes.number,
		setInterviewer: PropTypes.func.isRequired
	};

	const interviewers = props.interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.interviewer}
				setInterviewer={() => props.setInterviewer(interviewer.id)}
			/>
		);
	});

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{interviewers}</ul>
		</section>
	);
}
