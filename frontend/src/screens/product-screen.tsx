import { ChangeEvent, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Loader } from '../components/loader';
import Message from '../components/message';
import { Rating } from '../components/rating';
import { useGetProductDetailsQuery } from '../store/slices/products-api.slice';
import { addToCart } from '../store/slices/cart.slice';

export function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  function addToCartHandler() {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  const optionValues = Array.from(
    { length: product?.countInStock },
    (_, idx) => idx + 1,
  );

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {/* @ts-expect-error */}
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: €{product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: €{product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>€{product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label>Qty:</Form.Label>
                          </Col>
                          <Col>
                            <Form.Select
                              value={qty}
                              onChange={({
                                target,
                              }: ChangeEvent<HTMLSelectElement>) =>
                                setQty(Number(target.value))
                              }
                            >
                              {optionValues.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                      // TODO useCallback, arrow here or above?
                      onClick={() => addToCartHandler()}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
