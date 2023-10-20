import seta from '../../assets/images/seta.png';
import './Footer.scss';

type PageValues = {
  limit?: number;
  total?: number;
  offset?: number;
  setOffset?: (elem: number) => void;
};

export default function Footer({ limit, total, offset, setOffset }: PageValues) {
  let currentPage: number;
  if (offset !== undefined && limit !== undefined) {
      currentPage = offset / limit + 1;
  } else {
      currentPage = 1;
  }

  let totalPages: number;
  if (limit && total) {
      totalPages = Math.ceil(total / limit);
  } else {
      totalPages = 0;
  }


  const handlePageChange = (page: number) => {
    if (setOffset) {
      setOffset( limit ? (page - 1) * limit : 0);
    }
  };

  const renderPageNavigation = (isNext: boolean) => {
    let isDisabled: boolean;
    if (isNext) {
        isDisabled = currentPage >= totalPages;
    } else {
        isDisabled = currentPage <= 1;
    }
    
    let pageStatus: string
    if(isDisabled){
        pageStatus = 'Disabled'
    }else if(isNext){
      pageStatus = 'NextPage'
    }else{
      pageStatus = 'BackPage'
    }
   
    
    return (
      <div className={ pageStatus }>
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
