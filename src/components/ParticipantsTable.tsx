import type { Participant } from "../App";

interface ParticipantsTableProps {
    participants: Participant[];
}

function ParticipantsTable({ participants }: ParticipantsTableProps) {
    return (
        <div className="card p-4 mb-4">
            <h3 className="mb-3">Participants List</h3>

            {participants.length === 0 ? (
                <p className="text-muted">No participants yet.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birth Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.email}</td>
                            <td>{p.phone}</td>
                            <td>{p.birthDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ParticipantsTable;
