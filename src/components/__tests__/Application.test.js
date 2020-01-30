// import React from 'react';

// import axios from 'axios';

// import {
// 	getByText,
// 	getByTestId,
// 	queryByText,
// 	getAllByTestId,
// 	getByAltText,
// 	getByPlaceholderText,
// 	render,
// 	cleanup,
// 	waitForElement,
// 	fireEvent,
// 	prettyDOM
// } from '@testing-library/react';

// import Application from 'components/Application';

// afterEach(cleanup);

// describe('Application', () => {
// 	xit('changes the schedule when a new day is selected', async () => {
// 		const { getByText } = render(<Application />);
// 		await waitForElement(() => getByText('Monday'));
// 		fireEvent.click(getByText('Tuesday'));

// 		expect(getByText('Leopold Silvers')).toBeInTheDocument();
// 	});

// 	it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
// 		const { container } = render(<Application />);
// 		await waitForElement(() => getByText(container, 'Archie Cohen'));
// 		console.log(prettyDOM(container));
// 		const appointments = getAllByTestId(container, 'appointment');
// 		const appointment = appointments[0];
// 		fireEvent.click(getByAltText(appointment, 'Add'));
// 		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
// 			target: { value: 'Lydia Miller-Jones' }
// 		});
// 		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
// 		fireEvent.click(getByText(appointment, 'Save'));
// 		expect(getByText(appointment, 'Saving')).toBeInTheDocument();
// 		await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'));
// 		const day = getAllByTestId(container, 'day').find((day) =>
// 			queryByText(day, 'Monday')
// 		);
// 		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
// 	});

// 	xit('loads data, removes an interview and increases the spots remaining for Monday by 1', async () => {
// 		const { container } = render(<Application />);
// 		await waitForElement(() => getByText(container, 'Archie Cohen'));
// 		const appointments = getAllByTestId(container, 'appointment');
// 		const appointment = appointments[1];
// 		fireEvent.click(getByAltText(appointment, 'Delete'));
// 		expect(
// 			getByText(appointment, /are you sure you would like to delete/i)
// 		).toBeInTheDocument();
// 		fireEvent.click(getByText(appointment, 'Confirm'));
// 		// expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
// 		// await waitForElement(() => getByAltText(appointment, 'Add'));
// 		const day = getAllByTestId(container, 'day').find((day) =>
// 			queryByText(day, 'Monday')
// 		);
// 		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
// 	});

// 	xit('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
// 		const { container } = render(<Application />);
// 		await waitForElement(() => getByText(container, 'Archie Cohen'));
// 		const appointments = getAllByTestId(container, 'appointment');
// 		const appointment = appointments[1];
// 		fireEvent.click(getByAltText(appointment, 'Edit'));
// 		expect(getByTestId(appointment, 'student-name-input'));
// 		fireEvent.click(getByText(appointment, 'Save'));
// 		// expect(getByText(appointment, 'Saving')).toBeInTheDocument();
// 		// await waitForElement(() => getByAltText(appointment, 'Edit'));
// 		const day = getAllByTestId(container, 'day').find((day) =>
// 			queryByText(day, 'Monday')
// 		);
// 		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
// 	});

// 	xit('shows the save error when failing to save an appointment', async () => {
// 		const { container } = render(<Application />);
// 		await waitForElement(() => getByText(container, 'Archie Cohen'));
// 		const appointments = getAllByTestId(container, 'appointment');
// 		const appointment = appointments[0];
// 		fireEvent.click(getByAltText(appointment, 'Add'));
// 		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
// 			target: { value: 'Lydia Miller-Jones' }
// 		});
// 		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
// 		fireEvent.click(getByText(appointment, 'Save'));
// 		axios.put.mockRejectedValueOnce();
// 	});

// 	xit('shows the delete error when failing to delete an appointment', async () => {
// 		const { container } = render(<Application />);
// 		await waitForElement(() => getByText(container, 'Archie Cohen'));
// 		const appointments = getAllByTestId(container, 'appointment');
// 		const appointment = appointments[1];
// 		fireEvent.click(getByAltText(appointment, 'Delete'));
// 		expect(
// 			getByText(appointment, /are you sure you would like to delete/i)
// 		).toBeInTheDocument();
// 		fireEvent.click(getByText(appointment, 'Confirm'));
// 		axios.delete.mockRejectedValueOnce();
// 	});
// });
