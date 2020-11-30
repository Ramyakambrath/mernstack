import React from 'react'
import ItemModal from './ItemModal'
import ShoppingList from './ShoppingList'

export default function CombineModalShoppingList() {
    return (
        <div>
            <ItemModal/>
            <ShoppingList/>
        </div>
    )
}
