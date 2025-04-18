/* global ymaps */
import React, { useEffect } from 'react';
import api from '../api'; // Импортируем настроенный axios
import '../styles/MapComponent.css';

const MapComponent = () => {
  useEffect(() => {
    ymaps.ready(init);

    function init() {
      const map = new ymaps.Map('myMap', {
        center: [55.751244, 37.618423],
        zoom: 10,
      });

      const geoObjects = [];
      console.log(`Bearer ${localStorage.getItem('token')}`);

      api
        .get(`/api/map/points`)
        .then((response) => {
          // У axios данные уже в response.data
          const data = response.data;
          data.forEach((risk) => {
            let placemark;
            console.log(risk);

            if (risk.criticaly === 'GREEN') {
              placemark = new ymaps.Placemark(
                [risk.latitude, risk.longitude],
                {
                  balloonContent: createBalloon(risk),
                },
                {
                  preset:
                    risk.type === 'RISK'
                      ? 'islands#blueAttentionIcon'
                      : 'islands#blueInfoIcon',
                  iconColor: '#14f304',
                }
              );
            } else if (risk.criticaly === 'RED') {
              placemark = new ymaps.Placemark(
                [risk.latitude, risk.longitude],
                {
                  balloonContent: createBalloon(risk),
                },
                {
                  preset:
                    risk.type === 'Риск'
                      ? 'islands#blueAttentionIcon'
                      : 'islands#blueInfoIcon',
                  iconColor: '#ff0318',
                }
              );
            } else if (risk.criticaly === 'YELLOW') {
              placemark = new ymaps.Placemark(
                [risk.latitude, risk.longitude],
                {
                  balloonContent: createBalloon(risk),
                },
                {
                  preset:
                    risk.type === 'Риск'
                      ? 'islands#blueAttentionIcon'
                      : 'islands#blueInfoIcon',
                  iconColor: '#fdf903',
                }
              );
            } else if (risk.criticaly === 'ORANGE') {
              placemark = new ymaps.Placemark(
                [risk.latitude, risk.longitude],
                {
                  balloonContent: createBalloon(risk),
                },
                {
                  preset:
                    risk.type === 'Риск'
                      ? 'islands#blueAttentionIcon'
                      : 'islands#blueInfoIcon',
                  iconColor: '#f89604',
                }
              );
            } else {
              placemark = new ymaps.Placemark(
                [risk.latitude, risk.longitude],
                {
                  balloonContent: createBalloon(risk),
                },
                {
                  preset:
                    risk.type === 'Риск'
                      ? 'islands#blueAttentionIcon'
                      : 'islands#blueInfoIcon',
                  iconColor: '#3b3b3a',
                }
              );
            }

            map.geoObjects.add(placemark);
            geoObjects.push(placemark);
          });

          if (geoObjects.length > 0) {
            const bounds = map.geoObjects.getBounds();
            map.setBounds(bounds, { checkZoomRange: true });
          }
        })
        .catch((error) => {
          console.error('Error fetching map points:', error);
        });
    }

    function createBalloon(risk) {
      return `
        <div class="balloon-content">
          <img src="${risk.photo}" alt="Image" class="balloon-image" />
          <div class="balloon-info">
            <p><strong>${risk.type} ${risk.id}</strong> - ${risk.status}</p>
            <p>${risk.location}</p>
            <p>${risk.dateTimeFix}</p>
            <a href="/risks/${risk.id}">
              <button>Перейти</button>
            </a>
          </div>
        </div>
      `;
    }
  }, []);

  return <div id="myMap" style={{ width: '100%', height: '600px' }}></div>;
};

export default MapComponent;
