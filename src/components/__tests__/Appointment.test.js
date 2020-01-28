import React from 'react';

import { render } from '@testing-library/react';

import Application from 'components/Application';

describe('Appointment', () => {
	it('renders without crashing', () => {
		render(<Application />);
	});
});
