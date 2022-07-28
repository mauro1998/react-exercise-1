import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Action } from '../common/models/Action';

export interface GetPostState {
  loading: boolean;
  post: any;
  error: any;
}

export function usePost(postId: string) {
  enum PostActions {
    LOAD_POST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
  }

  const reducer = (state: GetPostState, action: Action<PostActions>) => {
    switch (action.type) {
      case PostActions.LOAD_POST:
        return { ...state, loading: true };
      case PostActions.LOAD_POST_SUCCESS:
        return { ...state, loading: false, post: action.payload };
      case PostActions.LOAD_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    post: null,
    error: null,
  });

  const fetchPost = async (postId: string) => {
    if (postId) {
      try {
        dispatch({ type: PostActions.LOAD_POST });
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
        );
        dispatch({ type: PostActions.LOAD_POST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: PostActions.LOAD_POST_FAILURE, payload: error });
      }
    }
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  const refresh = useCallback(() => fetchPost(postId), [postId]);

  return { state, refresh };
}

export interface GetPostsState {
  posts: any[];
  loading: boolean;
  error: any;
}

export interface GetPostsParams {
  query?: string;
  authorId?: string;
}

export function usePosts(params?: GetPostsParams) {
  const [counter, setCounter] = useState(0);
  const { query, authorId } = params || {};

  enum PostActions {
    LOAD_POSTS,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
  }

  const reducer = (
    state: GetPostsState,
    action: Action<PostActions>,
  ): GetPostsState => {
    switch (action.type) {
      case PostActions.LOAD_POSTS:
        return { ...state, loading: true };
      case PostActions.LOAD_POSTS_SUCCESS:
        return { ...state, loading: false, posts: action.payload };
      case PostActions.LOAD_POSTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: null,
  });

  const fetchPosts = async () => {
    try {
      dispatch({ type: PostActions.LOAD_POSTS });
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
      );

      let posts = data || [];
      const search = (query || '').trim();
      const userId = Number(authorId);

      if (userId) {
        posts = posts.filter((post: any) => post.userId === userId);
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        posts = posts.filter(
          (post: any) => regex.test(post.title) || regex.test(post.body),
        );
      }

      dispatch({ type: PostActions.LOAD_POSTS_SUCCESS, payload: posts });
    } catch (error) {
      dispatch({ type: PostActions.LOAD_POSTS_FAILURE, payload: error });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [counter, query, authorId]);

  const refresh = () => setCounter((counter) => counter + 1);

  return { state, refresh };
}
