import TheContent from './TheContent';

const TheLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="body flex-grow-1 bg-gray">
          <TheContent />
        </div>
      </div>
    </div>
  );
};
export default TheLayout;
