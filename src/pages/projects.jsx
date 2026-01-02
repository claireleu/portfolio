import Ticket from '../components/tickets/Ticket.jsx';

export default function () {
    return (
        <div className="w-full min-h-screen text-white pt-[8rem]">
            <div className="flex flex-col items-center justify-start py-42 px-[30px] gap-10">
            < Ticket
                date="Feb 2025"
                purpose="Hack Canada 2025"
                title="THE RIFFLER"
                description="Arduino powered self playing guitar"
                tech={["Python", "C++", "CAD"]}
            />
            < Ticket
                date="Oct 2025"
                purpose="Technova 2025"
                title="FASHIONKILLA"
                description="Smart closet and semantice outfit creator, best use of MongoDB technova 2025"
                tech={["Python", "React", "CSS", "MongoDB"]}
            />
            < Ticket
                date="Sep 2025"
                purpose="Hack the North 2025"
                title="ROUVIA"
                description="Voice to text map agent for seemless hands-free route planning"
                tech={["Python", "React", "Docker"]}
            />
            </div>
        </div>
    )
}