import React from 'react';

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

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch((err) => transition(ERROR_SAVE, true));
	}

	function destroy() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => transition(EMPTY))
			.catch((err) => transition(ERROR_DELETE, true));
	}

	return (
		<article className='appointment'>
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
			{mode === SHOW && (
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
					onCancel={() => back()}
				/>
			)}
			{mode === DELETING && <Status message='Deleting' />}
		</article>
	);
}
