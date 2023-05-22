import { CCol, CContainer, CImage, CRow } from '@coreui/react-pro';
import leftArrowAlt from '@iconify/icons-bx/left-arrow-alt';
import { Icon } from '@iconify/react';
import coverImg from '../../../assets/img/coverImage.png';
import coverMobile from '../../../assets/img/coverMobile.png';
import { RecognitionType } from '../../../shared/enumeration/recognitionType';
import useWindowDimensions from '../../../shared/hooks/useWindowDimensions';
import { useRouter } from '../../../shared/utils/hooks/useRouter';
import { GroupRecognigations, IndividualRecognigations } from '../../shared/UserRecognition';

const Dashboard = () => {
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const onClickRedirect = (type: RecognitionType) => () => {
    navigate(`/search-users/${type}`);
  };

  return (
    <CContainer fluid className="bg-white px-0 h-100vh">
      <CContainer fluid className={`cover-background-image cover-dashboard-image bg-white px-0`}>
        <CCol xs={12} className="p-0">
          <div className="aspect-ratio-box">
            <CImage src={width < 501 ? coverMobile : coverImg} className="aspect-ratio-item" alt="listingImg" />
          </div>
        </CCol>
      </CContainer>
      <CContainer fluid className={`px-0 bottom-modal-dashboard`}>
        <CContainer fluid className={`${width < 501 ? 'px-4 mb-2' : 'px-5 mb-4'} `}>
          <div className=" d-flex justify-content-start ">
            <h2 className="text-white fw-600">
              <Icon icon={leftArrowAlt} width={30} height={30} className="vertial-align-text-bottom" />
              Đối tượng nhận diện
            </h2>
          </div>
        </CContainer>
        <CContainer fluid className={` ${width < 501 ? 'px-4 mt-3' : ''} `}>
          <CRow className={` ${width < 501 ? 'p-0' : 'px-5'} justify-content-center`}>
            <CCol xs={12} className="mb-3">
              <IndividualRecognigations onClick={onClickRedirect(RecognitionType.INDIVIDUAL)} />
            </CCol>
            <CCol xs={12}>
              <GroupRecognigations onClick={onClickRedirect(RecognitionType.GROUP)} />
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

export default Dashboard;
