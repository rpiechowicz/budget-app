import React, { useEffect, useState } from 'react'

const Item = ({ item, isActive, onClickHandler }) => (
	<div>
		<item.Trigger onClick={onClickHandler} />
		{isActive && item.children}
	</div>
)

const ToggleableList = ({ items, clickRef }) => {
	const [selectedItem, setSelectedItem] = useState()

	useEffect(() => {
		clickRef.current = setSelectedItem
	}, [clickRef, setSelectedItem])

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
