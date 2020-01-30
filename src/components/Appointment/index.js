import React, { useEffect } from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error.js';

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

	//Handles Appointment component transitions
	useEffect(() => {
		if (props.interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (props.interview === null && mode === SHOW) {
			transition(EMPTY);
		}
	}, [props.interview, transition, mode]);

	// Functions for saving and deleting Appointments
	// Make Axios requests via useApplicationData hook
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch((err) => {
				console.error(`An error occured while attempting to save: ${err}`);
				transition(ERROR_SAVE, true);
			});
	}

	function destroy() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch((err) => {
				console.error(`An error occured while attempting to delete: ${err}`);
				transition(ERROR_DELETE, true);
			});
	}

	// Appointment component handles transitions between modes
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
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => transition(SHOW)}
				/>
			)}
			{mode === SAVING && <Status message='Saving' />}
			{mode === ERROR_SAVE && (
				<Error
					message='An error occured while attempting to save appointment.'
					onClose={() => back()}
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
			{mode === ERROR_DELETE && (
				<Error
					message='An error occured while attempting to delete appointment.'
					onClose={() => back()}
				/>
			)}
		</article>
	);
}
