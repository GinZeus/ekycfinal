import { CAvatar, CButton, CContainer, CListGroup, CListGroupItem } from '@coreui/react-pro';
import leftArrowAlt from '@iconify/icons-bx/left-arrow-alt';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import img from '../../../assets/img/groupAvatar.png';
import { RecognitionType } from '../../../shared/enumeration/recognitionType';
import useWindowDimensions from '../../../shared/hooks/useWindowDimensions';
import { useRouter } from '../../../shared/utils/hooks/useRouter';
import { SuccessModal } from '../../shared/PopupModal';
import { dummyUserArr } from '../UsersSearch/UserSearch';

const GroupRecognition = () => {
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState<boolean>(false);
  const handleClosePopUp = () => {
    setVisible(false);
  };

  return (
    <CContainer fluid className="face-recognition bg-white px-0 py-4 h-100vh">
      <CContainer className={`${width < 501 ? 'px-4' : 'px-0'} `}>
        <div className="d-flex justify-content-start">
          <h2 className="text-black fw-600 group-title">
            <Icon
              icon={leftArrowAlt}
              width={width < 501 ? 23 : 30}
              height={width < 501 ? 23 : 30}
              className=" vertial-align-text-bottom text-black cursor-pointer"
              onClick={() => navigate(`/search-users/${RecognitionType.GROUP}`)}
            />
            Danh sách nhận diện nhóm
          </h2>
        </div>
        <CListGroup flush className="pt-1">
          {dummyUserArr.map((ele) => (
            <CListGroupItem
              className={`d-flex justify-content-between align-items-center px-0 ${width < 501 ? 'py-3' : 'py-4'} `}
              onClick={() => navigate(`/1/face-recognition/${RecognitionType.GROUP}`)}
            >
              <div>
                <h5 className="groupRecognition-name">{ele.comboName}</h5>
                <p className="groupRecognition-text mb-1 fw-600">
                  <span className="groupRecognition-title">CCCD:</span> {ele.idCard}
                </p>
                <p className="groupRecognition-text m-0">
                  <span className="groupRecognition-title">Email:</span> {ele.email}
                </p>
              </div>
              <CAvatar src={img} className="groupRecognition-img" />
            </CListGroupItem>
          ))}
        </CListGroup>
        <div className="d-flex justify-content-center py-3">
          <CButton className="face-regis-btn btn-dark-blue" onClick={() => setVisible(true)}>
            Hoàn thành
          </CButton>
        </div>
      </CContainer>
      <SuccessModal visible={visible} setVisible={setVisible} width={width} onClose={handleClosePopUp} />
    </CContainer>
  );
};

export default GroupRecognition;
