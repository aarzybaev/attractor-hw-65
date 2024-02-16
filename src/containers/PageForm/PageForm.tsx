import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import {ApiPage} from '../../type';
import {PAGES} from '../../constants';

const PageForm: React.FC = () => {
  const [page, setPage] = useState<ApiPage>({
    title: '',
    content: ''
  });

  const [pageName, setPageName] = useState<string>('');
  const navigate = useNavigate();

  const fetchPage = useCallback(async () => {
    if (pageName) {
      try {
        const response = await axiosAPI.get<ApiPage | null>('/pages/' + pageName + '.json');
        if (response.data) {
          setPage(response.data);
        } else {
          setPage({
            title: '',
            content: ''
          });
        }
      } catch (e) {
        console.log(e);
      }
    }


  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  const toEditePage = async (pageName: string) => {
    console.log(pageName);
    try {
      await axiosAPI.put<ApiPage | null>('/pages/' + pageName + '.json', page);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pageName !== 'default') {
      void toEditePage(pageName);
    } else {
      alert('Select page');
    }
    if (pageName === 'home') {
      navigate('/');
    } else {
      navigate('/pages/' + pageName);
    }

  };

  const changePage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  };

  const selectPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageName(e.target.value);
  };

  const pages = PAGES.map(
    item => {
      return <option key={item.id} value={item.id}>{item.title}</option>;
    }
  );

  return (
    <form className="mt-3" onSubmit={onFormSubmit}>
      <h4>Edit pages</h4>
      <div className="form-group">
        <label htmlFor="pageName">Select page</label>
        <select
          name="pageName"
          id="pageName"
          className="form-select"
          onChange={selectPage}
          required>
          <option defaultValue="default">Default</option>
          {pages}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={page.title}
          onChange={changePage}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea style={{height: '200px'}}
          name="content"
          id="content"
          className="form-control"
          value={page.content}
          onChange={changePage}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">Save</button>
    </form>
  );
};

export default PageForm;