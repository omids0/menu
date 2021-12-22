import React, { useState } from 'react'

export default function HomepageNav() {
    const [search, setsearch] = useState('')
    const [catg, setcatg] = useState('all')

    function filterFoods() {
        console.log('filterd');
    }
    return (
        <div className="component-navbar">
            <div className="filter-parts">
                <input type="text" className="search-input" placeholder="جستجو" className="filter-search"/>
                <select className="filter-catg">
                    <option value="all">همه</option>
                    <option value="withrice">چلو</option>
                    <option value="withoutrice">خوراک</option>
                    <option value="drink">نوشیدنی</option>
                    <option value="appetizer">پیش غذا</option>
                </select>
                <button className='filter-btn' onClick={filterFoods} >جستجو</button>
            </div>
        </div>
    )
}
