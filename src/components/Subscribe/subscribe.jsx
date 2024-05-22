import React, { useState, useEffect } from 'react';
import './Subscribe.css';

const Subscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const text = "Welcome:)";
    let newText = '';
    const interval = setInterval(() => {
      if (newText.length < text.length) {
        newText += text[newText.length];
        setWelcomeText(newText);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the delay (100ms here) to control the speed

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = () => {
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    fetch('http://localhost:8000/blog/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('Subscription failed');
        }
      })
      .then(data => {
        setIsSubscribed(true);
        // setMessage('Successfully subscribed to Newsletter.');
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div>
      <div>
        <h2 style={{ marginTop: "10%", marginBottom: "1rem", fontSize: "1.5rem", marginLeft: '30%' }}>{welcomeText}</h2>
        <h2 className="animatedHeader" style={{ color: "rgba(0, 0, 0, 0.5)", fontWeight: "normal", opacity: 0.8, animation: "slideIn 0.5s ease-in-out forwards", marginLeft: '30%' }}>
          To join our community, fill in your email below,
        </h2>
        <form className={`subscription ${isSubscribed ? 'done' : ''}`}>
          <input
            className="add-email"
            type="email"
            placeholder="subscribe@me.now"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribed}
          />
          <button className="submit-email" type="button" onClick={handleSubscribe} disabled={isSubscribed}>
            <span className="before-submit" style={{ justifyContent: "center" }}>Subscribe</span>
            <span className="after-submit">Thank you for subscribing!</span>
          </button>
        </form>
        {message && <p style={{ color: isSubscribed ? 'green' : 'red', marginLeft: '30%' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Subscribe;
