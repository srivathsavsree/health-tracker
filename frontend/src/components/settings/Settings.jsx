import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { User, Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import config from '../../config';
import './Settings.css';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (password.newPassword !== password.confirm) {
      setMessage({ type: 'danger', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      await axios.put(`${config.API_BASE_URL}/api/user/change-password`, {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPassword({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Failed to update password' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${config.API_BASE_URL}/api/user/delete`, {
        data: { password: deletePassword }
      });
      setShowDeleteModal(false);
      await logout();
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Failed to delete account'
      });
      setShowDeleteModal(false);
    } finally {
      setDeleteLoading(false);
      setDeletePassword('');
    }
  };

  return (
    <Container className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account information</p>
      </div>

      {message.text && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="settings-card">
            <Card.Body>
              <h2>
                <User size={20} className="me-2" />
                Change Password
              </h2>
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={password.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="settings-card danger-zone">
            <Card.Body>
              <h2>
                <Trash2 size={20} className="me-2" />
                Delete Account
              </h2>
              <p className="text-danger mb-3">
                Warning: This action cannot be undone. All your data will be permanently deleted.
              </p>
              <Button 
                variant="danger" 
                className="delete-button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter your password to confirm account deletion:</p>
          <Form.Control
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            disabled={!deletePassword || deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete My Account'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Settings; 