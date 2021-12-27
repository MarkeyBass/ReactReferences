import React from 'react'
// in order to use this component as arout we have to register it as a new rout
// This component is defined as a dinemic rout

import { useParams } from 'react-router'

const ProductDetail = (props) => {

  // params is an object where the keys are the dinamic segments leading to the page 
  const params = useParams();

  console.log({productId: params.productId});



  return (
    <section>
      <h1>Product Detail</h1>
      <p>params {params.productId}</p>
    </section>
  )
}

export default ProductDetail
