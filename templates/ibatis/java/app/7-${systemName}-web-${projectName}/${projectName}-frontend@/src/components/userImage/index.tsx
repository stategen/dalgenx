import React from 'react';

import styles from './index.css';
import UserColumns from "@i/columns/UserColumns";

interface UserImagePros{
  imageUrl?,
  width?:number,
  height?:number,
  style?:{},
}

export  const avatarImgIdRender = {...UserColumns.avatarImgId, renderImage: false};
function UserImage({ imageUrl, width = 38, height = 38,style:{}}:UserImagePros) {
    return (
        <div className={styles.userImage} style={{
            backgroundImage: 'url(' + imageUrl + ')',
            width: `${width}px`,
            height: `${height}px`,
        }}>
        </div>
    );
}

export default UserImage;
