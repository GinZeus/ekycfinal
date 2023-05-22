import { CButton, CCol, CContainer, CForm, CFormInput, CImage, CInputGroup, CRow } from '@coreui/react-pro';
import leftArrowAlt from '@iconify/icons-bx/left-arrow-alt';
import { Icon } from '@iconify/react';
import { ErrorMessage, Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import coverImg from '../../../assets/img/coverImage.png';
import coverMobile from '../../../assets/img/coverMobile.png';
import { RootState } from '../../../reducers';
import { RecognitionType, recognitionTypeArray } from '../../../shared/enumeration/recognitionType';
import useWindowDimensions from '../../../shared/hooks/useWindowDimensions';
import { IUser } from '../../../shared/models/users.model';
import { useRouter } from '../../../shared/utils/hooks/useRouter';
import UserInfo from '../../shared/UserInfo';
import UserInfoNotFound from '../../shared/UserInfoNotFound';
import { login } from '../Auth/auth.api';
import { resetAll as resetAllAuth } from '../Auth/auth.reducer';
import { getUser } from './users.api';
import { fetching, resetAll } from './users.reducer';

type IUserSearchParams = {
  type: RecognitionType;
};

export const dummyUserArr: IUser[] = [
  {
    id: '1',
    comboName: 'Nguyễn Minh Hiếu',
    phoneNumber: '0386920099',
    address: 'Số 8, Toà nhà Detech, TP Hà Nội',
    idCard: '0123456789',
    email: 'hieu@gmail.com',
  },
  {
    id: '1',
    comboName: 'Nguyễn Trần Phương Oanh',
    phoneNumber: '0987654321',
    address: 'Số 15, ngách 34, ngõ 18, Lương Đình Của, Hoàng Mai, TP Hà Nội',
    idCard: '037187004321',
    email: 'oanhntp@gmail.com',
  },
  {
    id: '1',
    comboName: 'Trần Mạnh Thắng',
    phoneNumber: '0987654321',
    address: 'Số 15, ngách 34, ngõ 18, Lương Đình Của, Hoàng Mai, TP Hà Nội',
    idCard: '037187004321',
    email: 'thang@gmail.com',
  },
  {
    id: '1',
    comboName: 'Hà Bảo Ngọc',
    phoneNumber: '0987654321',
    address: 'Số 15, ngách 34, ngõ 18, Lương Đình Của, Hoàng Mai, TP Hà Nội',
    idCard: '037187004321',
    email: 'ngoc@gmail.com',
  },
  {
    id: '1',
    comboName: 'Hoàng Bảo Lộc',
    phoneNumber: '0987654321',
    address: 'Số 15, ngách 34, ngõ 18, Lương Đình Của, Hoàng Mai, TP Hà Nội',
    idCard: '037187004321',
    email: 'loc@gmail.com',
  },
];

interface ISearchUser {
  idCard: string;
  email: string;
}

const UserSearch = () => {
  const { navigate } = useRouter();
  const { type } = useParams<IUserSearchParams>();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { initialState } = useSelector((state: RootState) => state.user);
  const { fetchLoginSuccess, token } = useSelector((state: RootState) => state.login);
  const formikRef = useRef<FormikProps<ISearchUser>>(null);

  const { user, loading, errorMessage } = initialState;
  const [displaySearchBtn, setDisplaySearchBtn] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (type && !recognitionTypeArray.includes(type)) {
      navigate('/404', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const validationSchema = Yup.object().shape({
    idCard: Yup.number().required('CMND/CCCD không được để trống').typeError('CMND/CCCD không đúng định dạng'),
    email: Yup.string().required('Email không được để trống').email('Email không đúng định dạng'),
  });

  const initialValues: ISearchUser = {
    idCard: '',
    email: '',
  };

  useEffect(() => {
    if (errorMessage) {
      if (errorMessage.includes('Invalid REST Access Key')) {
        dispatch(login());
      }
      dispatch(resetAll());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    if (fetchLoginSuccess && token) {
      formikRef.current?.submitForm();
      dispatch(resetAllAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLoginSuccess]);

  return (
    <>
      <CContainer fluid className="bg-white px-0 h-100vh">
        <CContainer
          fluid
          className={`cover-background-image cover-dashboard-image bg-white px-0`}
          // style={{ backgroundImage: `url(${coverImg})` }}
        >
          {/* <div className="image-container position-absolute"></div> */}
          <CCol xs={12} className="p-0">
            <div className="aspect-ratio-box">
              <CImage src={width < 501 ? coverMobile : coverImg} className="aspect-ratio-item" alt="listingImg" />
            </div>
          </CCol>
        </CContainer>

        <Formik
          innerRef={formikRef}
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            if (type === RecognitionType.INDIVIDUAL) {
              dispatch(fetching());
              dispatch(getUser(values));
              // setUser(result);
              setDisplaySearchBtn(false);
              setIsSearch(true);
            } else {
              dispatch(fetching());
              dispatch(getUser(values));
              // setUser(result);
              setDisplaySearchBtn(false);
              setIsSearch(true);
            }
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit, submitForm }) => (
            <CForm onSubmit={handleSubmit}>
              <CContainer fluid className={`px-0 bottom-modal`}>
                <CContainer fluid className={`${width < 501 ? 'px-4 mb-2' : 'px-5 mb-4'} `}>
                  <div className=" d-flex justify-content-start ">
                    <h2 className="text-white fw-600">
                      {/* <CIcon className="text-white me-3" size="xl" icon={arrowBack} /> */}
                      <Icon
                        icon={leftArrowAlt}
                        width={30}
                        height={30}
                        className="vertial-align-text-bottom"
                        onClick={() => navigate('/')}
                      />
                      Xác nhận thông tin
                    </h2>
                  </div>
                </CContainer>

                <CContainer fluid className={`bg-white ${width < 501 ? 'p-4' : 'p-5'} bottom-modal-body`}>
                  <CRow>
                    <CCol xs={12}>
                      <p>
                        Vui lòng nhập số thông tin vào ô dưới đây để xác nhận lại thông tin cá nhân trước khi đăng ký
                        nhận diện khuôn mặt
                      </p>
                    </CCol>
                    <CCol xs={12} className={`${width < 501 ? '' : 'mt-2'} mb-3`}>
                      <CInputGroup className="search-input-container">
                        <CFormInput
                          placeholder="Số CMND/CCCD"
                          className="search-input border-0"
                          enterKeyHint="search"
                          aria-describedby="search-addon"
                          id="idCard"
                          name="idCard"
                          value={values.idCard}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitForm();
                              e.currentTarget.blur();
                            }
                          }}
                          onBlur={() => {
                            setDisplaySearchBtn(true);
                            setIsSearch(false);
                          }}
                          onFocus={() => {
                            setDisplaySearchBtn(false);
                            setIsSearch(false);
                          }}
                        />
                        {/* <CInputGroupText id="search-addon" className="search-input border-0">
                  <Icon icon={searchIcon} className="search-icon" width={20} height={20} />
                </CInputGroupText> */}
                      </CInputGroup>
                      <div className="invalid-errors">
                        <ErrorMessage name="idCard" />
                      </div>
                    </CCol>
                    <CCol xs={12}>
                      <CInputGroup className="search-input-container">
                        <CFormInput
                          placeholder="Email đăng ký"
                          className="search-email border-0"
                          enterKeyHint="search"
                          aria-describedby="search-addon"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitForm();
                              e.currentTarget.blur();
                            }
                          }}
                          onBlur={() => {
                            setDisplaySearchBtn(true);
                            setIsSearch(false);
                          }}
                          onFocus={() => {
                            setDisplaySearchBtn(false);
                            setIsSearch(false);
                          }}
                        />
                        {/* <CInputGroupText id="search-addon" className="search-input border-0">
                  <Icon icon={searchIcon} className="search-icon" width={20} height={20} />
                </CInputGroupText> */}
                      </CInputGroup>
                      <div className="invalid-errors">
                        <ErrorMessage name="email" />
                      </div>
                    </CCol>
                    {isSearch && !loading ? (
                      <>
                        {user ? (
                          <>
                            <CCol xs={12}>
                              <UserInfo user={user} />
                            </CCol>
                            <CCol xs={12} className="text-center">
                              <CButton
                                className="face-regis-btn btn-dark-blue"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  localStorage.removeItem('faceDirection');
                                  if (type === RecognitionType.INDIVIDUAL) {
                                    navigate(`/${user.id}/face-recognition/${RecognitionType.INDIVIDUAL}`);
                                  } else {
                                    navigate('/group-recognition');
                                  }
                                }}
                              >
                                Nhận diện khuôn mặt
                              </CButton>
                            </CCol>
                          </>
                        ) : (
                          <>
                            <CCol xs={12}>
                              <UserInfoNotFound />
                            </CCol>
                            <CCol xs={12} className="text-center">
                              <CButton
                                className="face-regis-btn btn-dark-blue small-btn"
                                // onClick={redirectView('face-recognition')}
                              >
                                Đăng ký mới
                              </CButton>
                            </CCol>
                          </>
                        )}
                      </>
                    ) : (
                      ''
                    )}
                  </CRow>
                </CContainer>
              </CContainer>
              <CContainer
                fluid
                className={`bg-white ${displaySearchBtn ? 'd-flex' : 'd-none'} ${
                  width < 501 ? 'p-4' : 'p-5'
                }  justify-content-center user-search-btn`}
              >
                <CButton className="face-regis-btn btn-dark-blue" type="submit">
                  Tìm kiếm
                </CButton>
              </CContainer>
            </CForm>
          )}
        </Formik>
      </CContainer>
    </>
  );
};

export default UserSearch;
