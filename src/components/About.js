import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-4 has-text-centered">About the UFTC app</h1>
        <div className="notification">
          A single-page applipation for a team to track their progress in the{' '}
          <strong>Ultimate Functional Training Challenge</strong>, a fun exercise competition
          designed to promote an active lifestyle and get software engineers up from their desks
          during the work day.
          <p style={{ marginTop: '1em' }}>
            Participants record their exercises and gain points, trying to reach a set goal. Upon
            gaining enough points on a single activity, or during a special one-day-challenge, the
            challengers are rewarded with badges.
          </p>
        </div>

        <p style={{ padding: '1em', marginBottom: '1em' }}>
          This was a capstone project for a University of Turku{' '}
          <a href="https://tech.utu.fi/fi/full-stack/" rel="noopener">
            Full Stack bootcamp
          </a>
          , which took place between March and August of 2019. A team of five was given two months
          and free hands to design and build it. Original concept and support was provided by
          Ambientia.
        </p>

        <div className="columns is-centered is-size-6">
          <div className="column">
            <div className="notification">
              <h1 className="has-text-weight-bold">Development team</h1>
              <table className="is-size-7" style={{ width: '200px' }}>
                <tbody>
                  <tr>
                    <td>Sirje Hanski</td>
                    <td>
                      <a href="https://www.linkedin.com/in/sirje-hanski-352210116/">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/sirjeh">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Salomon Honkala</td>
                    <td>
                      <a href="https://www.linkedin.com/in/salomon-honkala-99579666/">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/shonkala">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Marko Mattila</td>
                    <td>
                      <a href="https://www.linkedin.com/in/marko-mattila-46577a186/">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/MMattila75">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Jari Mäki</td>
                    <td>
                      <a href="https://www.linkedin.com/in/jari-m%C3%A4ki-7b2253185/">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/jarigithub">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Simo Savonen</td>
                    <td>
                      <a href="https://www.linkedin.com/in/simosavonen/">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/simosavonen">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="column">
            <div className="notification">
              <h1 className="has-text-weight-bold">Tech stack</h1>
              <table className="is-size-7" style={{ width: '200px' }}>
                <thead>
                  <tr>
                    <th>Front-end</th>
                    <th>Back-end</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>React</td>
                    <td>Express</td>
                  </tr>
                  <tr>
                    <td>Bulma</td>
                    <td>Passport</td>
                  </tr>
                  <tr>
                    <td>ApexCharts</td>
                    <td>MongoDB</td>
                  </tr>
                  <tr>
                    <td>React-toastify</td>
                    <td>Mongoose</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="column">
            <div className="notification">
              <h1 className="has-text-weight-bold">Acknowledgements</h1>
              <ul className="is-size-7">
                <li>
                  <a href="https://fullstackopen.com/">FullStackOpen</a> - Helsinki University
                  course material
                </li>
                <li>
                  <a href="https://www.ambientia.fi/">Ambientia</a> - Original concept and support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
