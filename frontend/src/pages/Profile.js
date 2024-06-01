import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Profile() {
    // Stan przechowujący informacje o użytkowniku
    const [userData, setUserData] = useState(null);

    // Pobranie danych użytkownika po załadowaniu komponentu
    useEffect(() => {
        // Symulacja pobierania danych użytkownika
        // Tutaj możesz wykonać zapytanie do API lub skorzystać z danych przechowywanych w lokalnym składowaniu (localStorage)
        // Poniżej przedstawiam przykład symulacji danych
        const mockUserData = {
            nickname: 'User123',
            email: 'user123@example.com',
            password: 'SecretPassword'
        };
        // Ustawienie danych użytkownika w stanie komponentu
        setUserData(mockUserData);
    }, []);

    return (
        <div className="container">
            <NavBar/>
            <div className="right">
                <div className="board">
                    Profile
                    <div className="separator"></div>
                    {/* Wyświetlenie informacji o użytkowniku */}
                    <div className="user-info">
                        {userData && (
                            <div>
                                <p>Nick: {userData.nickname}</p>
                                <p>Email: {userData.email}</p>
                                {/* Wyświetlenie ukrytego hasła z możliwością odsłonięcia */}
                                <p>Hasło: 
                                    <span className="reveal-password" onClick={() => alert(`Hasło: ${userData.password}`)}>
                                        Pokaż hasło
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
