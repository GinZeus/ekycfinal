import { CImage } from '@coreui/react-pro';
import greenCheck from '../../../assets/img/Tick.png';
import { FaceDirection, mapFaceDirectionIcon, mapFaceDirectionName } from '../../../shared/enumeration/faceDirection';
interface IFaceDirectionContainer {
  checked: boolean;
  faceDirection: FaceDirection;
}

const FaceDirectionContainer = ({ checked, faceDirection }: IFaceDirectionContainer) => {
  return (
    <div className="text-center face-direction-container">
      <div className="face-direction-image cmx-4 cmy-4 mt-4">
        <CImage src={mapFaceDirectionIcon[faceDirection]} className="face-direction" alt="face-direction" />
        <div className={`${checked ? '' : 'd-none'} green-tick-container`}>
          <CImage src={greenCheck} className="green-tick" />
        </div>
      </div>
      <p className="face-direction-text">{mapFaceDirectionName[faceDirection]}</p>
    </div>
  );
};

export default FaceDirectionContainer;
