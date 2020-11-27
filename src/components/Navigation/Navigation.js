import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components'
import { Container, NavigationWrapper, List } from './Navigation.css'

const Navigation = ({ items = [], RightElement }) => {
	return (
		<div>
			<Container>
				<NavigationWrapper>
					<List>
						{items.map(item => (
							<li key={item.to}>
								<Button variant="inline" to={item.to}>
									{item.content}
								</Button>
							</li>
						))}
					</List>
					{RightElement}
				</NavigationWrapper>
			</Container>
		</div>
	)
}

Navigation.propTypes = {
	items: PropTypes.array.isRequired,
}

export default Navigation
