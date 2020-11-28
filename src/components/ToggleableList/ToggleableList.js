import React, { useState } from 'react'

const Item = ({ item, isActive, onClickHandler }) => (
	<div>
		<item.Trigger onClick={onClickHandler} />
		{isActive && item.children}
	</div>
)

const ToggleableList = ({ items }) => {
	const [selectedItem, setSelectedItem] = useState()

	return (
		<>
			{items.map(item => (
				<Item
					key={item.id}
					item={item}
					onClickHandler={setSelectedItem}
					isActive={selectedItem === item.id}
				/>
			))}
		</>
	)
}

export default ToggleableList
