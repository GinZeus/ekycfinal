import { CContainer, CImage } from '@coreui/react-pro';
import notFound from '../../assets/img/notFound.png';

const UserInfoNotFound = () => {
  return (
    <CContainer fluid className="userInfoNotFound d-flex jutify-content-center align-items-center flex-column p-0">
      <div className="userInfoNotFound-img">
        <CImage src={notFound} className="w-100 h-100" />
      </div>
      <p className="text-center mt-4 mb-0 userInfoNotFound-text">
        Không tìm thấy kết quả tương ứng, vui lòng kiểm tra lại thông tin hoặc đăng ký mới.
      </p>
    </CContainer>
  );
};

export default UserInfoNotFound;
