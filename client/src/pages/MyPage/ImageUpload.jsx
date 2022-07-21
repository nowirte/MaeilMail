import React from 'react';
import styled from 'styled-components';

import { ProfileImg } from './style';

export const ProfileImgArea = () => {
  return (
    <ProfileImg>
      <div className="profileImgArea">
        <img
          className="profileEmoji"
          src={userData.profileImage ? userData.profileImage : '/img/뚱이.png'}
          alt="뚱이"
        />
        <input
          type="file"
          style={{ display: 'none' }}
          ref={imgInput}
          accept="image/jpg, image/png, image/jpeg"
          onClick={handleImgUpload}
        />
        <button
          className="imgUploadBtn"
          onClick={handleUploadBtn}
          type="button"
        >
          <AddPhotoAlternateIcon />
        </button>
        {img ?? (
          <>
            <button
              style={{
                position: 'absolute',
                left: '30px',
                top: '200px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#59B1FC',
                padding: '5px 8px',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleImgSubmit}
            >
              적용하기
            </button>
            <button
              style={{
                position: 'absolute',
                left: '100px',
                top: '200px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'gray',
                padding: '5px 8px',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={() => setImg('')}
            >
              취소
            </button>
          </>
        )}
      </div>
    </ProfileImg>
  );
};
