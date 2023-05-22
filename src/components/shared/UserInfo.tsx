import { CAvatar, CContainer, CListGroup, CListGroupItem } from '@coreui/react';
import { CCol, CRow } from '@coreui/react-pro';
import img from '../../assets/img/groupAvatar.png';
import useWindowDimensions from '../../shared/hooks/useWindowDimensions';
import { IUser } from '../../shared/models/users.model';

interface IUserInfo {
  user: IUser;
}
const UserInfo = (props: IUserInfo) => {
  const { user } = props;
  const { width } = useWindowDimensions();
  return (
    <>
      <CContainer fluid className={`${width < 501 ? 'my-4' : 'my-5'} p-0 userInfo-content`}>
        <h6 className="container-title text-dark-blue fw-600">Thông tin người đăng ký</h6>
        <div className="d-flex align-items-center">
          <CAvatar src={img} className="userInfo-image me-2" />
          <div>
            <p className="m-0 userInfo-content-title">Họ và tên</p>
            <h6 className="m-0 userInfo-content-name text-dark-blue">{user.comboName}</h6>
          </div>
        </div>
        <div>
          <CListGroup flush>
            <CListGroupItem className="px-0 py-3">
              <CRow>
                <CCol xs={4} className="pe-0">
                  <p className="m-0 userInfo-content-title">Số điện thoại</p>
                </CCol>
                <CCol xs={8} className="ps-0 text-end">
                  <h6 className="m-0 userInfo-content-result">{user.phoneNumber}</h6>
                </CCol>
              </CRow>
            </CListGroupItem>
            <CListGroupItem className=" px-0 py-3">
              <CRow>
                <CCol xs={4} className="pe-0">
                  <p className="m-0 userInfo-content-title">Căn cước CD</p>
                </CCol>
                <CCol xs={8} className="ps-0 text-end">
                  <h6 className="m-0 userInfo-content-result">{user.idCard}</h6>
                </CCol>
              </CRow>
            </CListGroupItem>
            <CListGroupItem className="px-0 py-3">
              <CRow>
                <CCol xs={4} className="pe-0">
                  <p className="m-0 userInfo-content-title">Địa chỉ</p>
                </CCol>
                <CCol xs={8} className="ps-0 text-end">
                  <h6 className="m-0 userInfo-content-result">{user.address}</h6>
                </CCol>
              </CRow>
            </CListGroupItem>
          </CListGroup>
        </div>
      </CContainer>
    </>
  );
};

export default UserInfo;
