import React, { useEffect } from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';

import useVisualMode from '../../hooks/useVisualMode.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';

const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	useEffect(() => {
		if (props.interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (props.interview === null && mode === SHOW) {
			transition(EMPTY);
		}
	}, [props.interview, transition, mode]);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props.bookInterview(props.id, interview);
	}

	function destroy() {
		transition(DELETING, true);
		props.cancelInterview(props.id);
	}

	return (
		<article className='appointment' data-testid='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
			{mode === SHOW && props.interview && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === SAVING && <Status message='Saving' />}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you would like to delete?'
					onConfirm={destroy}
					onCancel={() => transition(SHOW)}
				/>
			)}
			{mode === DELETING && <Status message='Deleting' />}
		</article>
	);
}
