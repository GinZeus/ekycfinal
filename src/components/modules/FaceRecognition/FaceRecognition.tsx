import { CButton, CCol, CContainer, CImage, CRow } from '@coreui/react-pro';
import leftArrowAlt from '@iconify/icons-bx/left-arrow-alt';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import avatar from '../../../assets/img/avatarNew.png';
import { RootState } from '../../../reducers';
import { FaceDirection, faceDirectionArray, mapFaceDirectionNameImg } from '../../../shared/enumeration/faceDirection';
import { RecognitionType, recognitionTypeArray } from '../../../shared/enumeration/recognitionType';
import useWindowDimensions from '../../../shared/hooks/useWindowDimensions';
import { useRouter } from '../../../shared/utils/hooks/useRouter';
import { ErrorModal, SuccessModal, WarningModal } from '../../shared/PopupModal';
import { uploadImage } from '../../shared/shared.api';
import { attachImageToUser } from '../UsersSearch/users.api';
import { resetEntity } from '../UsersSearch/users.reducer';
import FaceDirectionContainer from './FaceDirectionContainer';

interface IFaceDirectionArr {
  position: FaceDirection;
  verify: boolean;
}

type IFaceRecognitionParams = {
  type: RecognitionType;
  id: string;
};

const FaceRecognition = () => {
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { type, id } = useParams<IFaceRecognitionParams>();
  const { initialState } = useSelector((state: RootState) => state.user);
  const { attachImageToUserSuccess, errorMessage, user } = initialState;
  const [visible, setVisible] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const setCameraErrorListener = (key: boolean) => () => setCameraError(key);

  const initialArray: IFaceDirectionArr[] = faceDirectionArray.map((face) => {
    return { position: face, verify: false };
  });

  const [faceDirection, setFaceDirection] = useState<FaceDirection>(FaceDirection.FACE_LEFT);
  const [buttonText, setButtonText] = useState<string>('Chụp ảnh');

  const [faceDirectionArr, setFaceDirectionArr] = useState<IFaceDirectionArr[]>(initialArray);

  const webcamRef = useRef<Webcam>(null);

  const handleClosePopUp = () => {
    setFaceDirectionArr(initialArray);
    setFaceDirection(FaceDirection.FACE_LEFT);
    setButtonText('Chụp ảnh');
    setVisible(false);
    navigate('/');
  };

  const handleCloseErrorPopUp = () => {
    setErrorVisible(false);
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      try {
        const imgName = user ? `${user.email}_${mapFaceDirectionNameImg[faceDirection]}` : `${id}_${faceDirection}`;
        setIsUpload(true);
        const imagesUrl = await uploadImage(imageSrc, imgName);
        const attmntId = imagesUrl.attmnt['@id'];
        dispatch(attachImageToUser({ imageId: attmntId, userId: id! }));
      } catch (e) {
        setIsUpload(true);
        setErrorVisible(true);
      }
    } else {
      setErrorVisible(true);
    }
  };

  useEffect(() => {
    if (attachImageToUserSuccess) {
      const faceDirectionIdx = faceDirectionArray.indexOf(faceDirection);
      const isAllNotVerify = Boolean(faceDirectionArr.find((face) => !face.verify));
      if (faceDirectionIdx < 5 && isAllNotVerify && !cameraError) {
        const faceDirectionVerify = faceDirectionArr.map((face) => {
          if (face.position === faceDirection) {
            face.verify = true;
            return face;
          }
          return face;
        });
        setButtonText(faceDirectionIdx !== 4 ? 'Tiếp tục' : 'Hoàn thành');
        setFaceDirectionArr(faceDirectionVerify);
        setFaceDirection(faceDirectionArray[faceDirectionIdx + 1]);
        localStorage.setItem('faceDirection', faceDirectionArray[faceDirectionIdx + 1]);
      } else {
        localStorage.removeItem('faceDirection');
        type === RecognitionType.INDIVIDUAL ? setVisible(true) : navigate('/group-recognition');
      }
      setIsUpload(false);
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachImageToUserSuccess]);

  useEffect(() => {
    if (type && !recognitionTypeArray.includes(type) && !id) {
      navigate('/404', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id]);

  useEffect(() => {
    if (errorMessage) {
      setErrorVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    const faceDirectionStore = localStorage.getItem('faceDirection');
    if (faceDirectionStore) {
      setFaceDirection(faceDirectionStore as FaceDirection);
      const faceDirectionIdx = faceDirectionArray.indexOf(faceDirectionStore as FaceDirection);
      const faceDirectionVerify = [];
      for (let index = 0; index < faceDirectionArr.length; index++) {
        if (index < faceDirectionIdx) {
          faceDirectionVerify.push({ position: faceDirectionArr[index].position, verify: true });
        } else {
          faceDirectionVerify.push({ ...faceDirectionArr[index] });
        }
      }

      setFaceDirectionArr(faceDirectionVerify);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="face-recognition px-0 py-4 h-100">
      <CContainer className={`${width < 501 ? 'px-4' : 'px-0'} `}>
        <div className="d-flex justify-content-start">
          <h2 className="text-black fw-600">
            <Icon
              icon={leftArrowAlt}
              width={30}
              height={30}
              className="vertial-align-text-bottom text-black cursor-pointer"
              onClick={() => {
                localStorage.removeItem('faceDirection');
                navigate(-1);
              }}
            />
            Nhận diện khuôn mặt
          </h2>
        </div>
        <p>
          <b>Chú ý:</b> Đưa camera đủ gần để mặt nằm trọn trong khung hình người và hoàn thành nhận diện đủ các góc mặt
          để được ghi nhận
        </p>
        <CRow className="h-100 mt-5">
          <CCol xs={12} className={`${cameraError ? 'd-none' : ''} d-flex justify-content-center`}>
            <div className="camera-container">
              <div className="webcam-container">
                <Webcam
                  ref={webcamRef}
                  className="webcam-dummy p-1"
                  screenshotFormat="image/png"
                  mirrored={true}
                  onUserMediaError={setCameraErrorListener(true)}
                  onUserMedia={setCameraErrorListener(false)}
                />
              </div>

              <CImage src={avatar} className="camera-template" alt="avatar" />
            </div>
          </CCol>
          <CCol xs={12} className={`${cameraError ? '' : 'd-none'} d-flex justify-content-center`}>
            <div className="avatar-container">
              <div className="p-1">
                <CImage src={avatar} className="avatar" alt="avatar" />
              </div>
            </div>
          </CCol>
          <CCol xs={12} className={`${width < 501 ? 'mt-3 mb-4' : 'mt-4 mb-5'} d-flex justify-content-center `}>
            {faceDirectionArr.map((face, index) => (
              <FaceDirectionContainer key={index} faceDirection={face.position} checked={face.verify} />
            ))}
          </CCol>
          <CCol xs={12} className="text-center">
            {/* <CButton className="face-regis-btn btn-dark-blue" onClick={() => setVisible(true)}> */}
            <CButton disabled={isUpload} className="face-regis-btn btn-dark-blue" onClick={captureImage}>
              {buttonText}
            </CButton>
            {/* <WarningModal visible={visible} setVisible={setVisible} width={width}/> */}
            {cameraError ? (
              <ErrorModal visible={visible} setVisible={setVisible} width={width} onClose={handleClosePopUp} />
            ) : (
              <SuccessModal visible={visible} setVisible={setVisible} width={width} onClose={handleClosePopUp} />
            )}
            {errorVisible ? (
              <WarningModal
                visible={errorVisible}
                setVisible={setErrorVisible}
                width={width}
                onClose={handleCloseErrorPopUp}
              />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
      </CContainer>
    </CContainer>
  );
};

export default FaceRecognition;
