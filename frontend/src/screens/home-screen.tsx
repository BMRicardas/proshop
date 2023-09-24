import { Col, Row } from 'react-bootstrap';

import { Product } from '../components/product';
import type { Product as TProduct } from '../types/product';
import { useGetProductsQuery } from '../store/slices/products-api.slice';

export function HomeScreen() {
  // @ts-expect-error
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <h2>Loading...</h2>
  ) : error ? (
    // @ts-expect-error
    <div>{error?.data?.message || error?.error}</div>
  ) : (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: TProduct) => {
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
