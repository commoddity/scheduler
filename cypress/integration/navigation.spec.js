describe('Navigation', () => {
	it('should visit root', () => {
		cy.visit('/');
	});

	it('should navigate to Tuesday', () => {
		cy.visit('/');

		cy.get('li')
			.contains('Tuesday')
			.click()
			.parent()
			.should('have.class', 'day-list__item day-list__item--selected')
			.should('have.css', 'background-color', 'rgb(242, 242, 242)');
	});
});
