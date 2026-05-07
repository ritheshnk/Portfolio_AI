import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import editor from "../../Assets/Projects/codeEditor.png";
import NorthernTrust from "../../Assets/Projects/NTLogo.jpg";
import AIChatBot from "../../Assets/Projects/aiChatBot.webp";
import CoderGym from "../../Assets/codersgym.png";
function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={NorthernTrust}
              isBlog={true}
              title="Web Cash Movement :- Northern Trust"
              description="Web Cash Movement is a web based product that is avaliable for the Northern Trust client and internal parterns to initate domestic incoming and outoging payments againts their trust account. WCM supports diffrent kind of transactions like Wires, Transfer,checks etc."
              isButtonVisible={false}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={AIChatBot}
              isBlog={false}
              title="AI Chat Bot"
              description="Developed a context-aware chatbot integrated into a React portfolio using Groq's free-tier API (Llama 3 8B). Implements multi-turn chat history via a ref-based message queue, a system prompt for portfolio-scoped responses, and a local keyword fallback engine for offline resilience — all without any additional npm packages."

              isButtonVisible={false}
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={CoderGym}
              isBlog={false}
              title="CodersGym"
              description="A full-stack gym management web application with a Spring Boot backend and React + Tailwind CSS frontend. It supports user authentication (JWT), membership plan management, trainer listings, and booking functionality. The frontend features a modern landing page with sections for pricing, equipment, testimonials, and user profiles."

              isButtonVisible={false}
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
