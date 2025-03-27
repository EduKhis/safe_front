import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Импортируем иконку
import { v4 as uuidv4 } from 'uuid'; // Импортируем uuid
import '../styles/RiskForm.css';

const API_HOST = process.env.REACT_APP_API_HOST; // Вынесенный хост

const RiskForm = ({ onClose }) => {
  const [type, setType] = useState('risk');
  const [categories, setCategories] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [importance, setImportance] = useState('none');
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [point, setPoint] = useState('');
  const [pointError, setPointError] = useState('');

  useEffect(() => {
    fetch(`${API_HOST}/api/getCategories?type=${type}`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Ошибка загрузки категорий:', error));
  }, [type]);

  useEffect(() => {
    fetch(`${API_HOST}/api/getDivisions`)
      .then((response) => response.json())
      .then((data) => setDivisions(data))
      .catch((error) => console.error('Ошибка загрузки подразделений:', error));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      fetch(`${API_HOST}/api/getSector?division=${selectedDivision}`)
        .then((response) => response.json())
        .then((data) => setSectors(data))
        .catch((error) => console.error('Ошибка загрузки участков:', error));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedSector) {
      fetch(`${API_HOST}/api/getSection?sector=${selectedSector}`)
        .then((response) => response.json())
        .then((data) => setSections(data))
        .catch((error) => console.error('Ошибка загрузки мест:', error));
    }
  }, [selectedSector]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Ваш браузер не поддерживает геолокацию.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPoint(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.error('Ошибка получения местоположения:', error);
        alert('Не удалось получить местоположение.');
      }
    );
  };

  const validateCoordinates = (coordinates) => {
    const regex = /^-?\d{1,2}\.\d{6},\s*-?\d{1,3}\.\d{6}$/;
    return regex.test(coordinates);
  };

  const handlePointChange = (e) => {
    const value = e.target.value;
    setPoint(value);
    if (!validateCoordinates(value)) {
      setPointError(
        'Некорректный формат координат. Ожидается формат: 41.315467, 69.240471'
      );
    } else {
      setPointError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCoordinates(point)) {
      setPointError(
        'Некорректный формат координат. Ожидается формат: 41.315467, 69.240471'
      );
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    formData.append('division', selectedDivision);
    formData.append('sector', selectedSector);
    formData.append('section', selectedSection);
    formData.append('category', selectedCategory);
    formData.append('importance', importance);
    formData.append('isAnonymous', isAnonymous);
    formData.append('point', point);

    files.forEach((file) => {
      const uniqueFileName = `${uuidv4()}-${file.name}`;
      formData.append('files', file, uniqueFileName);
    });

    try {
      const response = await axios.post(
        `${API_HOST}/api/submitForm`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        alert('Форма успешно отправлена');
      } else {
        alert('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Ошибка при отправке формы');
    }
  };

  return (
    <div className="risk-form">
      <h2>Создать запись</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Риск или Идея?</label>
          <div className="radio-group">
            <input
              type="radio"
              id="risk"
              name="type"
              value="risk"
              checked={type === 'risk'}
              onChange={() => setType('risk')}
            />
            <label htmlFor="risk">Риск</label>
            <input
              type="radio"
              id="idea"
              name="type"
              value="idea"
              checked={type === 'idea'}
              onChange={() => setType('idea')}
            />
            <label htmlFor="idea">Идея</label>
          </div>
        </div>
        <div className="form-group">
          <label>Описание *</label>
          <textarea
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Структурное подразделение</label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            required
          >
            <option value="">Выберите подразделение</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Участок</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            required
          >
            <option value="">Выберите участок</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Место</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            required
          >
            <option value="">Выберите место</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Категория</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Критичность риска</label>
          <div className="circle-group">
            {['GREEN', 'YELLOW', 'ORANGE', 'RED', 'NONE'].map((level) => (
              <React.Fragment key={level}>
                <input
                  type="radio"
                  id={`importance-${level}`}
                  name="importance"
                  value={level}
                  checked={importance === level}
                  onChange={() => setImportance(level)}
                />
                <label
                  htmlFor={`importance-${level}`}
                  className="circle"
                  style={{
                    backgroundColor:
                      level === 'GREEN'
                        ? 'green'
                        : level === 'YELLOW'
                        ? 'yellow'
                        : level === 'ORANGE'
                        ? 'orange'
                        : level === 'RED'
                        ? 'red'
                        : 'gray',
                  }}
                ></label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Координаты</label>
          <div className="location-input">
            <input
              type="text"
              value={point}
              onChange={handlePointChange}
              placeholder="55.709608, 37.544670"
              style={{ borderColor: pointError ? 'red' : '#ccc' }}
            />
            <FaMapMarkerAlt
              className="location-icon"
              onClick={handleGetLocation}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Прикрепить файлы</label>
          <input type="file" multiple onChange={handleFileChange} />
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label>Отправить анонимно *</label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
        </div>
        <button className="button" type="submit">
          Отправить
        </button>
        <button className="button" type="button" onClick={onClose}>
          Закрыть
        </button>
      </form>
    </div>
  );
};

export default RiskForm;
