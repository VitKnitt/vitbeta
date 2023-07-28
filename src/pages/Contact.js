import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const Contact = () => {
  const URL = useSelector(selectUrl);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [year, setYear] = useState("");
  const [wrongYear, setWrongYear] = useState(false);
  const [odeslano, setOdeslano] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const date = new Date().getFullYear().toString();
    console.log(date === year);
    if (date === year) {
      const result = await fetch(URL + "contact", {
        method: "POST",
        body: JSON.stringify({ email, subject, message }),
        headers: { "Content-type": "application/json" },
      });
      if (result.status === 200) {
        setEmail("");
        setSubject("");
        setMessage("");
        setYear("");
        setOdeslano(true);
      } else {
        console.log("neodeslano");
      }
    } else {
      setWrongYear(true);
    }
  };

  if (wrongYear) {
    setTimeout(() => {
      setWrongYear(false);
    }, 3000);
  }

  if (odeslano) {
    setTimeout(() => {
      setOdeslano(false);
    }, 3000);
  }

  return (
    <div className="contact">
      <h1>Kontakt</h1>
      <div className="contactdescription">
        <img src="sit.png" alt="sit" />
        <p>
          máte li nějaký dotaz, připomínku či prosbu neváhejte se na mě obrátit
          přes dotazovací formulář
        </p>
      </div>

      <form
        onSubmit={(e) => handleSend(e)}
        type="submit"
        className="contactform"
      >
        <p id="alert">{wrongYear && "* wrong year inserted *"}</p>
        <p id="alert">{odeslano && "* message sent *"}</p>
        <div className="contact-initials">
          <div className="contact-email">
            <h2>Email:</h2>
            <input
              type="email"
              placeholder="johnDoe@email.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contact-subhject">
            <h2>předmět:</h2>
            <input
              type="text"
              placeholder="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <h2>zpráva:</h2>
        <textarea
          type="text"
          placeholder="your message:"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <h4>aktuální rok (kontrola spamu):</h4>
        <input
          type="text"
          placeholder="current year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Odeslat zprávu</button>
      </form>
    </div>
  );
};

export default Contact;
