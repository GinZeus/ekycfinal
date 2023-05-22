import faceDown from '../../assets/img/faceDown.png';
import faceFront from '../../assets/img/faceFront.png';
import faceLeft from '../../assets/img/faceLeft.png';
import faceRight from '../../assets/img/faceRight.png';
import faceUp from '../../assets/img/faceUp.png';

export enum FaceDirection {
  FACE_LEFT = 'FACE_LEFT',
  FACE_RIGHT = 'FACE_RIGHT',
  FACE_FRONT = 'FACE_FRONT',
  FACE_DOWN = 'FACE_DOWN',
  FACE_UP = 'FACE_UP',
}

export const faceDirectionArray: FaceDirection[] = [
  FaceDirection.FACE_LEFT,
  FaceDirection.FACE_RIGHT,
  FaceDirection.FACE_FRONT,
  FaceDirection.FACE_DOWN,
  FaceDirection.FACE_UP,
];

export const mapFaceDirectionIcon: { [key in FaceDirection]: any } = {
  [FaceDirection.FACE_LEFT]: faceLeft,
  [FaceDirection.FACE_RIGHT]: faceRight,
  [FaceDirection.FACE_FRONT]: faceFront,
  [FaceDirection.FACE_DOWN]: faceDown,
  [FaceDirection.FACE_UP]: faceUp,
};

export const mapFaceDirectionName: { [key in FaceDirection]: string } = {
  [FaceDirection.FACE_LEFT]: 'Quay Trái',
  [FaceDirection.FACE_RIGHT]: 'Quay Phải',
  [FaceDirection.FACE_FRONT]: 'Chính diện',
  [FaceDirection.FACE_DOWN]: 'Cúi Đầu',
  [FaceDirection.FACE_UP]: 'Ngẩng Đầu',
};

export const mapFaceDirectionNameImg: { [key in FaceDirection]: string } = {
  [FaceDirection.FACE_LEFT]: 'Left',
  [FaceDirection.FACE_RIGHT]: 'Right',
  [FaceDirection.FACE_FRONT]: 'Front',
  [FaceDirection.FACE_DOWN]: 'Down',
  [FaceDirection.FACE_UP]: 'Up',
};
