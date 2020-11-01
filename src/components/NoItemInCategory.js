import React from 'react'

function NoItemInCategory() {
    return (
        <div className="no-item-in-category">
            <img src={`../img/no-item.png`} className="no-item-img"></img>
            <div className="no-item-div">
                Sorry ! No product is available in selected category.
            </div>
        </div>
    )
}

export default NoItemInCategory
