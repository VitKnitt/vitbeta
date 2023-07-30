import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const ForgotPassword = () => {
  const URL = useSelector(selectUrl);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    const result = await fetch(URL + "forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-type": "application/json" },
    }).catch((err) => console.log(err));

    if (result.ok) {
      setEmailSent(true);
      setEmail("");
      console.log("email send");
    } else {
      setNoMatch(true);
      console.log("wrong email or internal error");
    }
  };

  if (emailSent) {
    setTimeout(() => {
      setEmailSent(false);
    }, 4000);
  }

  if (noMatch) {
    setTimeout(() => {
      setNoMatch(false);
    }, 4000);
  }

  return (
    <div className="forgotpassword">
      <h2>reset hesla</h2>
      <form onSubmit={handleSend} className="forgotpasswordform">
        <h2>vaše emailová adresa:</h2>
        <input
          type="email"
          placeholder="johnDoe@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">odeslat</button>
      </form>
      {emailSent && <p>do vaší schránky byl odeslán email</p>}
      {noMatch && <p>špatný email</p>}
    </div>
  );
};

export default ForgotPassword;
