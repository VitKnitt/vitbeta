import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("https://vit-betatest.onrender.com/forgotpassword", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json" },
      });

      if (result.ok) {
        setEmailSent(true);
        setEmail("");
        console.log("email send");
      } else {
        setNoMatch(true);
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
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
