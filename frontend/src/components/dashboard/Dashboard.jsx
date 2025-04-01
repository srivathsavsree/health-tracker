import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartPulse,
  faPersonRunning,
  faUtensils,
  faBed,
  faWeight,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { AuthContext } from '../../context/AuthContext';
import { HealthContext } from '../../context/HealthContext';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { healthData, fetchHealthData } = useContext(HealthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchHealthData();
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchHealthData]);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity Level',
        data: [65, 59, 80, 81, 56, 55, 70],
        fill: false,
        borderColor: '#6c5ce7',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Weekly Activity Overview'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const healthMetrics = [
    {
      title: 'Heart Rate',
      value: '72 bpm',
      icon: faHeartPulse,
      color: '#ff6b6b'
    },
    {
      title: 'Activity',
      value: '8,439 steps',
      icon: faPersonRunning,
      color: '#6c5ce7'
    },
    {
      title: 'Nutrition',
      value: '1,800 cal',
      icon: faUtensils,
      color: '#20c997'
    },
    {
      title: 'Sleep',
      value: '7h 30m',
      icon: faBed,
      color: '#339af0'
    },
    {
      title: 'Weight',
      value: '68 kg',
      icon: faWeight,
      color: '#fcc419'
    },
    {
      title: 'Progress',
      value: '85%',
      icon: faChartLine,
      color: '#51cf66'
    }
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Container className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's your health summary for today</p>
      </div>

      <Row className="metrics-grid">
        {healthMetrics.map((metric, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card className="metric-card">
              <Card.Body>
                <div className="metric-icon" style={{ backgroundColor: metric.color + '15' }}>
                  <FontAwesomeIcon icon={metric.icon} style={{ color: metric.color }} />
                </div>
                <div className="metric-info">
                  <h3>{metric.title}</h3>
                  <p>{metric.value}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="chart-card">
            <Card.Body>
              <Line data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 