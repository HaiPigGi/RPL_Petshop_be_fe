import React from 'react';
import ProductCard from './ProductCard';
import bg1 from '../public/kucing1.jpg';
import bg2 from '../public/kucing2.jpg';
import bg3 from '../public/kucing3.jpg';

class HomeProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: 'Cute Cat 1',
          imageUrl: bg1,
        },
        {
          id: 2,
          name: 'Cute Cat 2',
          imageUrl: bg2,
        },
        {
          id: 3,
          name: 'Cute Cat 3',
          imageUrl: bg3,
        },
      ],
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>News</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default HomeProduct;
