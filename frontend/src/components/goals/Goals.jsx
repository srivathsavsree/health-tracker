import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { 
  Flag,
  Plus,
  Activity,
  Utensils,
  Weight,
  Heart
} from 'lucide-react';
import { HealthContext } from '../../context/HealthContext';
import './Goals.css';

const Goals = () => {
  const { addGoal } = useContext(HealthContext);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'weight',
    target: '',
    deadline: '',
    description: ''
  });

  const goalTypes = [
    { name: 'Weight', value: 'weight', icon: Weight, color: '#fcc419' },
    { name: 'Activity', value: 'activity', icon: Activity, color: '#6c5ce7' },
    { name: 'Nutrition', value: 'nutrition', icon: Utensils, color: '#20c997' },
    { name: 'Health', value: 'health', icon: Heart, color: '#ff6b6b' }
  ];

  const currentGoals = [
    {
      title: 'Lose Weight',
      type: 'weight',
      progress: 65,
      target: '70kg',
      deadline: '2024-06-30'
    },
    {
      title: 'Daily Steps',
      type: 'activity',
      progress: 80,
      target: '10,000 steps',
      deadline: '2024-12-31'
    },
    {
      title: 'Calorie Control',
      type: 'nutrition',
      progress: 45,
      target: '2000 cal/day',
      deadline: '2024-12-31'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGoal(newGoal);
      setNewGoal({
        title: '',
        type: 'weight',
        target: '',
        deadline: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleChange = (e) => {
    setNewGoal({
      ...newGoal,
      [e.target.name]: e.target.value
    });
  };

  const getGoalIcon = (type) => {
    const goalType = goalTypes.find(gt => gt.value === type);
    return goalType ? goalType.icon : Flag;
  };

  const getGoalColor = (type) => {
    const goalType = goalTypes.find(gt => gt.value === type);
    return goalType ? goalType.color : '#6c5ce7';
  };

  return (
    <Container className="goals-container">
      <div className="goals-header">
        <h1>Your Health Goals</h1>
        <p>Set and track your personal health objectives</p>
      </div>

      <Row>
        <Col lg={8}>
          <div className="goals-grid">
            {currentGoals.map((goal, index) => (
              <Card key={index} className="goal-card">
                <Card.Body>
                  <div className="goal-icon" style={{ backgroundColor: getGoalColor(goal.type) + '15' }}>
                    {React.createElement(getGoalIcon(goal.type), {
                      size: 24,
                      style: { color: getGoalColor(goal.type) }
                    })}
                  </div>
                  <h3>{goal.title}</h3>
                  <p className="goal-target">Target: {goal.target}</p>
                  <p className="goal-deadline">Deadline: {goal.deadline}</p>
                  <ProgressBar 
                    now={goal.progress} 
                    variant="custom"
                    style={{ '--progress-color': getGoalColor(goal.type) }}
                  />
                  <p className="goal-progress">{goal.progress}% Complete</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <Card className="add-goal-card">
            <Card.Body>
              <h2>
                <Plus size={20} className="me-2" />
                Add New Goal
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Goal Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newGoal.title}
                    onChange={handleChange}
                    placeholder="Enter goal title"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Goal Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={newGoal.type}
                    onChange={handleChange}
                    required
                  >
                    {goalTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Target</Form.Label>
                  <Form.Control
                    type="text"
                    name="target"
                    value={newGoal.target}
                    onChange={handleChange}
                    placeholder="Enter target value"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={newGoal.deadline}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={newGoal.description}
                    onChange={handleChange}
                    placeholder="Enter goal description"
                  />
                </Form.Group>

                <Button type="submit" className="submit-button">
                  <Plus size={18} className="me-2" />
                  Set Goal
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Goals; 