import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Foodtbody from './homepage/Foodtbody'
import Loading from './Loading'
import { getAllFoodsAction } from './reduxfiles/actions/foodAction'
import SomeThingWentWrong from './SomeThingWentWrong'

export default function Homepage() {
    const dispatch = useDispatch()
    const allfoodsstate = useSelector(state => state.getAllFoodsReducer)
    const { loading, error, foods } = allfoodsstate

    const [search, setsearch] = useState('')
    const [catg, setcatg] = useState('all')

    useEffect(() => {
        dispatch(getAllFoodsAction())
    }, [])

    return (
        <div className="page-container">

            <div className="component-navbar">
                <div className="filter-parts">
                    <input type="text" className="search-input" placeholder="جستجو" className="filter-search" value={search} onChange={(e) => setsearch(e.target.value)} />
                    <select className="filter-catg" value={catg} onChange={(e) => setcatg(e.target.value)}>
                        <option value="all">همه</option>
                        <option value="withrice">چلو</option>
                        <option value="withoutrice">خوراک</option>
                        <option value="drink">نوشیدنی</option>
                        <option value="appetizer">پیش غذا</option>
                    </select>
                </div>
            </div>
            <h4 className="users-header">منوی رستوران</h4>
            <div className="homepage-menu shadow">
                {loading && <Loading />}
                {error && <SomeThingWentWrong />}
                {foods && (<Foodtbody foods={foods} search={search} catg={catg} />)}
            </div>
        </div>
    )
}
