import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { products } from '../mocks/products';
import { Product } from '../components/product';

export function HomeScreen() {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
