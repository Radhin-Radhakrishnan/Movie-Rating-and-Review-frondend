import React from 'react'
import Favorite from '../Components/Favorites/Favorite'
import Header from '../Components/Header/Header'

const UserFavorite = () => {
    return (
        <div className='userFavorite_section'>
            <Header/>
            <Favorite/>
            
        </div>
    )
}

export default UserFavorite