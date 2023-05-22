import { CContainer, CImage } from '@coreui/react-pro';
import groupImg from '../../assets/img/groupImg.svg';
import individualImg from '../../assets/img/individualImg.svg';
import useWindowDimensions from '../../shared/hooks/useWindowDimensions';

interface IBoxProps {
  onClick: () => void;
}

export const IndividualRecognigations = ({ onClick }: IBoxProps) => {
  const { width } = useWindowDimensions();

  return (
    <CContainer fluid className="userRecognigation bg-white cursor-pointer px-0" onClick={onClick}>
      <div className={`d-flex flex-column align-items-center ${width < 501 ? 'p-3' : 'p-4'}`}>
        <CImage src={individualImg} className="individualImg" />
        <div className="text-center">
          <p className={`userRecognigation-title ${width < 501 ? 'my-3 mb-1' : 'my-4 mb-2'} `}>Nhận diện cá nhân</p>
          <p className="userRecognigation-text m-0">Dành cho khách hàng đơn lẻ đã đăng kí thông tin trước đó.</p>
        </div>
      </div>
    </CContainer>
  );
};

export const GroupRecognigations = ({ onClick }: IBoxProps) => {
  const { width } = useWindowDimensions();

  return (
    <CContainer fluid className="userRecognigation bg-white cursor-pointer px-0" onClick={onClick}>
      <div className={`d-flex flex-column align-items-center ${width < 501 ? 'p-3' : 'p-4'}`}>
        <CImage src={groupImg} className="groupImg" />
        <div className="text-center">
          <p className={`userRecognigation-title ${width < 501 ? 'my-3 mb-1' : 'my-4 mb-2'} `}>Nhận diện theo nhóm</p>
          <p className="userRecognigation-text m-0">
            Dành cho các công ty/đơn vị đã đăng ký thông tin cho nhóm cho nhân viên.
          </p>
        </div>
      </div>
    </CContainer>
  );
};
