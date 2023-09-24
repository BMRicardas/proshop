/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/message';
import { addToCart } from '../store/slices/cart.slice';

export function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // @ts-expect-error
  const { cartItems } = useSelector((state) => state.cart);

  async function addToCartHandler(product: any, qty: number) {
    dispatch(addToCart({ ...product, qty }));
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {/* @ts-expect-error */}
            {cartItems.map((item) => {
              const optionValues = Array.from(
                { length: item?.countInStock },
                (_, idx) => idx + 1,
              );

              return (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>€{item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={({
                          target,
                        }: ChangeEvent<HTMLSelectElement>) =>
                          addToCartHandler(item, Number(target.value))
                        }
                      >
                        {optionValues.map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light">
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc: number, item: { qty: number }) => acc + item.qty,
                  0,
                )}
                ) items
              </h2>
              €
              {cartItems
                .reduce(
                  (acc: number, item: { qty: number; price: number }) =>
                    acc + item.qty * item.price,
                  0,
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
