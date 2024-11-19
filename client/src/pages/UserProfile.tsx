import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

import { useParams } from "react-router-dom";
import Auth from "../utils/auth";

import { Container, Row, Col } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import PageTab from "../components/PageTab";
import "../css/userprofile.css";

interface IUserProfile {
  username: string;
  role: string;
  description: string;
  technologies: string[];
  links: string[];
}

const UserProfile = ({ username }: { username?: string }) => {
  const { username: paramsUsername } = useParams();
  const loggedInUser = Auth.getProfile().data.username;

  const displayedUsername = username || paramsUsername || loggedInUser;

  // console.log(displayedUsername);

  if (!displayedUsername) {
    return <p>Error: No username available.</p>;
  }

  const isOwnProfile = loggedInUser === username;

  // if (isOwnProfile) console.log(isOwnProfile);

  const { loading, data } = useQuery(isOwnProfile ? QUERY_ME : QUERY_USER, {
    variables: isOwnProfile ? undefined : { username: displayedUsername },
    skip: !displayedUsername,
  });

  // userId for UPDATE_USER mutation.
  const userId = data?.me?._id;

  // console.log(userId);

  const [updateUser] = useMutation(UPDATE_USER);

  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const [user, setUser] = useState<IUserProfile | null>(null);

  // console.log(user);

  useEffect(() => {
    if (data?.me || data?.user) {
      setUser(data.me || data.user);
    }
  }, [data]);

  // View Technology Editing Tools
  const toggleLeftVisibility = () => setIsLeftVisible(!isLeftVisible);
  // View Link Editing Tools
  const toggleRightVisibility = () => setIsRightVisible(!isRightVisible);

  const handleSave = () => {
    if (!user) return;

    updateUser({
      variables: {
        input: {
          _id: userId,
          username: user.username,
          role: user.role,
          technologies: user.technologies,
          description: user.description,
          links: user.links,
        },
      },
    }).then(() => alert("Profile updated successfully!"));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container id="user-profile">
      <PageTab
        title={isOwnProfile ? "My Profile" : `${user?.username}'s Profile`}
      >
        <div id="profile-card">
          <h1
            suppressContentEditableWarning={true}
            contentEditable={isOwnProfile}
          >
            {user?.username}
          </h1>
          <h2
            suppressContentEditableWarning={true}
            contentEditable={isOwnProfile}
          >
            {user?.role}
          </h2>

          <p
            suppressContentEditableWarning={true}
            contentEditable={isOwnProfile}
          >
            {user?.description}
          </p>

          <Row>
            <Col md={6} style={{ position: "relative" }}>
              <h3>My Technologies:</h3>
              {isOwnProfile && (
                <button className="edit-button" onClick={toggleLeftVisibility}>
                  <FaRegEdit className="edit-icon" />
                </button>
              )}

              <Row>
                {user?.technologies?.map((tech: string, index: number) => (
                  <Col key={index} sm={12} md={4} className="mb-3">
                    <div className="tech-box">{tech}</div>
                  </Col>
                ))}
              </Row>

              {isLeftVisible && (
                <Row>
                  <Col md={11}>
                    <Form className="input-field">
                      <Form.Group>
                        <Form.Control
                          className="edit-input"
                          type="text"
                          placeholder="Enter Technology"
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Button variant="info" className="list-button">
                      Add
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="danger" className="list-button">
                      Delete
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>

            <Col md={6} style={{ position: "relative" }}>
              <h3>My Work:</h3>
              {isOwnProfile && (
                <button className="edit-button" onClick={toggleRightVisibility}>
                  <FaRegEdit className="edit-icon" />
                </button>
              )}

              <Row>
                {user?.links?.map((link: string, index: number) => (
                  <Col key={index} sm={12} md={12} className="mb-3">
                    <div className="link-box">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </div>
                  </Col>
                ))}
              </Row>

              {isRightVisible && (
                <Row>
                  <Col md={11}>
                    <Form className="input-field">
                      <Form.Group>
                        <Form.Control
                          className="edit-input"
                          type="text"
                          placeholder="Enter Link"
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Button variant="info" className="list-button">
                      Add
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="danger" className="list-button">
                      Delete
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>

          {isOwnProfile && (
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </PageTab>
    </Container>
  );
};

export default UserProfile;
