import "./Ticket.css";
import barcode from '../../assets/barcode.svg';
import flightcode from '../../assets/ticketflightcode.svg';

export default function Ticket({
  date,
  title,
  description,
  tags
}) {
  return (
    <div className="ticket-wrapper transition-transform duration-300 ease-in-out hover:rotate-4">


      <div className="ticket-main">
        <div className="ticket-decorations" />
        <div className="flex flex-row gap-[20px] jusitfy-center">
          <div className="ticket-main-left">
              <div className="ticket-header">
                  <div className="ticket-name">
                  <span className="label">NAME</span>
                  <span className="value">Claire</span>
                  </div>

                  <div className="ticket-date">
                  <span className="label">DATE</span>
                  <span className="value">{date}</span>
                  </div>
              </div>

              <div className="ticket-gate">
                  <span className="label">GATE</span>
                  <h2 className="ticket-title">{title.toUpperCase()}</h2>
              </div>
          </div>
          
          <div className="ticket-main-right">
            <p className="ticket-description">{description}</p>
          </div>
        </div>
        <ul className="tech-list">
          {tags.map((item) => (
            <li key={item} className="tech-item">{item}</li>
          ))}
        </ul>
      </div>

      <div className="ticket-sidebar">
        <div className="barcode" >
            <img src={barcode} alt="barcode" />
        </div>
        <div className="flightcode">
            <img src={flightcode} alt='flight number' />
        </div>
      </div>

    </div>
  );
}
