import React from "react";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Link className="card" to="/journal">
        <Card
          heading="My Journal"
          description="Here is your personal journal"
        />
      </Link>
      <Link className="card" to="/events">
        <Card
          heading="Upcomming Events"
          description="Set upcomming events so that you don't forget"
        />
      </Link>
      <Link className="card" to="/tasks">
        <Card
          heading="Daily Tasks"
          description="Set daily tasks and achhieve them"
        />
      </Link>
      <Link className="card" to="/notes">
        <Card
          heading="Important Notes"
          description="Add important notes or links"
        />
      </Link>
    </div>
  );
};

export default Home;
