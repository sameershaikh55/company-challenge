import React, { useEffect, useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import Popup from "../../../components/Popup";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import Loader from "../../../components/Loader";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Footer from "../../../layout/Footer";
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

const Assignment = ({
  inpChange,
  viewScreen,
  setViewScreen,
  allData,
  activeClientChallengesView,
}) => {
  const history = useHistory();

  // URL PARAMS
  const { client_id, challenge_id, assignment_id } = useParams();

  useEffect(() => {
    storingRoute(history);
  }, [history]);

  const [popUp, setPopUp] = useState(false);

  // CONVERTING EDITOR OBJECT INTO HTML
  const convertIntoHtml = (value) => {
    return (
      (viewScreen && draftToHtml(convertToRaw(value.getCurrentContent()))) ||
      value
    );
  };

  // FILTER TO GET ACTIVE CLIENT
  const activeClient = filterActiveClient(allData, client_id, "id");
  const activeClientChallenges =
    !viewScreen &&
    activeClient.length &&
    filterActiveClient(
      activeClient[0].challenges,
      challenge_id,
      "challenge_id"
    );
  const activeClientAssignment =
    activeClientChallenges.length &&
    filterActiveClient(
      activeClientChallenges[0].assignments,
      assignment_id,
      "assignment_id"
    );

  const children = (
    <iframe
      width="100%"
      height="240"
      src={
        (viewScreen && inpChange.video_url) ||
        (activeClientAssignment && activeClientAssignment[0].video_url)
      }
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );

  function complete() {
    if (viewScreen) {
      setViewScreen(false);
    } else {
      history.goBack();
    }
  }

  useEffect(() => {
    if (
      activeClient.length &&
      activeClientChallenges.length &&
      activeClientAssignment.length
    ) {
      ReactGA.pageview(
        `/assignment_view/${activeClient[0].client_name}/${activeClientChallenges[0].challenge_name}/${activeClientAssignment[0].assignment_title}`
      );
    }
  }, []);

  // LOADER
  if (!allData.length) {
    return <Loader />;
  }

  return (
    <>
      {popUp && (
        <Popup
          title=""
          setPopUp={setPopUp}
          children={children}
          bgColor={
            (activeClientChallengesView &&
              "challenge_background_color" in activeClientChallengesView[0] &&
              activeClientChallengesView[0].challenge_background_color) ||
            (activeClientChallenges &&
              "challenge_background_color" in activeClientChallenges[0] &&
              activeClientChallenges[0].challenge_background_color)
          }
        />
      )}

      <div
        style={{
          background:
            (activeClientChallengesView &&
              "challenge_background_color" in activeClientChallengesView[0] &&
              activeClientChallengesView[0].challenge_background_color) ||
            (activeClientChallenges &&
              "challenge_background_color" in activeClientChallenges[0] &&
              activeClientChallenges[0].challenge_background_color),
        }}
        className="user__assignment"
      >
        <div className="user__assignment__header">
          <div className="user__assignment__header__logo">
            <img
              onClick={() => history.goBack()}
              className="pointer"
              src={activeClient[0].logo}
              alt=""
            />
            <h2>
              {(activeClientChallengesView &&
                activeClientChallengesView[0].challenge_title) ||
                activeClientChallenges[0].challenge_title}
            </h2>
          </div>
          <div className="user__btn__container">
            {activeClientAssignment &&
              activeClientAssignment.length &&
              activeClientAssignment[0].video_url && (
                <button onClick={() => setPopUp(true)}>Media</button>
              )}
            {viewScreen && inpChange.video_url && (
              <button onClick={() => setPopUp(true)}>Media</button>
            )}
            <button onClick={complete}>Complete</button>
          </div>
        </div>
        {/* <br /> */}
        {/* <br /> */}
        <div className="user__assignment__body">
          <div className="user__assignment__body__left">
            <div className="user__assignment__body__left__inner">
              <h2>
                {(viewScreen && inpChange.assignment_title) ||
                  (activeClientAssignment &&
                    activeClientAssignment[0].assignment_title)}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: convertIntoHtml(
                    (viewScreen && inpChange.assignment_description) ||
                      (activeClientAssignment &&
                        activeClientAssignment[0].assignment_description)
                  ),
                }}
                className="user__assignment__body__left__inner__description"
              />
            </div>
          </div>
          <div className="user__assignment__body__right">
            <div className="user__assignment__body__right__inner">
              <div className="user__assignment__body__right__inner__img">
                {viewScreen && inpChange.media !== "" ? (
                  <img src={inpChange.media} alt="" />
                ) : (
                  (activeClientAssignment &&
                    activeClientAssignment.length &&
                    activeClientAssignment[0].media && (
                      <img src={activeClientAssignment[0].media} alt="" />
                    )) || <img src={activeClient[0].logo} alt="" />
                )}
              </div>
              {/* <br /> */}
              {/* <p>AsignmentQuestion</p> */}
              <br />
              <p
                className="user__assignment__body__right__inner__description"
                dangerouslySetInnerHTML={{
                  __html: convertIntoHtml(
                    (viewScreen && inpChange.assignment) ||
                      (activeClientAssignment &&
                        activeClientAssignment[0].assignment)
                  ),
                }}
              />
            </div>
          </div>
          <Footer assignment_view />
        </div>
      </div>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    allData: state.allDataRed.allData,
  };
};

export default connect(mapStatetoProps, null)(withRouter(Assignment));
