import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/RiskDetail.css';

const API_HOST = process.env.REACT_APP_API_HOST;

const RiskDetail = () => {
  const { riskId } = useParams(); // Получаем riskId из URL
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_HOST}/api/risks/${riskId}`)
      .then(response => {
        setRisk(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные о риске');
        setLoading(false);
      });
  }, [riskId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!risk) return <div>Риск не найден</div>;

  return (
    <div className="risk-detail">
      <h2>Информация о риске</h2>
      <div className="risk-info">
        <p><strong>ID:</strong> {risk.id}</p>
        <p><strong>Описание:</strong> {risk.description}</p>
        <p><strong>Категория:</strong> {risk.category}</p>
        <p><strong>Критичность:</strong> {risk.criticaly}</p>
        <p><strong>Дата:</strong> {risk.dateTimeFix}</p>
        <p><strong>Участок:</strong> {risk.sector}</p>
        <p><strong>Место:</strong> {risk.section}</p>
      </div>
    </div>
  );
};

export default RiskDetail;