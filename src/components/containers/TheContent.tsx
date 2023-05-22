import { CContainer } from '@coreui/react-pro';
import React, { Suspense } from 'react';
import { RouteRender } from '../../routes';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <CContainer fluid className="px-0">
      <Suspense fallback={loading}>
        <RouteRender />
      </Suspense>
    </CContainer>
  );
};

export default React.memo(TheContent);
