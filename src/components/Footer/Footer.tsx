import seta from '../../assets/images/seta.png';
import './Footer.scss';

type PageValues = {
  limit?: number;
  total?: number;
  offset?: number;
  setOffset?: (elem: number) => void;
};

export default function Footer({ limit, total, offset, setOffset }: PageValues) {
  const currentPage: number = offset && limit ? offset / limit + 1 : 1;
  const totalPages = limit && total? Math.ceil(total / limit) : 0;

  const handlePageChange = (page: number) => {
    if (setOffset) {
      setOffset( limit ? (page - 1) * limit : 0);
    }
  };

  const renderPageNavigation = (isNext: boolean) => {
    const isDisabled = isNext ? currentPage >= totalPages : currentPage <= 1;

    return (
      <div className={isDisabled ? 'Disabled' : isNext ? 'NextPage' : 'BackPage'}>
        {!isDisabled && (
          <img
            src={seta}
            alt=""
            onClick={() => {
              if (isNext) handlePageChange(currentPage + 1);
              else handlePageChange(currentPage - 1);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <footer>
      {renderPageNavigation(false)}
      <div className="Page">
        <h1>{`${currentPage}/${totalPages}`}</h1>
      </div>
      {renderPageNavigation(true)}
    </footer>
  );
}
