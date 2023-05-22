import { CCol, CContainer, CImage, CRow } from '@coreui/react-pro';
import React from 'react';
import systemErrorImg from '../../assets/img/500.png';

interface IPage500 {
  errorMessage?: string;
}

const Page500 = ({ errorMessage }: IPage500) => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={5} className="m-auto">
            <h1 className="float-start display-3 me-4">500</h1>

            <h3 className={`mt-2`}>Oops! Something went wrong.</h3>
            <h6>Our developers are working on this.</h6>

            <p className="text-medium-emphasis float-start">
              {errorMessage || 'An uncaught error occurs. Please contact the administrator. '}
            </p>
          </CCol>
          <CCol md={7}>
            <CImage fluid src={systemErrorImg} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page500;
