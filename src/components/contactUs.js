import React from 'react';
import { InputGroup } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import banner_img from '../data/contact_us_banner.png'
import sales_support_logo from '../data/sales_support_logo.png'
import tech_support_logo from '../data/tech_support_logo.png'


export default function contactUs() {
  return (
    <>
      <Card.Img
        variant="top"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          margin: "0rem",
        }}
        src={banner_img}
        alt="banner"
      />

      <article className="sales_support_container">
        <Card className="contact_us_container">
        <div className="card_img_container">
              <Card.Img
                variant="top"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  margin: "0.5rem",
                }}
                src={sales_support_logo}
                alt="sales logo"
              />
            </div>
          <Card.Body>
            <Card.Text className = "sales_support_title_text">Sales Support</Card.Text>
            <div className = "contact_info_text">
              <Card.Text>PHONE: 1-800-HELP-NOW</Card.Text>
              <Card.Text>EMAIL: howto@hotmail.com</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </article>

      <article className="tech_support_container">
        <Card className="contact_us_container">
        <div className="card_img_container">
              <Card.Img
                variant="top"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  margin: "0.5rem",
                }}
                src={tech_support_logo}
                alt="tech logo"
              />
            </div>
          <Card.Body>
            <Card.Text className = "tech_support_title_text">Tech Support</Card.Text>
            <div className = "contact_info_text">
              <Card.Text>PHONE: 1-800-HELP-NOW</Card.Text>
              <Card.Text>EMAIL: howto@hotmail.com</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </article>
    </>
  );
}
