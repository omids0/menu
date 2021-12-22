import React from 'react'
import { Table } from 'react-bootstrap'
import FoodList from './FoodList'

export default function Foodtbody({ foods, search, catg }) {
      return (
            <div>
                  <Table striped bordered hover responsive>
                        <thead>
                              <tr>
                                    <th>#</th>
                                    <th>نام</th>
                                    <th>دسته بندی</th>
                                    <th>قیمت</th>
                                    <th>تعداد</th>
                                    <th>مجموع قیمت</th>
                                    <th>افزودن</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    foods.filter(food =>
                                          search && catg === 'all' ?
                                                food.name.toLowerCase().includes(search.toLowerCase()) :
                                                catg !== 'all' ?
                                                      food.name.toLowerCase().includes(search.toLowerCase()) && food.category === catg
                                                      : food).map((food, i) => (
                                                            <FoodList food={food} i={i} />
                                                      ))
                              }
                        </tbody>
                  </Table>
            </div>
      )
}
