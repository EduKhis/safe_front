/* global ymaps */
import React, { useEffect } from 'react';
import '../styles/MapComponent.css';

const API_HOST = process.env.REACT_APP_API_HOST; // Вынесенный хост

const MapComponent = () => {
  useEffect(() => {
    ymaps.ready(init);

    function init() {
      const map = new ymaps.Map("myMap", {
        center: [55.751244, 37.618423],
        zoom: 10
      });

      const geoObjects = [];

      // Запрос маркеров с сервера
      fetch(`${API_HOST}/map/points`)
        .then(response => response.json())
        .then(data => {
          data.forEach(risk => {
            let placemark;
            console.log(risk)

            if (risk.criticality === 'GREEN') {
              placemark = new ymaps.Placemark([risk.latitude, risk.longitude], {
                balloonContent: createBalloon(risk)
              }, {
                preset: risk.type === 'RISK' ? 'islands#blueAttentionIcon' : 'islands#blueInfoIcon',
                iconColor: '#14f304'
              });
            } else if (risk.criticality === 'RED') {
              placemark = new ymaps.Placemark([risk.latitude, risk.longitude], {
                balloonContent: createBalloon(risk)
              }, {
                preset: risk.type === 'Риск' ? 'islands#blueAttentionIcon' : 'islands#blueInfoIcon',
                iconColor: '#ff0318'
              });
            } else if (risk.criticality === 'YELLOW') {
              placemark = new ymaps.Placemark([risk.latitude, risk.longitude], {
                balloonContent: createBalloon(risk)
              }, {
                preset: risk.type === 'Риск' ? 'islands#blueAttentionIcon' : 'islands#blueInfoIcon',
                iconColor: '#fdf903'
              });
            } else if (risk.criticality === 'ORANGE') {
              placemark = new ymaps.Placemark([risk.latitude, risk.longitude], {
                balloonContent: createBalloon(risk)
              }, {
                preset: risk.type === 'Риск' ? 'islands#blueAttentionIcon' : 'islands#blueInfoIcon',
                iconColor: '#f89604'
              });
            } else {
              placemark = new ymaps.Placemark([risk.latitude, risk.longitude], {
                balloonContent: createBalloon(risk)
              }, {
                preset: risk.type === 'Риск' ? 'islands#blueAttentionIcon' : 'islands#blueInfoIcon',
                iconColor: '#3b3b3a'
              });
            }

            map.geoObjects.add(placemark);
            geoObjects.push(placemark);
          });

          if (geoObjects.length > 0) {
            const bounds = map.geoObjects.getBounds();
            map.setBounds(bounds, { checkZoomRange: true });
          }
        })
        .catch(error => {
          console.error('Error fetching map points:', error);
        });
    }

    function createBalloon(risk) {
      return `
        <div class="balloon-content">
          <img src="${risk.photo}" alt="Image">
          <div class="balloon-info">
            <p><strong>${risk.type} ${risk.id}</strong> - ${risk.status}</p>
            <p>${risk.location}</p>
            <p>${risk.dateTimeFix}</p>
            <a href="/risk/${risk.id}"></a>
            <button>Перейти</button>
          </div>
        </div>
      `;
    }
  }, []);

  return <div id="myMap" style={{ width: '100%', height: '600px' }}></div>;
};

export default MapComponent;