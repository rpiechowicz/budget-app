import React from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from 'components'
import { Container, List } from './Navigation.css'

const Navgation = ({ items }) => {
	return (
		<div>
			<Container>
				<Wrapper>
					<List>
						{items.map(item => (
							<li key={item.to}>
								<Link to={item.to}>{item.content}</Link>
							</li>
						))}
					</List>
				</Wrapper>
			</Container>
		</div>
	)
}

export default Navgation
