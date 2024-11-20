import { useLazyQuery } from "@apollo/client";
import {
  QUERY_USER_BY_ID,
  FIND_APPLICANTS_BY_LISTING_ID,
} from "../utils/queries";
import { Modal, Card, Button } from "react-bootstrap";
import { useState } from "react";
import "../css/listingcard.css";

interface ListingCardProps {
  listingId: string;
  title: string;
  poster: string;
  description: string;
  onDelete: () => void;
}

const YourListingCard = ({
  listingId,
  title,
  poster,
  description,
  onDelete,
}: ListingCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const [findUserById] = useLazyQuery(QUERY_USER_BY_ID);
  const [findApplicantsByListingId] = useLazyQuery(
    FIND_APPLICANTS_BY_LISTING_ID
  );

  // * handleShowModal Function (using findApplicantsByListingId) * //
  const handleShowModal = async (listingId: string) => {
    try {
      const { data: applicants } = await findApplicantsByListingId({
        variables: { listingId },
      });

      if (applicants) {
        const userIds = applicants.findApplicantsByListingId.map(
          (applicant: { userId: string }) => applicant.userId
        );

        // console.log(userIds);

        const applicantDetailsArray = await Promise.all(
          userIds.map(async (userId: string) => {
            const userDetails = await handleApplicantDetails(userId);
            // console.log(userDetails);
            return userDetails;
          })
        );

        console.log("Applicant Details:", applicantDetailsArray);
      }

      setShowModal(true);
    } catch (error) {
      console.error("handleShowModal Error:", error);
    }
  };

  // * handleCloseModal Function * //
  const handleCloseModal = () => setShowModal(false);

  // * handleApplicantDetails Function (using findUserById) * //
  const handleApplicantDetails = async (userId: string) => {
    // console.log(userId);
    try {
      const { data } = await findUserById({ variables: { id: userId } });

      // console.log(data);

      if (data) {
        // console.log(data);
        return data;
      } else {
        console.warn(`No data found for userId: ${userId}.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data for userId: ${userId}.`, error);
      return null;
    }
  };

  return (
    <div className="your-listingcard-container">
      <Card className="your-listing-card">
        <Card.Body>
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Subtitle className="card-lister mb-2">
            Posted by: {poster}
          </Card.Subtitle>
          <Card.Text className="card-description">
            <strong>Description: </strong>
            {description}
          </Card.Text>
          <div id="your-listing-buttons-container">
            <Button
              id="your-listing-button"
              onClick={() => handleShowModal(listingId)}
            >
              View Applicants
            </Button>
            <Button id="your-listing-button" onClick={onDelete}>
              Delete Listing
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Applicants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="applicant-div">
            <div className="applicant-container">
              <h4>Zander</h4>
              <div className="applicant-btn-container">
                <button>Accept</button>
                <button>Reject</button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default YourListingCard;
