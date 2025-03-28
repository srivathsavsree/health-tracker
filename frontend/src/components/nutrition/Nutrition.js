import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../styles/Components.css';

const Nutrition = () => {
  const [calories, setCalories] = useState('');
  const [goal, setGoal] = useState('2000');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement calorie tracking logic
    console.log('Calories:', calories);
  };

  return (
    <Container fluid className="component-container">
      <Row className="mb-4">
        <Col>
          <h1 className="component-title">Nutrition Tracking</h1>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="component-card">
            <Card.Body>
              <h3 className="card-title">Log Calories</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Calories Consumed</Form.Label>
                  <Form.Control
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Enter calories"
                    required
                  />
                </Form.Group>
                <Button 
                  type="submit"
                  style={{ backgroundColor: '#78b2ac', borderColor: '#78b2ac' }}
                >
                  Add Entry
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="component-card">
            <Card.Body>
              <h3 className="card-title">Daily Goal</h3>
              <div className="goal-display">
                <div className="current-value">{calories || 0}</div>
                <div className="goal-value">Goal: {goal} cal</div>
                <div className="progress mt-3">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: `${Math.min((calories / goal) * 100, 100)}%`,
                      backgroundColor: '#78b2ac' 
                    }} 
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Nutrition; 