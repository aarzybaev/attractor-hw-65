import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ApiPage} from '../../type';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

const Page: React.FC = () => {
  let { pageName} = useParams();

  if (!pageName) {
    pageName = 'home';
  }

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<ApiPage | null>(null);

  const fetchPage = useCallback(async () => {
    setIsLoading(true);
    try {
      const {data: responsePage} = await axiosAPI.get<ApiPage | null>('/pages/' + pageName + '.json');
      if (responsePage) {
        setPage(responsePage);
      } else {
        setPage(null);
      }
    } catch (e) {
      console.log(e);
    }  finally {
      setIsLoading(false);
    }

  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  let pageArea = <Spinner/>;

  if (!isLoading && page) {
    pageArea = (
      <div className="mt-3">
        <h3>{page.title}</h3>
        <p>{page.content}</p>
      </div>
    );
  } else if (!isLoading && !page) {
    pageArea = (
      <h1>Not found</h1>
    );
  }

  return pageArea;
};

export default Page;