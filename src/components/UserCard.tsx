import React from 'react';
// 1. UserCard.tsx імпортує СВІЙ CSS
import './UserCard.css';

// --- Типізація (для TypeScript) ---
// 2. Експортуємо інтерфейс User, щоб App.tsx міг його бачити
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    age: number;
    position: string;
    photo: string;
    hobbies: string[];
}

interface UserCardProps {
    user: User;
}

// --- Компонент Картки Користувача ---
const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const cardBorderClass = user.age > 30
        ? 'borderColorExperienced'
        : 'borderColorYoung';

    return (
        <div className={`userCard ${cardBorderClass}`}>
            <div className="cardContent">
                <div className="header">
                    <img
                        src={user.photo}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                    <div className="headerInfo">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>{user.position}</p>
                    </div>
                </div>

                <div className="userInfo">
                    <p>
                        <span className="label">Стать:</span>
                        {user.gender === 'male' ? ' Чоловік' : ' Жінка'}
                    </p>

                    {user.age > 18 && (
                        <p>
                            <span className="label">Вік:</span> {user.age} років
                        </p>
                    )}
                    {user.age <= 18 && (
                        <p>
                            <span className="label">Вік:</span> (менше або 18)
                        </p>
                    )}

                    {user.hobbies && user.hobbies.length > 0 && (
                        <div>
                            <h3>Хобі:</h3>
                            <ul>
                                {user.hobbies.map((hobby, index) => (
                                    <li key={index}>
                                        {hobby}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard;