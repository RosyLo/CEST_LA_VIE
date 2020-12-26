import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stories from 'react-insta-stories';
import { StoryModal } from './StoryModal';
import { useDispatch, useSelector } from 'react-redux';
import rightarrow from '../img/right-arrow.png';
import leftarrow from '../img/left-arrow.png';
import more from '../img/more.png';
import styles from '../style/storybar.module.css';
import { StyleEditBlock } from './EditStoryCompo';
import { edtiStory } from '../redux/actions';
import { MakeStoryModal } from './MakeStoryModal';
import EditStoryPopup from './EditStoryPopup';
import styled from 'styled-components';

function StoryPost({ story, isStoryClick, setisStoryClick }) {
  const user = useSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditStoryClick, setisEditStoryClick] = useState(false);
  const [isEditStoryBlockClick, setIsEditStoryBlockClick] = useState(false);
  const [editStory, setEditStory] = useState(story);
  let postLists = [];
  story.stories.map((post) => {
    if (post) {
      let postData = {
        url: post.postImage.postImageLink,
        header: {
          heading: post.postIssuer.postIssuerName,
          subheading: post.postTime,
          profileImage: post.postIssuer.postIssuerImage,
        },
      };
      postLists.push(postData);
    }
  });
  return (
    <>
      <StoryModal
        show={isStoryClick}
        handleClose={() => {
          setisStoryClick(false);
        }}>
        {user.uid === story.storyIssuerID ? (
          <div
            className={styles.storyEditBar}
            onClick={(e) => {
              e.stopPropagation();
              setisEditStoryClick(!isEditStoryClick);
            }}>
            <img src={more} style={{ width: '12px', height: '12px', zIndex: '10000' }}></img>
            <StyleEditBlock
              show={isEditStoryClick}
              handleClose={() => {
                setisEditStoryClick(!isEditStoryClick);
              }}>
              {' '}
              <div
                onClick={() => {
                  setIsEditStoryBlockClick(true);
                  setEditStory(story);
                }}>
                Edit
              </div>
            </StyleEditBlock>
          </div>
        ) : (
          ''
        )}

        <div className={styles.storyBlockWrap}>
          <img
            src={rightarrow}
            className={styles.rightarrow}
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
            }}
          />

          <img
            src={leftarrow}
            className={styles.leftarrow}
            onClick={() => {
              setCurrentIndex(currentIndex - 1);
            }}
          />

          {isStoryClick ? (
            <div className={styles.storyBlock}>
              <Stories
                loop
                keyboardNavigation
                defaultInterval={8000}
                stories={postLists}
                onStoryEnd={(s, st) => console.log('story ended', s, st)}
                onAllStoriesEnd={(s, st) => console.log('all stories ended', s, st)}
                onStoryStart={(s, st) => console.log('story started', s, st)}
                currentIndex={currentIndex}
                storyStyles={{
                  width: '360px',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </StoryModal>

      {isEditStoryBlockClick && (
        <EditStoryPopup
          isEditStoryBlockClick={isEditStoryBlockClick}
          setIsEditStoryBlockClick={setIsEditStoryBlockClick}
          editStory={editStory}
          setEditStory={setEditStory}
        />
      )}
    </>
  );
}

StoryPost.propTypes = {
  story: PropTypes.object.isRequired,
  isStoryClick: PropTypes.bool.isRequired,
  setisStoryClick: PropTypes.func.isRequired,
};

export default StoryPost;
