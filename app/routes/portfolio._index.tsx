const PortfolioIndex = () => {
  return (
    <main className="container mx-auto">
      <section>
        <h2 className="mb-2 text-3xl font-bold">About Me</h2>
        <p>Write a brief introduction about yourself here.</p>
      </section>
      <section>
        <h2 className="mb-2 text-3xl font-bold">Work Experience</h2>
        <ul>
          <li>
            <h3 className="text-2xl font-bold">Company A</h3>
            <p>Position: Software Engineer</p>
            <p>Duration: Jan 2020 - Present</p>
            <p>Responsibilities:</p>
            <ul>
              <li>Developed and maintained web applications using React and Node.js</li>
              <li>Implemented responsive designs using Tailwind CSS</li>
              <li>Collaborated with cross-functional teams to deliver high-quality software</li>
            </ul>
          </li>
          {/* Add more work experience here */}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-3xl font-bold">Projects</h2>
        <ul>
          <li>
            <h3 className="text-2xl font-bold">Project A</h3>
            <p>Description: A web application that allows users to create and share recipes.</p>
            <p>Technologies used: React, Node.js, MongoDB, Tailwind CSS</p>
          </li>
          {/* Add more projects here */}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-3xl font-bold">Skills</h2>
        <ul className="list-inside list-disc">
          <li>React</li>
          <li>Node.js</li>
          <li>MongoDB</li>
          <li>Tailwind CSS</li>
          {/* Add more skills here */}
        </ul>
      </section>
    </main>
  );
};

export default PortfolioIndex;
