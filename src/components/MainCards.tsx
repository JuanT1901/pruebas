'use client'

import { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import styles from 'app/styles/components/MainCards.module.scss';

const cards = [
  { title: 'Estudiantes', icon: <FaUserGraduate />, color: '#2196F3' },
  { title: 'Profesores', icon: <FaChalkboardTeacher />, color: '#FFC107' },
  { title: 'Directivos', icon: <FaUserTie />, color: '#FF5722' },
];

const MainCards = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Plataformas</h2>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`${styles.card} ${isActive ? styles.active : ''}`}
              style={{
                borderColor: card.color,
                backgroundColor: isActive ? card.color : 'transparent',
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={styles.icon}
                style={{ color: isActive ? '#fff' : card.color }}
              >
                {card.icon}
              </div>
              <h3 style={{ color: isActive ? '#fff' : 'inherit' }}>{card.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCards;
