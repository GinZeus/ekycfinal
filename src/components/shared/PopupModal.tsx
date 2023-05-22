import { CButton, CCloseButton, CImage, CModal, CModalBody } from '@coreui/react-pro';
import errorImg from '../../assets/img/errorspng.png';
import successImg from '../../assets/img/success.png';
import warningImg from '../../assets/img/warning.png';

interface Iprop {
  visible: boolean;
  setVisible: (key: boolean) => void;
  onClose: () => void;
  width: number;
}

export const SuccessModal = (props: Iprop) => {
  const { visible, width, onClose } = props;
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <div className="d-flex justify-content-end">
          <CCloseButton onClick={onClose} className="m-3 popupModal-btn-Close" />
        </div>
        <CModalBody className={`popupModal ${width < 501 ? 'px-3' : 'px-4'} pt-0 pb-5`}>
          <div className="d-flex justify-content-center popupModal-img">
            <CImage src={successImg} />
          </div>
          <div className="text-center mb-3">
            <p className="popupModal-title">Nhận diện thành công !</p>
            <p className="popupModal-text m-0">
              Đăng kí nhận diện khuôn mặt thành công và được cấp quyền ra/vào Data Center
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2 ">
            <CButton className="face-regis-btn btn-gray  " onClick={onClose}>
              Đóng
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export const WarningModal = (props: Iprop) => {
  const { visible, width, onClose } = props;
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <div className="d-flex justify-content-end">
          <CCloseButton onClick={onClose} className="m-3 popupModal-btn-Close" />
        </div>
        <CModalBody className={`popupModal ${width < 501 ? 'px-3' : 'px-4'} pt-0 pb-5`}>
          <div className="d-flex justify-content-center popupModal-img">
            <CImage src={warningImg} />
          </div>
          <div className="text-center mb-3">
            <p className="popupModal-title">Opp! Đã có lỗi</p>
            <p className="popupModal-text m-0">
              Hệ thống đang gặp vài sự cố, vui lòng <b className="fw-600">thử lại sau hoặc liên hệ lễ tân</b> để được
              hướng dẫn chi tiết !
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2 ">
            <CButton className="face-regis-btn btn-gray  " onClick={onClose}>
              Đóng
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export const ErrorModal = (props: Iprop) => {
  const { visible, width, onClose } = props;
  return (
    <div>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <div className="d-flex justify-content-end">
          <CCloseButton onClick={onClose} className="m-3 popupModal-btn-Close" />
        </div>
        <CModalBody className={`popupModal ${width < 501 ? 'px-3' : 'px-4'} pt-0 pb-5`}>
          <div className="d-flex justify-content-center popupModal-img">
            <CImage src={errorImg} />
          </div>
          <div className="text-center mb-3">
            <p className="popupModal-title">Không thành công !</p>
            <p className="popupModal-text m-0">
              Đăng ký nhận diện khuôn mặt chưa thành công. Vui lòng{' '}
              <b className="fw-600">thử lại hoặc liên hệ lễ tân</b> để được hướng dẫn chi tiết.
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2 ">
            <CButton className="face-regis-btn btn-dark-blue" onClick={onClose}>
              Đóng
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
};
