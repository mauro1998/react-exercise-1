import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Action } from '../common/models/Action';

export interface GetAuthortate {
  loading: boolean;
  author: any;
  error: any;
}

export function useAuthor(authorId: string) {
  enum AuthorActions {
    LOAD_AUTHOR,
    LOAD_AUTHOR_SUCCESS,
    LOAD_AUTHOR_FAILURE,
  }

  const reducer = (state: GetAuthortate, action: Action<AuthorActions>) => {
    switch (action.type) {
      case AuthorActions.LOAD_AUTHOR:
        return { ...state, loading: true };
      case AuthorActions.LOAD_AUTHOR_SUCCESS:
        return { ...state, loading: false, author: action.payload };
      case AuthorActions.LOAD_AUTHOR_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    author: null,
    error: null,
  });

  const fetchAuthor = async (authorId: string) => {
    if (authorId) {
      try {
        dispatch({ type: AuthorActions.LOAD_AUTHOR });
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${authorId}`,
        );
        dispatch({ type: AuthorActions.LOAD_AUTHOR_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: AuthorActions.LOAD_AUTHOR_FAILURE, payload: error });
      }
    }
  };

  useEffect(() => {
    fetchAuthor(authorId);
  }, [authorId]);

  const refresh = useCallback(() => fetchAuthor(authorId), [authorId]);

  return { state, refresh };
}

export interface GetAuthorsState {
  authors: any[];
  loading: boolean;
  error: any;
}

export interface GetAuthorsParams {
  query?: string;
  authorId?: string;
}

export function useAuthors(params: GetAuthorsParams) {
  const [counter, setCounter] = useState(0);
  const { query, authorId } = params || {};

  enum AuthorActions {
    LOAD_AUTHORS,
    LOAD_AUTHORS_SUCCESS,
    LOAD_AUTHORS_FAILURE,
  }

  const reducer = (
    state: GetAuthorsState,
    action: Action<AuthorActions>,
  ): GetAuthorsState => {
    switch (action.type) {
      case AuthorActions.LOAD_AUTHORS:
        return { ...state, loading: true };
      case AuthorActions.LOAD_AUTHORS_SUCCESS:
        return { ...state, loading: false, authors: action.payload };
      case AuthorActions.LOAD_AUTHORS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    authors: [],
    error: null,
  });

  const fetchAuthors = async () => {
    try {
      dispatch({ type: AuthorActions.LOAD_AUTHORS });
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`,
      );

      let authors = data;
      const userId = Number(authorId);

      if (userId) {
        authors = authors.filter((author: any) => author.id === userId);
      }

      dispatch({ type: AuthorActions.LOAD_AUTHORS_SUCCESS, payload: authors });
    } catch (error) {
      dispatch({ type: AuthorActions.LOAD_AUTHORS_FAILURE, payload: error });
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [counter, authorId]);

  const refresh = () => setCounter((counter) => counter + 1);

  return { state, refresh };
}
