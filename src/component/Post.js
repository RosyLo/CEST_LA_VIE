import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Heart from './Heart';
import Comment from './Comment';
import Commenting from './Commenting';
import styles from '../style/post.module.css';
import EditPostBar from './EditPostBar';
import ProfileImage from './ProfileImage';
import PostPopup from './PostPopup';
import { Link } from 'react-router-dom';
import '../style/heart.css';
import '../style/heart.css';
import { MsgPopup } from './MsgPopup';
import { PostLoginPopup } from './PostLoginPopup';
import travel from '../img/travel.jpg';
import Logo from './Logo';
import headerstyle from '../style/header.module.css';
import { login, logout, addPost, loginGoogle } from '../redux/actions';

function Post({
  post,
  isFromDelete,
  isFromUpload,
  isFromEdit,
  isfromWelcome,
  clickEdit,
  setclickEdit,
  isDeletePopup,
  setIsDeletePopup,
}) {
  const { postID, postIssuer, postImage, postLikes, postTime, postTag, postMessage } = post;
  const user = useSelector((state) => state.user);
  const postcomments = useSelector((state) => state.postcomments);
  const [commentList, setCommentList] = useState([]);
  const [loginPopup, setLoginPopup] = useState(false);
  const [pleaseLogin, setPleaseLogin] = useState(false);
  const dispatch = useDispatch();
  const checkLogin = () => {
    if (!user) {
      setPleaseLogin(!pleaseLogin);
    }
  };
  useEffect(() => {
    let newList = postcomments.filter((comment) => comment.postID === postID);
    setCommentList(newList);
  }, [postcomments]);
  // const commentList = postcomments.filter((comment) => comment.postID === postID);
  const [isPostClick, setisPostClick] = useState(false);
  return (
    <>
      <div
        className={styles.post}
        onClick={() => {
          checkLogin();
        }}>
        <div className={styles.postHeader}>
          {isfromWelcome ? (
            ''
          ) : (
            <>
              <div>
                <Link
                  to={(location) => `/profile?id=${postIssuer.postIssuerID}`}
                  style={{ textDecoration: 'none' }}>
                  <img className={styles.postProfileImage} src={postIssuer.postIssuerImage}></img>
                </Link>
              </div>
              <Link
                to={(location) => `/profile?id=${postIssuer.postIssuerID}`}
                style={{ textDecoration: 'none' }}>
                <div className={styles.postIssuerName}>{postIssuer.postIssuerName}</div>
              </Link>
            </>
          )}
          {isFromDelete || isFromUpload || isfromWelcome || isFromEdit ? (
            ''
          ) : (
            <EditPostBar
              postID={postID}
              postIssuerID={postIssuer.postIssuerID}
              clickEdit={clickEdit}
              setclickEdit={setclickEdit}
              isDeletePopup={isDeletePopup}
              setIsDeletePopup={setIsDeletePopup}
              setisPostClick={setisPostClick}
            />
          )}
        </div>
        <div className={styles.authorPic}>
          <div
            className={styles.picOverlay}
            onClick={() => {
              setisPostClick(true);
              // setclickPostID(postID);
            }}>
            <div className={styles.content}>
              <div className={styles.textspan}>{postMessage}</div>
            </div>
          </div>
          <img className={styles.photo} src={postImage.postImageLink}></img>
        </div>
        <div className={styles.postInteraction}>
          {isFromDelete || isFromUpload || isfromWelcome || isFromEdit ? (
            <>
              <div className='HeartAnimation animate'></div>
              <div style={{ width: '170px' }}></div>
              <div>#{postTag.value}</div>
            </>
          ) : (
            <>
              <Heart id={postID} likes={postLikes} isfrom='post' />
              {isfromWelcome ? '' : <div className={styles.postLikeCount}>{postLikes.length}</div>}
              {isfromWelcome ? (
                ''
              ) : (
                <>
                  <div className={styles.postTag}>#{postTag.value}</div>
                </>
              )}
            </>
          )}
        </div>
        <>
          {isfromWelcome || !user ? (
            ''
          ) : (
            <div
              className={styles.postComments}
              onClick={() => {
                setisPostClick(true);
                // setclickPostID(postID);
              }}>
              See More
            </div>
          )}
          {user && !isFromDelete && !isFromUpload && !isFromEdit ? (
            <>
              {commentList.map((comment) => {
                return <Comment key={comment.commentID} comment={comment} />;
              })}
              <div className={styles.separater}></div>
              <Commenting postID={postID} />
            </>
          ) : (
            ''
          )}
        </>
      </div>
      {isPostClick && user && !isFromDelete && !isFromUpload && !isFromEdit && !isfromWelcome ? (
        <PostPopup
          isFromDelete={isFromDelete}
          isFromUpload={isFromUpload}
          setisPostClick={setisPostClick}
          isPostClick={isPostClick}
          clickPostID={postID}
          postID={postID}
          post={post}
          isDeletePopup={isDeletePopup}
          setIsDeletePopup={setIsDeletePopup}
        />
      ) : (
        ''
      )}
      {/* please login  */}
      {!isfromWelcome && (
        <PostLoginPopup
          show={pleaseLogin}
          handleClose={() => {
            setPleaseLogin(false);
          }}>
          <div className={headerstyle.loginPopContain}>
            <div className={headerstyle.loginTitle}>
              <img src={travel}></img>
            </div>
            <div className={headerstyle.loginWrap}>
              <Logo />
              <br />
              <div className={headerstyle.title1}> Share your life in</div>
              <div className={headerstyle.title2}> LA VIE</div>
              <br />
              <br />
              <div className={headerstyle.text}> Login with</div>
              <div
                className={headerstyle.google}
                onClick={() => dispatch(loginGoogle(setPleaseLogin, setisPostClick))}>
                {' '}
                {/* <img src={google} className={headerstyle.googleIcon} /> */}
                Google Login
              </div>

              <div className={headerstyle.text}> OR</div>
              <div
                className={headerstyle.facebook}
                onClick={() => dispatch(login(setPleaseLogin, setisPostClick))}>
                {/* <img src={facebook} className={headerstyle.facebookIcon} />  */}
                Facebook Login
              </div>
            </div>
          </div>
        </PostLoginPopup>
      )}
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    postID: PropTypes.string,
    postTime: PropTypes.object,
    postMessage: PropTypes.string,
    postTag: PropTypes.object,
    postImage: PropTypes.shape({
      postImageLink: PropTypes.string,
    }),
    postIssuer: PropTypes.shape({
      postIssuerID: PropTypes.string,
      postIssuerName: PropTypes.string,
      postIssuerImage: PropTypes.string,
    }),
    postLikes: PropTypes.array,
  }),
  setDeletePost: PropTypes.func,
  setclickEdit: PropTypes.func,
  setIsDeletePopup: PropTypes.func,
  isFromDelete: PropTypes.bool,
  isFromUpload: PropTypes.bool,
  isFromEdit: PropTypes.bool,
  isfromWelcome: PropTypes.bool,
  isDeletePopup: PropTypes.bool,
  clickEdit: PropTypes.string,
};

export default Post;
