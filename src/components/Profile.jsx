import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Profile.css';

const API_HOST = process.env.REACT_APP_API_HOST;

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    position: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Получение данных пользователя
  useEffect(() => {
    api
      .get(`/api/profile`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));

    // const fetchUserData = async () => {
    //   try {
    //     const response = await api.get(`${API_HOST}/api/profile`);
    //     setUser(response.data);
    //   } catch (err) {
    //     setError('Не удалось загрузить данные пользователя');
    //     console.error(err);
    //   }
    // };

    // fetchUserData();
  }, []);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Отправка обновленных данных
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/auth/update', user);
      setSuccess('Данные успешно обновлены');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Ошибка при обновлении данных');
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Мой профиль</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Редактировать
          </button>
        ) : (
          <div className="profile-actions">
            <button className="save-button" onClick={handleSubmit}>
              Сохранить
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Отмена
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-content">
        {isEditing ? (
          <form className="profile-form">
            <div className="form-group">
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Должность</label>
              <input
                type="text"
                name="position"
                value={user.position}
                onChange={handleChange}
              />
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Имя пользователя:</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Имя:</span>
              <span className="info-value">
                {user.firstName || 'Не указано'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Фамилия:</span>
              <span className="info-value">
                {user.lastName || 'Не указано'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Должность:</span>
              <span className="info-value">
                {user.position || 'Не указано'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
