import { Col, Container, Row } from 'react-bootstrap';

interface Props {}

// eslint-disable-next-line no-empty-pattern
export function Footer({}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
