import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import ParticipantsTable from "./components/ParticipantsTable";
import WinnersBlock from "./components/WinnersBlock";

export interface Participant {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
}

function App() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [winners, setWinners] = useState<Participant[]>([]);

    return (
        <div className="app-center">
            <div className="bg-white shadow p-4 rounded" style={{ maxWidth: "700px", width: "100%" }}>
                <h1 className="text-center mb-4">Lottery App</h1>

                <WinnersBlock
                    winners={winners}
                    setWinners={setWinners}
                    participants={participants}
                />

                <RegistrationForm
                    participants={participants}
                    setParticipants={setParticipants}
                />

                <ParticipantsTable participants={participants} />
            </div>
        </div>
    );
}

export default App;
