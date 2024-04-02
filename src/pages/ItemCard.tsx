import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface ItemCardProps {
  item: {
    imageUrl: string;
    name: string;
    description: string;
    price: number;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Img variant="top" src={item.imageUrl} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
