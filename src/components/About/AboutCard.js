import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m <span className="purple">Rithesh NK</span>{" "}
            from <span className="purple">Mangalore, India</span>.
            <br />
            I’m currently working as a{" "}
            <span className="purple">Software Developer</span> at{" "}
            <span className="purple">Coforge Limited</span>.
            <br />I am a Btech Engineer in {" "}
            <span className="purple">Computer Science and Engineering</span> from{" "}
            <span className="purple">A.J. Institute of Engineering and Technology</span>.
            <br />
            <br />
            Outside of coding, I love keeping myself busy with :
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games 🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Riding Bikes 🏍️, and Cars 🚗
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling and Exploring New Places 🌍
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "I always strive to build a better version of myself everyday by overloading myself with knowledge and positivity!"{" "}
          </p>
          <footer className="blockquote-footer">Rithesh NK</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
