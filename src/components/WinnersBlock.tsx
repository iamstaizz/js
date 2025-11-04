import type { Participant } from "../App";

interface WinnersBlockProps {
    winners: Participant[];
    setWinners: React.Dispatch<React.SetStateAction<Participant[]>>;
    participants: Participant[];
}

function WinnersBlock({ winners, setWinners, participants }: WinnersBlockProps) {

    const getRandomWinner = () => {
        if (participants.length === 0) return;

        const available = participants.filter(
            (p) => !winners.some((w) => w.id === p.id)
        );

        if (available.length === 0) return;

        const randomIndex = Math.floor(Math.random() * available.length);
        const randomWinner = available[randomIndex];

        setWinners([...winners, randomWinner]);
    };


    const removeWinner = (id: number) => {
        setWinners(winners.filter((w) => w.id !== id));
    };


    const isButtonDisabled = winners.length >= 3 || participants.length === 0;

    return (
        <div className="card p-4 mb-4">
            <h3 className="mb-3">Winners</h3>

            <button
                className="btn btn-success mb-3"
                onClick={getRandomWinner}
                disabled={isButtonDisabled}
            >
                New Winner
            </button>

            {winners.length === 0 ? (
                <p className="text-muted">No winners yet.</p>
            ) : (
                <ul className="list-group">
                    {winners.map((w) => (
                        <li
                            key={w.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {w.name} ({w.email})
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeWinner(w.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WinnersBlock;
