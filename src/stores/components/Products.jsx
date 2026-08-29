import React from 'react';
import Mobiles from './Mobiles';
import Computers from './Computers';
import Books from './Books';
import Furniture from './Furniture';
import Men from './Men';
import Fridge from './Fridge';
import Ac from './Ac';
import Woman from './Woman';
import Watches from './Watches';
const Products = () => {
  return (
    <div>
      <Mobiles />
      <Computers />
      <Watches />
      <Furniture />
      <Ac />
      <Fridge />
      <Men />
      <Woman />
     
    </div>
  );
};

export default Products;