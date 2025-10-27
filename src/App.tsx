import React, { useState, useMemo } from 'react';
// 1. App.tsx імпортує компонент UserCard
import UserCard from './components/UserCard';
// 2. App.tsx ОКРЕМО імпортує ТИП User
import type { User } from './components/UserCard';

// --- Дані (Завдання 5: 10 юзерів) ---
const allUsers: User[] = [
    { id: 1, firstName: 'Іван', lastName: 'Петренко', gender: 'male', age: 28, position: 'Frontend Developer', photo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=IP', hobbies: ['Кодування', 'Гітара', 'Футбол'] },
    { id: 2, firstName: 'Марія', lastName: 'Сидоренко', gender: 'female', age: 32, position: 'Project Manager', photo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=MS', hobbies: ['Йога', 'Подорожі'] },
    { id: 3, firstName: 'Олексій', lastName: 'Іванов', gender: 'male', age: 45, position: 'Backend Developer', photo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=OI', hobbies: ['Риболовля', 'Читання'] },
    { id: 4, firstName: 'Олена', lastName: 'Ковальчук', gender: 'female', age: 22, position: 'UI/UX Designer', photo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=OK', hobbies: ['Малювання', 'Танці', 'Велоспорт'] },
    { id: 5, firstName: 'Андрій', lastName: 'Мельник', gender: 'male', age: 17, position: 'Student', photo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=AM', hobbies: ['Відеоігри', 'Скейтбординг'] },
    { id: 6, firstName: 'Наталія', lastName: 'Шевченко', gender: 'female', age: 38, position: 'Data Scientist', photo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=NSh', hobbies: ['Шахи', 'Випічка'] },
    { id: 7, firstName: 'Сергій', lastName: 'Бондаренко', gender: 'male', age: 29, position: 'DevOps Engineer', photo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=SB', hobbies: ['Автомобілі', 'Походи'] },
    { id: 8, firstName: 'Вікторія', lastName: 'Лисенко', gender: 'female', age: 25, position: 'QA Engineer', photo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=VL', hobbies: ['Кіно', 'Плавання'] },
    { id: 9, firstName: 'Михайло', lastName: 'Ткаченко', gender: 'male', age: 51, position: 'CTO', photo: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=MT', hobbies: ['Гольф', 'Колекціонування'] },
    { id: 10, firstName: 'Юлія', lastName: 'Романенко', gender: 'female', age: 26, position: 'Marketing Specialist', photo: 'https://placehold.co/100x100/EC4899/FFFFFF?text=YR', hobbies: ['SMM', 'Фотографія'] }
];

// --- CSS-стилі для App компонента ---
const styles = `
  .appContainer {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 1.5rem;
  }
  .appHeader {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #1d4ed8;
    margin-bottom: 1.5rem;
  }
  .toolbar {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .filterButton {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    border: none;
    cursor: pointer;
  }
  .filterButton:hover {
    background-color: #dbeafe;
  }
  .filterButton.active {
    background-color: #2563eb;
    color: white;
  }
  .filterButton.inactive {
    background-color: #e5e7eb;
    color: #374151;
  }
  .userGrid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .userGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .userGrid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .emptyListMessage {
    text-align: center;
    font-size: 1.25rem;
    color: #6b7280;
    padding: 2.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

// --- Головний Компонент Додатка ---
const App: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');

    const filteredUsers = useMemo(() => {
        if (filter === 'all') {
            return allUsers;
        }
        return allUsers.filter(user => user.gender === filter);
    }, [filter]);

    const getButtonClass = (buttonFilter: typeof filter) => {
        return filter === buttonFilter ? 'filterButton active' : 'filterButton inactive';
    };

    return (
        <>
            <style>{styles}</style>

            <div className="appContainer">
                <h1 className="appHeader">Список користувачів</h1>

                <div className="toolbar">
                    <button onClick={() => setFilter('all')} className={getButtonClass('all')}>Всі</button>
                    <button onClick={() => setFilter('male')} className={getButtonClass('male')}>Чоловіки (male)</button>
                    <button onClick={() => setFilter('female')} className={getButtonClass('female')}>Жінки (female)</button>
                </div>

                {filteredUsers.length > 0 ? (
                    <div className="userGrid">
                        {filteredUsers.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                ) : (
                    <div className="emptyListMessage">
                        <p>Список юзерів пустий</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;